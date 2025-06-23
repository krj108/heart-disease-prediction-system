<?php

namespace App\Http\Controllers;

use App\Models\Diagnosis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class DiagnosisController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $diagnoses = Diagnosis::where('user_id', $user->id)
            ->latest()
            ->get()
            ->map(fn($d) => [
                'id'                => $d->id,
                'date'              => $d->created_at->format('Y-m-d H:i'),
                'risk_percentage'   => $d->risk_percentage,
                'prediction_result' => $d->prediction_result,
            ]);

        return Inertia::render('Diagnoses/Index', [
            'diagnoses' => $diagnoses,
            'auth'      => ['user' => $user->only('id','name','email')],
        ]);
    }

    public function show(Diagnosis $diagnosis)
    {
        if ($diagnosis->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Diagnoses/Show', [
            'diagnosis' => $diagnosis,
            'auth'      => ['user' => Auth::user()->only('id','name','email')],
        ]);
    }

    public function create()
    {
        return Inertia::render('Diagnoses/Create');
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'age'                       => 'required|integer|between:25,90',
        'gender'                    => 'required|in:0,1',
        'hypertension'              => 'required|boolean',
        'diabetes'                  => 'required|boolean',
        'cholesterol_level'         => 'required|integer|between:100,400',
        'obesity'                   => 'required|boolean',
        'family_history'            => 'required|boolean',
        'smoking_status'            => 'required|in:0,1,2',
        'alcohol_consumption'       => 'required|in:0,1,2',
        'physical_activity'         => 'required|in:0,1,2',
        'dietary_habits'            => 'required|boolean',
        'stress_level'              => 'required|in:0,1,2',
        'sleep_hours_clean'         => 'required|numeric|between:3,9',
        'blood_pressure_systolic'   => 'required|integer|between:70,250',
        'blood_pressure_diastolic'  => 'required|integer|between:40,150',
        'fasting_blood_sugar'       => 'required|integer|between:60,200',
        'cholesterol_hdl'           => 'required|integer|between:20,100',
        'cholesterol_ldl'           => 'required|integer|between:50,300',
        'triglycerides'             => 'required|integer|between:60,460',
        'EKG_results'               => 'required|boolean',
        'previous_heart_disease'    => 'required|boolean',
        'medication_usage'          => 'required|boolean',
        'waist_circumference'       => 'required|integer|between:50,140',
        'air_pollution_exposure'    => 'required|in:0,1,2',
    ]);

    \Log::info('Validated data', $validated);

    try {
        $response = Http::timeout(60)
            ->withOptions(['verify' => false])
            ->post('https://heart-disease-prediction-system-ext5.onrender.com/analyze/', [
                'data' => $validated
            ]);

        if ($response->failed()) {
            throw new \Exception('API request failed');
        }

        $json = $response->json();
        \Log::info('API response', $json);

        Diagnosis::create([
            'user_id'            => Auth::id(),
            ...$validated,
            'risk_percentage'    => $json['Risk Percentage'] ?? null,
            // 'prediction_result'  => ($json['Risk Percentage'] ?? 0) >= 50 ? 1 : 0,
            'top_5_factors'      => $json['Top_5_Factors'] ?? [],
            'recommendations'    => $json['Recommendations'] ?? [],
        ]);

        return redirect()->route('diagnoses.index')
            ->with('success', 'Diagnosis completed successfully');
    } catch (\Exception $e) {
        \Log::error('Diagnosis error: ' . $e->getMessage());
        return back()->with('error', 'Error processing diagnosis: ' . $e->getMessage());
    }
}


}

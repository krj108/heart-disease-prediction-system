<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diagnosis extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'age', 'gender', 'hypertension', 'diabetes', 'cholesterol_level',
        'obesity', 'family_history', 'smoking_status', 'alcohol_consumption',
        'physical_activity', 'dietary_habits', 'stress_level', 'sleep_hours_clean',
        'blood_pressure_systolic', 'blood_pressure_diastolic', 'fasting_blood_sugar',
        'cholesterol_hdl', 'cholesterol_ldl', 'triglycerides', 'EKG_results',
        'previous_heart_disease', 'medication_usage', 'waist_circumference',
        'air_pollution_exposure',
        'risk_percentage', 'top_5_factors', 'recommendations',
    ];

    protected $casts = [
        'hypertension'             => 'boolean',
        'diabetes'                 => 'boolean',
        'obesity'                  => 'boolean',
        'family_history'           => 'boolean',
        'dietary_habits'           => 'boolean',
        'EKG_results'              => 'boolean',
        'previous_heart_disease'   => 'boolean',
        'medication_usage'         => 'boolean',
        'top_5_factors'            => 'array',
        'recommendations'          => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

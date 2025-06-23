<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AnalysisController;
use App\Http\Controllers\DiagnosisController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';

Route::middleware('auth')->group(function () {
    Route::get('/analysis', [AnalysisController::class, 'index'])->name('analysis');

});

Route::middleware(['auth'])->group(function () {
    Route::get('/diagnoses', [DiagnosisController::class, 'index'])->name('diagnoses.index');
    Route::get('/diagnoses/create', [DiagnosisController::class, 'create'])->name('diagnoses.create');
    Route::post('/diagnoses', [DiagnosisController::class, 'store'])->name('diagnoses.store');
    Route::get('/diagnoses/{diagnosis}', [DiagnosisController::class, 'show'])->name('diagnoses.show');

});
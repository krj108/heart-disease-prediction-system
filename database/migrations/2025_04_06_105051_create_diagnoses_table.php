<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('diagnoses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                  ->constrained()
                  ->cascadeOnDelete();

            // بيانات المريض
            $table->unsignedTinyInteger('age');                             // العمر (25-90)
            $table->unsignedTinyInteger('gender');                          // 0=ذكر, 1=أنثى
            $table->boolean('hypertension');                                // 1=نعم ارتفاع ضغط, 0=لا
            $table->boolean('diabetes');                                    // 1=نعم سكري, 0=لا
            $table->unsignedSmallInteger('cholesterol_level');              // mg/dL (100-400)
            $table->boolean('obesity');                                     // 1=نعم, 0=لا
            $table->boolean('family_history');                              // 1=نعم، 0=لا
            $table->unsignedTinyInteger('smoking_status');                  // 0=أبداً,1=سابق,2=حالي
            $table->unsignedTinyInteger('alcohol_consumption');             // 0=لا,1=خفيف,2=عالي
            $table->unsignedTinyInteger('physical_activity');               // 0=منخفض,1=متوسط,2=عالي
            $table->boolean('dietary_habits');                              // 0=غير صحي,1=صحي
            $table->unsignedTinyInteger('stress_level');                    // 0=منخفض,1=متوسط,2=عالي
            $table->decimal('sleep_hours_clean', 3, 1);                     // 3.0–9.0
            $table->unsignedSmallInteger('blood_pressure_systolic');        // 70–250
            $table->unsignedSmallInteger('blood_pressure_diastolic');       // 40–150
            $table->unsignedSmallInteger('fasting_blood_sugar');            // 60–200
            $table->unsignedSmallInteger('cholesterol_hdl');                // 20–100
            $table->unsignedSmallInteger('cholesterol_ldl');                // 50–300
            $table->unsignedSmallInteger('triglycerides');                  // 60–460
            $table->boolean('EKG_results');                                 // 0=طبيعي,1=غير طبيعي
            $table->boolean('previous_heart_disease');                      // 1=نعم,0=لا
            $table->boolean('medication_usage');                            // 1=نعم,0=لا
            $table->unsignedSmallInteger('waist_circumference');            // 50–140
            $table->unsignedTinyInteger('air_pollution_exposure');          // 0=منخفض,1=متوسط,2=عالي

            // نتائج النموذج الخارجي
            $table->decimal('risk_percentage', 5, 2)->nullable();           // نسبة المخاطر
            $table->unsignedTinyInteger('prediction_result')->nullable();   // 0 أو 1
            $table->json('top_5_factors')->nullable();                      // العوامل الأهم
            $table->json('recommendations')->nullable();                    // التوصيات

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('diagnoses');
    }
};

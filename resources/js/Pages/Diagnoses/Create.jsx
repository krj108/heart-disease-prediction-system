import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        age: '', gender: 0, hypertension: 0, diabetes: 0, cholesterol_level: '',
        obesity: 0, family_history: 0, smoking_status: 0, alcohol_consumption: 0,
        physical_activity: 0, dietary_habits: 0, stress_level: 0, sleep_hours_clean: '',
        blood_pressure_systolic: '', blood_pressure_diastolic: '', fasting_blood_sugar: '',
        cholesterol_hdl: '', cholesterol_ldl: '', triglycerides: '',
        EKG_results: 0, previous_heart_disease: 0, medication_usage: 0,
        waist_circumference: '', air_pollution_exposure: 0,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('diagnoses.store'));
    }

    const input = (label, name, type='number', attrs={}) => (
        <div className="space-y-1">
            <label className="block text-gray-700">{label}</label>
            <input
                type={type}
                className="w-full rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                value={data[name]}
                onChange={e => setData(name, e.target.value)}
                {...attrs}
            />
            <InputError message={errors[name]} />
        </div>
    );

    return (
        <AuthenticatedLayout auth={usePage().props.auth}>
            <div className="max-w-3xl mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Heart Disease Diagnosis Form</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {input("Age (25–90)", "age", "number", { min:25, max:90, required:true })}
                    <div>
                        <label className="block text-gray-700">Gender</label>
                        <select
                            className="w-full rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            value={data.gender}
                            onChange={e => setData('gender', e.target.value)}
                        >
                            <option value={0}>Male</option>
                            <option value={1}>Female</option>
                        </select>
                        <InputError message={errors.gender} />
                    </div>
                    {input("Hypertension (0/1)", "hypertension", "number", { min:0, max:1, required:true })}
                    {input("Diabetes (0/1)", "diabetes", "number", { min:0, max:1, required:true })}
                    {input("Cholesterol Level (100–400)", "cholesterol_level", "number", { min:100, max:400, required:true })}
                    {input("Obesity (0/1)", "obesity", "number", { min:0, max:1, required:true })}
                    {input("Family History (0/1)", "family_history", "number", { min:0, max:1, required:true })}
                    <div>
                        <label className="block text-gray-700">Smoking Status</label>
                        <select
                            className="w-full rounded border-gray-300"
                            value={data.smoking_status}
                            onChange={e => setData('smoking_status', e.target.value)}
                        >
                            <option value={0}>Never</option>
                            <option value={1}>Past</option>
                            <option value={2}>Current</option>
                        </select>
                        <InputError message={errors.smoking_status}/>
                    </div>
                    <div>
                        <label className="block text-gray-700">Alcohol Consumption</label>
                        <select
                            className="w-full rounded border-gray-300"
                            value={data.alcohol_consumption}
                            onChange={e => setData('alcohol_consumption', e.target.value)}
                        >
                            <option value={0}>None</option>
                            <option value={1}>Moderate</option>
                            <option value={2}>High</option>
                        </select>
                        <InputError message={errors.alcohol_consumption}/>
                    </div>
                    {input("Physical Activity (0–2)", "physical_activity")}
                    {input("Dietary Habits (0/1)", "dietary_habits", "number", { min:0, max:1 })}
                    {input("Stress Level (0–2)", "stress_level")}
                    {input("Sleep Hours (3.0–9.0)", "sleep_hours_clean", "number", { step:0.1, min:3, max:9 })}
                    {input("Systolic BP (70–250)", "blood_pressure_systolic")}
                    {input("Diastolic BP (40–150)", "blood_pressure_diastolic")}
                    {input("Fasting Blood Sugar (60–200)", "fasting_blood_sugar")}
                    {input("HDL (20–100)", "cholesterol_hdl")}
                    {input("LDL (50–300)", "cholesterol_ldl")}
                    {input("Triglycerides (60–460)", "triglycerides")}
                    {input("EKG Results (0/1)", "EKG_results", "number", { min:0, max:1 })}
                    {input("Previous Heart Disease (0/1)", "previous_heart_disease", "number", { min:0, max:1 })}
                    {input("Medication Usage (0/1)", "medication_usage", "number", { min:0, max:1 })}
                    {input("Waist Circumference (50–140)", "waist_circumference")}
                    {input("Air Pollution Exposure (0–2)", "air_pollution_exposure")}
                    <div className="md:col-span-2 text-center">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-indigo-600 text-white px-8 py-3 rounded hover:bg-indigo-700"
                        >
                            {processing ? 'Processing…' : 'Submit Diagnosis'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

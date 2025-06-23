import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show() {
  const { diagnosis, auth } = usePage().props;

  const yesNo = val => val ? 'Yes' : 'No';
  const genderLabel = val => val === 0 ? 'Male' : 'Female';
  const mapOption = (val, options) => options[val] || 'Unknown';

  const statRow = (label, value, altClass = '') => (
    <div className={`bg-white p-4 rounded-lg shadow-sm border ${altClass}`}>
      <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">{label}</div>
      <div className="text-lg font-semibold text-gray-800 mt-1">{value}</div>
    </div>
  );

  return (
    <AuthenticatedLayout auth={auth}>
      <div className="max-w-5xl mx-auto py-12 px-4 space-y-10">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">Diagnosis Summary</h2>

     
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statRow('Age', diagnosis.age)}
          {statRow('Gender', genderLabel(diagnosis.gender))}
          {statRow('Hypertension', yesNo(diagnosis.hypertension))}
          {statRow('Diabetes', yesNo(diagnosis.diabetes))}
          {statRow('Cholesterol Level', `${diagnosis.cholesterol_level} mg/dL`)}
          {statRow('Obesity', yesNo(diagnosis.obesity))}
          {statRow('Family History', yesNo(diagnosis.family_history))}
          {statRow('Smoking Status', mapOption(diagnosis.smoking_status, {0: 'Never', 1: 'Past', 2: 'Current'}))}
          {statRow('Alcohol Consumption', mapOption(diagnosis.alcohol_consumption, {0: 'None', 1: 'Moderate', 2: 'High'}))}
          {statRow('Physical Activity', mapOption(diagnosis.physical_activity, {0: 'Low', 1: 'Moderate', 2: 'High'}))}
          {statRow('Dietary Habits', yesNo(diagnosis.dietary_habits))}
          {statRow('Stress Level', mapOption(diagnosis.stress_level, {0: 'Low', 1: 'Moderate', 2: 'High'}))}
          {statRow('Sleep Hours', `${diagnosis.sleep_hours_clean} hrs`)}
          {statRow('Systolic BP', `${diagnosis.blood_pressure_systolic} mmHg`)}
          {statRow('Diastolic BP', `${diagnosis.blood_pressure_diastolic} mmHg`)}
          {statRow('Fasting Blood Sugar', `${diagnosis.fasting_blood_sugar} mg/dL`)}
          {statRow('HDL', `${diagnosis.cholesterol_hdl} mg/dL`)}
          {statRow('LDL', `${diagnosis.cholesterol_ldl} mg/dL`)}
          {statRow('Triglycerides', `${diagnosis.triglycerides} mg/dL`)}
          {statRow('EKG Results', yesNo(diagnosis.EKG_results))}
          {statRow('Previous Heart Disease', yesNo(diagnosis.previous_heart_disease))}
          {statRow('Medication Usage', yesNo(diagnosis.medication_usage))}
          {statRow('Waist Circumference', `${diagnosis.waist_circumference} cm`)}
          {statRow('Air Pollution Exposure', mapOption(diagnosis.air_pollution_exposure, {0: 'Low', 1: 'Moderate', 2: 'High'}))}
        </div>

        {/* Risk and result */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div className="p-6 bg-indigo-100 rounded-lg shadow text-center">
            <p className="text-sm text-gray-600 font-medium">Risk Percentage</p>
            <p className="text-4xl font-bold text-indigo-800">{diagnosis.risk_percentage}%</p>
          </div>
          {/* <div className="p-6 bg-gray-100 rounded-lg shadow text-center">
            <p className="text-sm text-gray-600 font-medium">Prediction Result</p>
            <p className={`text-4xl font-bold ${diagnosis.prediction_result ? 'text-red-600' : 'text-green-600'}`}>
              {diagnosis.prediction_result ? 'High Risk' : 'Low Risk'}
            </p>
          </div> */}
        </div>

        {/* Top 5 factors */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Top 5 Contributing Factors</h3>
          <ul className="space-y-2">
            {diagnosis.top_5_factors.map((f, i) => (
              <li key={i} className="flex justify-between border-b pb-2">
                <span className="text-gray-700 font-medium">{f.feature}</span>
                <span className="text-sm text-gray-500">{f.contribution.toFixed(3)}</span>
              </li>
            ))}
          </ul>
        </div>

       
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
          <ul className="list-decimal pl-5 space-y-2">
            {diagnosis.recommendations.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>

        <div className="text-center pt-6">
          <Link href={route('diagnoses.index')} className="text-indigo-600 hover:underline">
            ← Back to list
          </Link>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

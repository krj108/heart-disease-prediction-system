import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index() {
  const { diagnoses, auth } = usePage().props;

  return (
    <AuthenticatedLayout auth={auth}>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
       
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h1 className="text-3xl font-extrabold text-gray-900">Diagnosis History</h1>
          <Link
            href={route('diagnoses.create')}
            className="inline-flex items-center px-5 py-2 bg-indigo-600 text-white font-medium rounded-md shadow hover:bg-indigo-700 transition"
          >
            + New Diagnosis
          </Link>
        </div>

     
        {diagnoses.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No records found.</p>
          </div>
        ) : (
        
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Date', 'Risk %', 'Action'].map((col) => (
                    <th
                      key={col}
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {diagnoses.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{d.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{d.risk_percentage}%</td>
                    {/* <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        d.prediction_result ? 'text-red-600' : 'text-green-600'
                      }`}
                    >
                      {d.prediction_result ? 'High Risk' : 'Low Risk'}
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        href={route('diagnoses.show', d.id)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}

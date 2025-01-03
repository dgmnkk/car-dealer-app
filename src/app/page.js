'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [makes, setMakes] = useState([]);
  const [selectedMakeId, setSelectedMakeId] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i);

  useEffect(() => {
    fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
      .then((response) => response.json())
      .then((data) => setMakes(data.Results))
      .catch((error) => console.error('Error fetching vehicle makes:', error));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl text-blue-500 font-bold mb-6">Car Filter</h1>

      <div className="mb-4">
        <label htmlFor="makes" className="block mb-2">Select Car Make:</label>
        <select
          id="makes"
          value={selectedMakeId}
          onChange={(e) => setSelectedMakeId(e.target.value)}
          className="border border-blue-300 rounded p-2 w-64"
        >
          <option value="">Select Make</option>
          {makes.map((make) => (
            <option key={make.MakeId} value={make.MakeId}>
              {make.MakeName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="years" className="block mb-2">Select Model Year:</label>
        <select
          id="years"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-blue-300 rounded p-2 w-64"
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <Link
        href={selectedMakeId && selectedYear ? `/result/${selectedMakeId}/${selectedYear}` : '#'}
        className={`px-4 py-2 text-white rounded ${selectedMakeId && selectedYear ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
      >
        Next
      </Link>
    </div>
  );
}

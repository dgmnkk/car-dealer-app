import {use} from 'react';

async function fetchModels(makeId, year) {
    const response = await fetch(`${process.env.API_BASE_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`);
    const data = await response.json();
    return data.Results;
}

async function fetchMakeName(makeId) {
    const response = await fetch(`${process.env.API_BASE_URL}/GetMakesForVehicleType/car?format=json`);
    const data = await response.json();
  
    const make = data.Results.find((item) => item.MakeId?.toString() === makeId);
    return make ? make.MakeName : 'Unknown';
  }

export default function ResultPageContent({ makeId, year }) {
    const models = use(fetchModels(makeId, year));
    const makeName = use(fetchMakeName(makeId));

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-3xl text-blue-500 font-bold mb-6">
          Models for {makeName} in {year}
        </h1>
  
        <div className="w-full max-w-md">
          {models.length > 0 ? (
            <ul className="space-y-4">
              {models.map((model, index) => (
                <li key={index} className="border-b pb-2">
                  <p className="text-xl">{model.Model_Name}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No models found for {makeId} in {year}</p>
          )}
        </div>
      </div>
    );
}
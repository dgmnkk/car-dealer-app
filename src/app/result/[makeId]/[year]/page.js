import React, { Suspense } from 'react';
import ResultPageContent from '@/components/ResultPageContent';

export default function ResultPage({ params }) {
  const { makeId, year } = params;

  return (
    <Suspense fallback={<div className="text-center text-xl">Loading...</div>}>
      <ResultPageContent makeId={makeId} year={year} />
    </Suspense>
  );
}

export async function generateStaticParams() {
    try {
      const makesResponse = await fetch(`${process.env.API_BASE_URL}/GetMakesForVehicleType/car?format=json`);
      const makesData = await makesResponse.json();
  
      if (!makesData || !makesData.Results || makesData.Results.length === 0) {
        return [];
      }
  
      const currentYear = new Date().getFullYear();
      const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i);
      const paths = makesData.Results.flatMap((make) =>
        years.map((year) => ({
          makeId: make.MakeId?.toString(),
          year: year.toString(),
        }))
      );
  
      return paths.filter((path) => path.makeId);
    } catch (error) {
      console.error('Error in generateStaticParams:', error);
      return [];
    }
}
  
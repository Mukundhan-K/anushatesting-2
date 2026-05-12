import React from 'react';

const COMPARISON_DATA = [
  { parameter: '500+ Quality Checks', brand: true, others: false },
  { parameter: '10 Years Structural Warranty', brand: true, others: false },
  { parameter: '1 Year Free Repair', brand: true, others: false },
  { parameter: 'Direct Material Supply', brand: true, others: false },
  { parameter: 'Government Approved', brand: true, others: false },
  { parameter: 'Vastu Based Option', brand: true, others: false },
  { parameter: 'Online Project Tracking', brand: true, others: false },
];

const ComparisonTable = () => {
  return (
    <section className='w-full pt-0 md:pt-10 py-10'>
      <div className="w-full sm:container lg:w-full lg:max-w-none lg:px-0 mx-auto px-4">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="p-5 md:p-7 text-lg font-bold text-slate-800 w-1/2">
                  Parameter
                </th>
                <th className="p-5 md:p-7 text-center text-lg font-bold text-a-royalsafforn bg-orange-100">
                  Aspl
                </th>
                <th className="p-5 md:p-7 text-center text-lg font-bold text-gray-500">
                  Others
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {COMPARISON_DATA.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors group">
                  {/* Parameter Name */}
                  <td className="p-5 md:p-6 text-sm md:text-base font-medium text-slate-600">
                    {row.parameter}
                  </td>

                  {/* Brand Value (Check) */}
                  <td className="p-5 md:p-6 text-center bg-orange-100">
                    <div className="flex justify-center">
                      <CheckIcon />
                    </div>
                  </td>

                  {/* Others Value (Cross) */}
                  <td className="p-5 md:p-6 text-center">
                    <div className="flex justify-center">
                      <CrossIcon />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

// Custom SVG Icons to match the image exactly
const CheckIcon = () => (
  <div className="w-6 h-6 rounded-full bg-a-green flex items-center justify-center text-white shadow-sm">
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="4" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="w-3.5 h-3.5"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </div>
);

const CrossIcon = () => (
  <div className="w-6 h-6 rounded-full bg-a-royalsafforn flex items-center justify-center text-white shadow-sm">
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="4" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="w-3.5 h-3.5"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  </div>
);

export default ComparisonTable;
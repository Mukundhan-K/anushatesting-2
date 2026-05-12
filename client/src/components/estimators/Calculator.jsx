import React, { useState, useMemo } from 'react';

const DynamicConstructionCalculator = () => {
  // --- STATE MANAGEMENT ---
  const [inputs, setInputs] = useState({
    plotArea: '',
    builtUpArea: '',
    parkingArea: '',
    floors: 1, // 1 = G, 2 = G+1, 3 = G+2, 4 = G+3
    packageType: 'Standard',
    sumpCapacity: '',
    tankCapacity: '',
    solar: false,
    lift: false,
    automation: false,
    gate: false,
  });

  // --- DATA & RATES (Chennai 2026 Standards) ---
  const packages = {
    Basic: { rate: 1899, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-500' },
    Standard: { rate: 2199, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-500' },
    Premium: { rate: 2549, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-500' },
    Luxury: { rate: 2899, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-500' }
  };

  const rates = {
    parking: 1800,
    sump: 25, // per litre
    tank: 35, // per litre
    solar: 150000,
    lift: 800000,
    automation: 20000,
    gate: 125000,
  };

  // --- VALIDATION ---
  // Define which fields are mandatory
  const isPlotValid = parseFloat(inputs.plotArea) > 0;
  const isBuiltUpValid = parseFloat(inputs.builtUpArea) > 0;
  const isFormValid = isPlotValid && isBuiltUpValid;

  // --- CALCULATIONS ---
  const results = useMemo(() => {
    if (!isFormValid) return { total: 0, base: 0, extras: 0, timeline: 0, totalArea: 0 };

    const totalBuiltUp = parseFloat(inputs.builtUpArea) * inputs.floors;
    const baseCost = totalBuiltUp * packages[inputs.packageType].rate;
    
    const parkingCost = (parseFloat(inputs.parkingArea) || 0) * rates.parking;
    
    let extrasCost = parkingCost;
    extrasCost += (parseFloat(inputs.sumpCapacity) || 0) * rates.sump;
    extrasCost += (parseFloat(inputs.tankCapacity) || 0) * rates.tank;
    if (inputs.solar) extrasCost += rates.solar;
    if (inputs.lift) extrasCost += rates.lift;
    if (inputs.automation) extrasCost += rates.automation;
    if (inputs.gate) extrasCost += rates.gate;

    // Base timeline is ~10 months, +4 months per additional floor
    const timeline = 10 + ((inputs.floors - 1) * 4);

    return {
      totalArea: totalBuiltUp,
      base: baseCost,
      extras: extrasCost,
      total: baseCost + extrasCost,
      timeline: timeline
    };
  }, [inputs, isFormValid]);

  // --- HANDLERS ---
  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          House Construction <span className="text-orange-500">Cost Calculator</span>
        </h1>
        <p className="text-slate-500 mt-2 text-lg">Calculate your estimated build cost in Chennai (2026 rates).</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT COLUMN: INPUT FORM --- */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Step 1: Area Requirements */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-100 text-orange-600 p-2 rounded-lg"><AreaIcon /></div>
              <h2 className="text-xl font-bold">1. Area Requirements</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Plot Area (Sq.Ft) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" name="plotArea" value={inputs.plotArea} onChange={handleInput}
                  placeholder="e.g. 1200"
                  className={`w-full p-4 bg-slate-50 border rounded-xl outline-none transition-all ${!isPlotValid && inputs.plotArea !== '' ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'}`}
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Built-Up Area / Floor (Sq.Ft) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" name="builtUpArea" value={inputs.builtUpArea} onChange={handleInput}
                  placeholder="e.g. 1000"
                  className={`w-full p-4 bg-slate-50 border rounded-xl outline-none transition-all ${!isBuiltUpValid && inputs.builtUpArea !== '' ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'}`}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Car Parking Area (Sq.Ft) <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input 
                  type="number" name="parkingArea" value={inputs.parkingArea} onChange={handleInput}
                  placeholder="Leave blank if none. e.g. 200 for 1 car"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Floors */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-100 text-orange-600 p-2 rounded-lg"><HomeIcon /></div>
              <h2 className="text-xl font-bold">2. Number of Floors</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { val: 1, label: 'Ground Only', code: 'G' },
                { val: 2, label: 'G + 1', code: 'G+1' },
                { val: 3, label: 'G + 2', code: 'G+2' },
                { val: 4, label: 'G + 3', code: 'G+3' }
              ].map((floor) => (
                <button
                  key={floor.val}
                  onClick={() => setInputs({...inputs, floors: floor.val})}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${inputs.floors === floor.val ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm' : 'border-slate-100 hover:border-slate-300 text-slate-600'}`}
                >
                  <div className="text-2xl font-black mb-1">{floor.code}</div>
                  <div className="text-xs font-medium">{floor.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Package Tier */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-100 text-orange-600 p-2 rounded-lg"><StarIcon /></div>
              <h2 className="text-xl font-bold">3. Construction Quality Tier</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(packages).map(([key, data]) => (
                <div 
                  key={key}
                  onClick={() => setInputs({...inputs, packageType: key})}
                  className={`cursor-pointer p-6 rounded-xl border-2 transition-all relative overflow-hidden ${inputs.packageType === key ? `${data.border} ${data.bg}` : 'border-slate-100 hover:border-slate-300'}`}
                >
                  {inputs.packageType === key && (
                    <div className="absolute top-4 right-4 text-green-500"><CheckCircleIcon /></div>
                  )}
                  <h3 className={`text-lg font-black uppercase tracking-wide ${inputs.packageType === key ? data.color : 'text-slate-700'}`}>
                    {key} Tier
                  </h3>
                  <div className="mt-2 text-3xl font-black text-slate-900">
                    ₹{data.rate} <span className="text-sm font-medium text-slate-500">/sqft</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200/60 flex flex-wrap gap-2">
                    {key === 'Standard' && <span className="text-xs bg-white px-2 py-1 rounded shadow-sm">✓ ARS Steel</span>}
                    {key === 'Standard' && <span className="text-xs bg-white px-2 py-1 rounded shadow-sm">✓ Zuari Cement</span>}
                    {key === 'Luxury' && <span className="text-xs bg-white px-2 py-1 rounded shadow-sm">✓ Tata Tiscon</span>}
                    {key === 'Luxury' && <span className="text-xs bg-white px-2 py-1 rounded shadow-sm">✓ Italian Marble</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 4: Add-ons */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-100 text-orange-600 p-2 rounded-lg"><PlusIcon /></div>
              <h2 className="text-xl font-bold">4. Add-ons & Extras</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Sump Capacity (Litres)</label>
                <input type="number" name="sumpCapacity" value={inputs.sumpCapacity} onChange={handleInput} placeholder="e.g. 10000" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Overhead Tank (Litres)</label>
                <input type="number" name="tankCapacity" value={inputs.tankCapacity} onChange={handleInput} placeholder="e.g. 2000" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <ToggleBtn label="Solar Plant" active={inputs.solar} onClick={() => setInputs({...inputs, solar: !inputs.solar})} />
              <ToggleBtn label="Elevator / Lift" active={inputs.lift} onClick={() => setInputs({...inputs, lift: !inputs.lift})} />
              <ToggleBtn label="Smart Home" active={inputs.automation} onClick={() => setInputs({...inputs, automation: !inputs.automation})} />
              <ToggleBtn label="Sliding Gate" active={inputs.gate} onClick={() => setInputs({...inputs, gate: !inputs.gate})} />
            </div>
          </div>

        </div>

        {/* --- RIGHT COLUMN: STICKY LIVE REPORT --- */}
        <div className="lg:col-span-4">
          <div className="sticky top-8">
            
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute -right-10 -top-10 opacity-5"><LogoBg /></div>

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-orange-500 font-bold tracking-widest uppercase text-sm">Live Estimate</h3>
                  {isFormValid ? <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span> : null}
                </div>

                {!isFormValid ? (
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center text-slate-400">
                    <div className="mx-auto w-12 h-12 text-slate-600 mb-3"><LockIcon /></div>
                    <p className="text-sm">Please enter <strong className="text-white">Plot Area</strong> and <strong className="text-white">Built-up Area</strong> to unlock your construction estimate.</p>
                  </div>
                ) : (
                  <div className="animate-fade-in">
                    <p className="text-5xl font-black tracking-tight mb-2">
                      ₹ {results.total.toLocaleString('en-IN')}
                    </p>
                    <p className="text-slate-400 text-sm">Total Estimated Cost (2026)</p>

                    <div className="mt-8 space-y-5 border-t border-slate-700/50 pt-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-slate-300">
                          <CalendarIcon /> <span className="text-sm">Est. Timeline</span>
                        </div>
                        <span className="font-bold text-white">{results.timeline} Months</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-slate-300">
                          <BlueprintIcon /> <span className="text-sm">Total Built-Up</span>
                        </div>
                        <span className="font-bold text-white">{results.totalArea} sqft</span>
                      </div>

                      <div className="pt-4 border-t border-slate-700/50 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Base Construction</span>
                          <span className="font-medium text-white">₹ {results.base.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Add-ons & Extras</span>
                          <span className="font-medium text-white">₹ {results.extras.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <button 
                  disabled={!isFormValid}
                  className={`w-full mt-8 py-4 rounded-xl font-bold transition-all text-center flex justify-center items-center gap-2 ${
                    isFormValid 
                    ? 'bg-orange-500 hover:bg-orange-400 text-white shadow-lg shadow-orange-500/30' 
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Download Detailed PDF
                </button>
              </div>
            </div>

            {/* Optional Chart / Breakdown (Visible only if valid) */}
            {isFormValid && (
              <div className="mt-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm animate-fade-in">
                <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase">Cost Distribution</h4>
                <div className="space-y-3">
                  <ProgressBar label="Foundation & Structure" percent={33} color="bg-orange-500" />
                  <ProgressBar label="Finishing & Flooring" percent={25} color="bg-blue-500" />
                  <ProgressBar label="Electrical & Plumbing" percent={20} color="bg-green-500" />
                  <ProgressBar label="Doors, Windows & Paint" percent={22} color="bg-purple-500" />
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const ToggleBtn = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
      active ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
    }`}
  >
    {active ? '✓ ' : '+ '}{label}
  </button>
);

const ProgressBar = ({ label, percent, color }) => (
  <div>
    <div className="flex justify-between text-xs text-slate-600 mb-1">
      <span>{label}</span>
      <span className="font-bold">{percent}%</span>
    </div>
    <div className="w-full bg-slate-100 rounded-full h-1.5">
      <div className={`${color} h-1.5 rounded-full`} style={{ width: `${percent}%` }}></div>
    </div>
  </div>
);

// --- CUSTOM SVGS ---

const AreaIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16v16H4V4zm4 4h8v8H8V8z" />
  </svg>
);

const HomeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-6 h-6 bg-white rounded-full" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const LockIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const BlueprintIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const LogoBg = () => (
  <svg className="w-64 h-64 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" />
  </svg>
);

export default DynamicConstructionCalculator;
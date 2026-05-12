// import React, {useState} from 'react';
// import CommonForm from '../common/CommonForm';

// const CostEstimator = ({registeredFormControl, clsStyle, divCls}) => {


//   const [formData, setFormData] = useState({});

//   return (<>
//     <div className={divCls}>
//       <div>
//         <CommonForm
//           formControls={registeredFormControl}
//           formData={formData}
//           setFormData={setFormData}
//           defaultOnSubmit={true}
//           btnclass={"pt-6 justify-center"}
//           formClass={`grid ${clsStyle ? clsStyle : "sm:grid-cols-2"} gap-8`}
//           buttonText={"Estimate Construction Cost For Free"}
//           btntype='submit'
//         />
//       </div>
//     </div>
//   </>);
// };

// export default CostEstimator;

import React, { useState, useMemo } from 'react';
import Marquee from '../ui/marquee';
import Heading from '../common/Heading';


const MasterConstructionDashboard = () => {
  // --- COMPLETE STATE ENGINE ---
  const [inputs, setInputs] = useState({
    plotArea: 1200,
    builtUpArea: 1000,
    floors: 1,
    packageType: 'comfort',
    soilType: 'Standard', // Standard | Loose (Foundation premium)
    interiorLevel: 'Modular (Kitchen + Wardrobes)', 
    approvalRequired: false,
    vastuCompliant: false,
    soilTesting: false,
    monsoonBuffer: false,
    // Add-on Toggles (All 12 items from the image + eco-tech)
    addons: {
      recycling: false,
      overhead: true,
      compound: true,
      sump: true,
      solar: false,
      gate: false,
      cctv: false,
      smartHome: false,
      septic: true,
      lift: false,
      biogas: false,
      rainwater: false,
    },
    // Unit Capacities
    sumpLiters: 8000,
    overheadLiters: 2000,
    septicLiters: 2000,
    compoundLength: 0,
  });

  // --- DATA & RATES (Chennai 2026 Verified) ---
  const masterData = {
    packages: { comfort: 2250, Premium: 2750, Luxury: 3150 },
    interiors: { 
      'None': 0, 
      'Essential (Wardrobes)': 350, 
      'Modular (Kitchen + Wardrobes)': 650, 
      'Opulent (Full Interior)': 1100 
    },
    flatRates: {
      solar: 50000, gate: 125000, cctv: 30000, automation: 25000,
      lift: 800000, biogas: 45000, rainwater: 35000, recycling: 45000,
      approval: 125000, vastu: 25000, soilTest: 15000
    },
    unitRates: { sump: 25, overhead: 50, septic: 30, compound: 2500 }
  };

  // --- VALIDATION ---
  const isFormValid = inputs.plotArea > 0 && inputs.builtUpArea > 0;

  // --- DYNAMIC CALCULATIONS ---
  const results = useMemo(() => {
    if (!isFormValid) return null;

    const totalBuiltUp = inputs.builtUpArea * inputs.floors;
    
    // 1. Structural & Foundation
    let baseRate = masterData.packages[inputs.packageType];
    if (inputs.soilType === 'Loose') baseRate *= 1.12; // 12% surcharge for foundation reinforcement
    
    let baseCost = totalBuiltUp * baseRate;
    baseCost += totalBuiltUp * masterData.interiors[inputs.interiorLevel];

    // 2. Add-ons & Compliance
    let extraCost = 0;
    const a = inputs.addons;
    if (a.solar) extraCost += masterData.flatRates.solar;
    if (a.gate) extraCost += masterData.flatRates.gate;
    if (a.cctv) extraCost += masterData.flatRates.cctv;
    if (a.automation) extraCost += masterData.flatRates.automation;
    if (a.lift) extraCost += masterData.flatRates.lift;
    if (a.biogas) extraCost += masterData.flatRates.biogas;
    if (a.rainwater) extraCost += masterData.flatRates.rainwater;
    if (a.recycling) extraCost += masterData.flatRates.recycling;
    if (inputs.approvalRequired) extraCost += masterData.flatRates.approval;
    if (inputs.vastuCompliant) extraCost += masterData.flatRates.vastu;
    if (inputs.soilTesting) extraCost += masterData.flatRates.soilTest;

    // 3. Unit-based Add-ons
    if (a.sump) extraCost += inputs.sumpLiters * masterData.unitRates.sump;
    if (a.overhead) extraCost += inputs.overheadLiters * masterData.unitRates.overhead;
    if (a.septic) extraCost += inputs.septicLiters * masterData.unitRates.septic;
    if (a.compound) extraCost += inputs.compoundLength * masterData.unitRates.compound;

    const total = baseCost + extraCost;

    // 4. Timeline Logic
    let timeline = 10 + (inputs.floors - 1) * 4;
    if (a.lift) timeline += 1;
    if (inputs.monsoonBuffer) timeline += 2;

    // 5. Visual Breakdown (Matching the Image Percentages)
    const phases = [
      { label: "Foundation & RCC Structure", pct: 33, color: "bg-blue-500" },
      { label: "Brickwork & Plastering", pct: 15, color: "bg-[#026f41]" },
      { label: "Flooring & Tiling", pct: 10, color: "bg-yellow-500" },
      { label: "Electrical & Plumbing", pct: 12, color: "bg-purple-500" },
      { label: "Doors & Windows", pct: 12, color: "bg-pink-500" },
      { label: "Painting & Finishing", pct: 18, color: "bg-[#FF8C00]" },
    ];

    return { total, timeline, baseCost, extraCost, totalBuiltUp, phases };
  }, [inputs]);

  const toggleAddon = (key) => setInputs(prev => ({ ...prev, addons: { ...prev.addons, [key]: !prev.addons[key] } }));

  return (
    <section className="h-full w-full bg-[#F3F4F6] ">
      <div className="sm:container mx-auto py-10 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT: CONFIGURATOR (8 Cols) --- */}
        <div className="lg:col-span-8 space-y-6">
          <div className='pb-10'>
            <Marquee quotes={"Free Estimate"} />
            <div className='pt-10'></div>
            <h1 className='siteHeading text-3xl md:text-4xl lg:text-5xl font-semibold'>Estimate your Home Construction Cost</h1>
            <p className="lg:pb-8 text-lg leading-8 text-gray-600">Building your dream home? Instantly calculate your construction cost and plan your budget with confidence</p>
          </div>

          {/* 1. Dimensions & Site */}
          <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200/60">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2 underline decoration-[#FF8C00] decoration-4 underline-offset-8">1. Project Dimensions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InputGroup label="Plot Area (sqft)" value={inputs.plotArea} onChange={v => setInputs({...inputs, plotArea: v})} options={[600, 1200, 1800, 2400]} required />
              <InputGroup label="Built-up / Floor" value={inputs.builtUpArea} onChange={v => setInputs({...inputs, builtUpArea: v})} options={[600, 1000, 1200, 1500]} required />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <SelectGrid label="Floors" options={[1, 2, 3, 4]} value={inputs.floors} onChange={v => setInputs({...inputs, floors: v})} format={f => `G${f>1?`+${f-1}`:''}`} />
              <SelectGrid label="Soil Condition" options={['Standard', 'Loose']} value={inputs.soilType} onChange={v => setInputs({...inputs, soilType: v})} />
            </div>
          </section>

          {/* 2. Quality & Architecture */}
          <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200/60">
            <h3 className="text-xl font-bold mb-6">2. Tier & Design</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {Object.keys(masterData.packages).map(pkg => (
                <button key={pkg} onClick={() => setInputs({...inputs, packageType: pkg})} className={`p-4 rounded-2xl border-2 text-left transition-all ${inputs.packageType === pkg ? 'border-[#026f41] bg-green-50 ring-4 ring-green-600/5' : 'border-slate-400 hover:border-slate-200'}`}>
                  <div className={`text-xs font-black uppercase ${inputs.packageType === pkg ? 'text-[#026f41]' : 'text-slate-600'}`}>{pkg} Tier</div>
                  <div className="font-bold">₹{masterData.packages[pkg]}</div>
                </button>
              ))}
            </div>
            <div className="mb-8">
              <SelectGrid label="Interior Finish" options={Object.keys(masterData.interiors)} value={inputs.interiorLevel} onChange={v => setInputs({...inputs, interiorLevel: v})} />
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusChip active={inputs.vastuCompliant} label="Vastu Compliant" onClick={() => setInputs({...inputs, vastuCompliant: !inputs.vastuCompliant})} />
              <StatusChip active={inputs.soilTesting} label="Soil Testing" onClick={() => setInputs({...inputs, soilTesting: !inputs.soilTesting})} />
              <StatusChip active={inputs.approvalRequired} label="Plan Approval" onClick={() => setInputs({...inputs, approvalRequired: !inputs.approvalRequired})} />
              <StatusChip active={inputs.monsoonBuffer} label="Monsoon Buffer (+2mo)" onClick={() => setInputs({...inputs, monsoonBuffer: !inputs.monsoonBuffer})} />
            </div>
          </section>

          {/* 3. Extra Requirements (The Grid from Image) */}
          <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200/60">
            <h3 className="text-xl font-bold mb-2">Any extra requirements?</h3>
            <p className="text-xs text-slate-400 mb-8 font-medium">Add-ons calculated on top of the base estimate.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AddonItem active={inputs.addons.recycling} label="Waste Water Recycling" sub="Alternative to septic" onClick={() => toggleAddon('recycling')} icon="💧" />
              <AddonItem active={inputs.addons.overhead} label="Overhead Concrete Tank" sub="₹50/litre" onClick={() => toggleAddon('overhead')} icon="🏗️" />
              <AddonItem active={inputs.addons.compound} label="Compound Wall" sub="₹2,500/rft" onClick={() => toggleAddon('compound')} icon="🧱" />
              <AddonItem active={inputs.addons.sump} label="Underground Sump" sub="₹25/litre" onClick={() => toggleAddon('sump')} icon="🕳️" />
              <AddonItem active={inputs.addons.solar} label="Solar Panels (3kW)" sub="+₹1,55,000" onClick={() => toggleAddon('solar')} icon="☀️" />
              <AddonItem active={inputs.addons.gate} label="Main Gate (MS/Sliding)" sub="+₹1,25,000" onClick={() => toggleAddon('gate')} icon="⛩️" />
              <AddonItem active={inputs.addons.cctv} label="CCTV & Security" sub="+₹30,000" onClick={() => toggleAddon('cctv')} icon="📹" />
              <AddonItem active={inputs.addons.automation} label="Smart Home Automation" sub="+₹25,000" onClick={() => toggleAddon('automation')} icon="🏠" />
              <AddonItem active={inputs.addons.septic} label="Conventional Septic" sub="₹30/litre" onClick={() => toggleAddon('septic')} icon="🛡️" />
              <AddonItem active={inputs.addons.lift} label="Lift (4 Passengers)" sub="+₹8,00,000" onClick={() => toggleAddon('lift')} icon="🛗" />
              <AddonItem active={inputs.addons.biogas} label="Biogas Plant" sub="Eco-Kitchen waste" onClick={() => toggleAddon('biogas')} icon="🔋" />
              <AddonItem active={inputs.addons.rainwater} label="Rainwater Harvesting" sub="Eco-filtration" onClick={() => toggleAddon('rainwater')} icon="🌧️" />
            </div>

            {/* Capacity Sliders (Dynamic) */}
            <div className="mt-10 space-y-4">
              {inputs.addons.sump && <UnitControl label="Sump Capacity (L)" value={inputs.sumpLiters} onChange={v => setInputs({...inputs, sumpLiters: v})} rate={25} />}
              {inputs.addons.overhead && <UnitControl label="Overhead Tank (L)" value={inputs.overheadLiters} onChange={v => setInputs({...inputs, overheadLiters: v})} rate={50} />}
              {inputs.addons.compound && <UnitControl label="Compound Wall Length (RFT)" value={inputs.compoundLength} onChange={v => setInputs({...inputs, compoundLength: v})} rate={2500} />}
              {inputs.addons.septic && <UnitControl label="Septic Tank Capacity (L)" value={inputs.septicLiters} onChange={v => setInputs({...inputs, septicLiters: v})} rate={30} />}
            </div>
          </section>
        </div>

        {/* --- RIGHT: DASHBOARD (4 Cols) --- */}
        <div className="lg:col-span-4">
          <div className="sticky top-10 space-y-6">
            
            <div className="bg-[#026f41] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-10"><LogoIcon /></div>
               
               {!isFormValid ? (
                 <div className="py-12 text-center text-green-200 font-bold animate-pulse">Waiting for area inputs...</div>
               ) : (
                 <div className="animate-fadeIn relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400">Construction Quote</span>
                    <div className="text-5xl font-black mt-3">₹ {results.total.toLocaleString('en-IN')}</div>
                    
                    <div className="mt-10 space-y-4 border-t border-white/10 pt-8">
                       <ResultStat label="Estimated Time" val={`${results.timeline} Months`} color="text-orange-400" />
                       <ResultStat label="Base Build Cost" val={`₹${results.baseCost.toLocaleString()}`} />
                       <ResultStat label="Add-ons Total" val={`₹${results.extraCost.toLocaleString()}`} />
                    </div>

                    <button className="w-full bg-[#FF8C00] py-5 rounded-2xl mt-10 font-black tracking-widest text-sm shadow-lg shadow-orange-900/40 hover:scale-105 transition-all">GENERATE FULL REPORT</button>
                 </div>
               )}
            </div>

            {/* Phase Breakdown (Visual Component from Image) */}
            {isFormValid && (
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200/60 animate-fadeIn">
                 <h3 className="text-2xl font-black mb-1 border-b-4 border-[#FF8C00] inline-block pb-1">Phase-Wise Breakdown</h3>
                 <div className="mt-8 space-y-5">
                    {results.phases.map((p, i) => (
                      <div key={i} className="space-y-1.5">
                        <div className="flex justify-between text-[11px] font-bold text-slate-600 uppercase tracking-tighter">
                          <span>{p.label}</span>
                          <span className="text-slate-800 font-black">₹{Math.round(results.total * (p.pct/100)).toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div className={`${p.color} h-full transition-all duration-1000`} style={{ width: `${p.pct}%` }} />
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

// --- SUB-COMPONENTS ---

const InputGroup = ({ label, value, onChange, options, required }) => (
  <div className="space-y-2">
    <label className="text-sm font-black uppercase text-slate-800">{label} {required && '*'}</label>
    <input type="number" value={value} onChange={e => onChange(Number(e.target.value))} className="w-full bg-slate-100 border border-slate-400 p-4 rounded-xl outline-none focus:ring-2 ring-orange-500/10 font-bold text-lg" />
    <div className="flex gap-2 mt-2">
      {options.map(v => (
        <button key={v} onClick={() => onChange(v)} className="text-xs font-black px-2 py-1 bg-slate-50 rounded-md text-slate-800 border border-slate-400 hover:bg-[#FF8C00] hover:text-white transition-all">{v} sqft</button>
      ))}
    </div>
  </div>
);

const SelectGrid = ({ label, options, value, onChange, format }) => (
  <div className="space-y-2">
    <label className="text-sm font-black uppercase text-slate-800">{label}</label>
    <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100 gap-1 overflow-x-auto no-scrollbar">
      {options.map(opt => (
        <button key={opt} onClick={() => onChange(opt)} className={`flex-1 min-w-fit px-3 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap border border-slate-400 ${value === opt ? 'bg-green-50 shadow-sm text-[#026f41] border-2 border-a-green!' : 'text-slate-400'}`}>
          {format ? format(opt) : opt}
        </button>
      ))}
    </div>
  </div>
);

const AddonItem = ({ active, label, sub, onClick, icon }) => (
  <div onClick={onClick} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${active ? 'border-[#FF8C00] bg-orange-50' : 'border-slate-50 hover:border-slate-100'}`}>
    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${active ? 'bg-[#FF8C00] border-[#FF8C00] text-white' : 'border-slate-200'}`}>
      {active && <CheckIcon />}
    </div>
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${active ? 'bg-white' : 'bg-slate-50 grayscale opacity-50'}`}>{icon}</div>
    <div className="flex-1">
      <div className="text-sm font-black leading-none mb-1">{label}</div>
      <div className="text-xs text-slate-800 font-bold">{sub}</div>
    </div>
  </div>
);

const UnitControl = ({ label, value, onChange, rate }) => (
  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/50 flex flex-col md:flex-row justify-between items-center gap-4 animate-fadeIn">
    <div className="flex-1 w-full">
      <label className="text-xs font-black uppercase text-slate-500 mb-2 block">{label}</label>
      <input type="number" value={value} onChange={e => onChange(Number(e.target.value))} className="w-full bg-white p-3 rounded-xl border border-slate-200 outline-none focus:border-[#FF8C00]" />
    </div>
    <div className="bg-white px-6 py-4 rounded-xl border border-slate-100 min-w-[120px] text-center shadow-sm">
      <div className="text-xs font-bold text-slate-800 uppercase mb-1">Add-on Cost</div>
      <div className="font-black text-[#FF8C00]">₹{(value * rate).toLocaleString()}</div>
    </div>
  </div>
);

const StatusChip = ({ active, label, onClick }) => (
  <button onClick={onClick} className={`px-4 py-2 rounded-full border-2 text-xs font-black uppercase transition-all ${active ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-50 text-slate-800 hover:border-slate-200'}`}>
    {active ? '✓ ' : '+ '}{label}
  </button>
);

const ResultStat = ({ label, val, color }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-green-200/60 font-medium">{label}</span>
    <span className={`font-black ${color || 'text-white'}`}>{val}</span>
  </div>
);

const LogoIcon = () => <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" /></svg>;
const CheckIcon = () => <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" d="M5 13l4 4L19 7" /></svg>;

export default MasterConstructionDashboard;
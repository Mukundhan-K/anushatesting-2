import React,{useCallback} from "react";
import { Link } from "react-router-dom";
import { getImageSvg, getImagewebp } from "../../utility/getImage";

const CostCalculatorPoster = () => {

    const scrollToTop = useCallback(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, []);
  
  return (
    <section className="relative w-full overflow-hidden pb-5">
      <Link onClick={scrollToTop}
        to="/estimator"
        className="group relative block overflow-hidden rounded-[32px] border border-gray-200 bg-white px-4 pb-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]"
      >
        <div className="grid min-h-[420px] grid-cols-1 lg:grid-cols-[45%_55%]">
          <div
            id="costEst"
            className='relative flex min-h-[80%] w-full rounded-4xl bg-[url("https://res.cloudinary.com/djw3rcz4j/image/upload/v1771930227/cvzsmrfapxk6dprakion_keooze.webp")] shadow-2xl group bgc'
          >
            <div className="flex w-full flex-col justify-end rounded-4xl bg-gradient-to-t from-a-green via-[#026f41]/40 to-transparent p-10">
              <div className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-xs uppercase tracking-[0.2em] text-white backdrop-blur-md">
                Real-time Progress
              </div>

              <h3 className="mb-6 text-4xl font-bold leading-tight text-white">
                Where Vison <br /> Meets Misson.
              </h3>

              <div className="flex items-center gap-5 border-t border-white/20 py-6">
                <div className="flex w-[230px] -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <img
                      key={i}
                      src={getImagewebp(`review/${i}`)}
                      className="size-12 rounded-full border-2 border-white"
                      alt="Client"
                    />
                  ))}
                </div>

                <p className="w-full text-wrap text-sm text-white/90">
                  Join <strong>1,200+</strong> people who planned with us this
                  year.
                </p>
              </div>
              <div className="flex items-center gap-4 rounded-[24px] bg-white/95 px-5 py-4 shadow-xl backdrop-blur-md">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-a-royalsafforn">
                  <img
                    src={getImageSvg("calculator")}
                    className="size-14"
                    alt="calc"
                  />
                </div>

                <div>
                  <h4 className="text-xl font-black text-gray-900">
                    Instant. Accurate.
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    Plan your dream home with confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col justify-between bg-[#fcfcfc] py-8 md:px-10 md:py-10">
            <div>
              <div className="max-w-[700px]">
                <h2 className="text-[38px] font-black leading-[1] tracking-[-2px] text-[#0f172a] md:text-[68px]">
                  House Construction
                  <br />
                  <span className="text-a-royalsafforn">Cost Calculator</span>
                </h2>

                <p className="mt-6 max-w-[650px] text-lg leading-8 text-gray-500">
                  Get accurate construction cost estimates for your home in 30
                  seconds. Tailored to your plot, floors and finish level.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-5">
                {[
                  {
                    title: "100% Accurate",
                    desc: "AI-powered estimation",
                  },
                  // {
                  //   title: "Save Time",
                  //   desc: "Estimate in 30 seconds",
                  // },
                  {
                    title: "Expert Support",
                    desc: "Guidance at every step",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-gray-200 bg-white p-4 transition-all group-hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 2L20 6V12C20 17 16 21 12 22C8 21 4 17 4 12V6L12 2Z"
                            stroke="#ff5b2e"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900">
                          {item.title}
                        </h4>

                        <p className="mt-1 text-sm text-gray-500">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-[28px] bg-gradient-to-r from-a-royalsafforn to-[#ff6b3d] px-6 py-6 md:flex-row md:items-center">
              <div className="space-y-2 text-white">
                {[
                  "Material + Labour + Finishes",
                  "Location-specific rates",
                  "Detailed cost breakdown",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="#FF8C00"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="inline-flex items-center gap-4 rounded-2xl bg-white px-8 py-5 text-lg font-black text-a-royalsafforn transition-all duration-300 group-hover:translate-x-1">
                Calculate Now
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12H19"
                    stroke="#FF8C00"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  <path
                    d="M13 6L19 12L13 18"
                    stroke="#FF8C00"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default CostCalculatorPoster;

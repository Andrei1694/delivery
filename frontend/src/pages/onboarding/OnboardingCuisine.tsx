import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

const cuisines = [
  {
    name: 'Sushi',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBXB1X1V4xwT0EURXMYraytOWuRhjSKs_OPSg1KomPgeVDigzkY0Xr9JHbtpgRt4FflYk9wOVvvecBULGEuwS8-1Z87JlF5PzLKhg8H3kIBsUOpju1amMQnAQ4QhhyfiMUtTvF5Gay_o2QmQf93IpAogueV7fz1NqGI3Q0fnBWh6gYd9dKCsP3SvimS_W0btbMvmqWdAvqh6epvQPLLyK2MgaFOpLjj0ftJnWMJeIyy2mBJQ4qrPn5FMnnlQ6sF_tJ0h4eU5XnY488',
    alt: 'Close up of delicious sushi roll',
  },
  {
    name: 'Italian',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAshWWyCBFP_ALp8z6mErw3sPX1Jb8t_zk7stDKILTtdp-iYuLMvz5gYWxFikq_1a0aFGJPwJ5Wv2F5TALTEuuyqYSM0ppp4KxVeKaT5eBumxqhYvkrGZKVBqh1dcYfSW3fvxUnDi3qIWFUz8F1tNRAf1TKKond11tYTUL-Sc8ruRYY6LDCfG_BXoOuALnHH2u--Iv9A-abJW8nvYZdeQQTApfuba0iBFAtxpRk8AWHRGbMdf6_VBAMwcnZa-kChqLnL-cI4HW8znI',
    alt: 'Classic italian pizza with basil',
  },
  {
    name: 'French',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCkkKgEX4lezBFSKOtshFWZsVpDBzd9QzQsKdeNKhWv7ChpzoCHaW4keWsB5JPw3PvRVpHAslN_0hzmGGNINKrkBQe-knsrg2ydFP4jyKEFGK356EY7FO6h3olHXy8jyGIun5JNR43kd2mfguw7cY-gKiG8EFnAQyRCKyvD3Dt53GdboCwZcTa5jkG-5yckiSa0IfpZVR6ieE21-Q4OlDnqR67kK8uCMPFcnA9LTHJMkx0NVBE5vAjLObn7gI3Aj-ook07kCg2yaJQ',
    alt: 'Gourmet steak and french fries',
  },
  {
    name: 'Thai',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCvZtsTSl3cdGbdwnLkkHU0injFUX4NJO3tHMapfg4Mqk5AcYwAWlhENoX0ySbahVtWEc2m2oS6KVksX6mVKdrKVuHV9HQGBP7sBWpE9jyJzIxUMD-oFiehLN2Ej3bhmdWTJW7zBY-JZ9BcBRq8Ip3oq9fDXlyv-deqBEnjHsww2oICg2avyaf-dmlDfba69woajr8fkF6w2MU8rrvpgfGAq4xAykOMP3g6Rb26tZTptQpiCJjFS7_-zohOibKNXLiiMtBYczJzEXs',
    alt: 'Spicy thai noodles with peanuts',
  },
  {
    name: 'Mexican',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBUYFZnE5ua9kyiubBwshg4_aOEoqXZLjTROcHGMW-D2rjz7MLQ_iMQtughlB77udow1vJV6Cg4xvw7mG5wotcwETQ1TNTw2Vi2cUNblYRgZgugCeMHHitWxMwYrXFa4m50usI-D3_ZRT6tPTAqbOCC-go6p8G55DquxLH7YOIELYElC9Mm6MQy9rQamCcYFDrGC30t796Hvm-j0PKpieEgrELofWmLxj8Zi4rvaLr_zMoSo4QiuDDECIvlfH10hR0HzOhAFxAc8G0',
    alt: 'Traditional mexican tacos with salsa',
  },
  {
    name: 'Greek',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAou0B3RyLFi5zzz8p2wAkDFjZ6Hjhp-tw23mN4P7l_48otbDiYrfd5tzVvkAPouNRBwRaBqO6Td6ROuog4K4nug2U1dmqqVRXpaHVmE3bCFZs3ihkHKvCD9ZlQtNT0UXZ0tc25i-1jKpFLhyxlKMmtMjTKBfd8M38MTcri24Jtg_GvPAfQF3NQKLYHk4M9pDTHkP7q6NUskGSlAIPJbUV1NwDpI_w_rstbpUQ4viPMxxyHoQ6fwzR7llgVFtGzniSd0lwfKgE57sA',
    alt: 'Bright mediterranean salad with olives',
  },
  {
    name: 'Vegan',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBNofDqsXtmQuEr9em0-x87ghHvtYItP7zDv_PyRXMMn8Zj9W1Gj5RujBh5iaJI7y_bUzkWUjSBCm3SA682Hk26ppju4SP94laKMwVTbp5OEJWJ8CaeMXAr3El1kM38UWcC3kwU6p_KO1gLwqwZUKmrSI4QFmlmgfcNN8ZxhKJNwjIYkEQ4noCUEIQHKbWGw5MLKBz9W3mfbXeHyaX5XQRu5JqqxHPN61dszcOjkbtJSNfdNX5tXggJFhrJ1Wh7Maep6cZ-3yfb-P8',
    alt: 'Fresh vegetable Buddha bowl',
  },
  {
    name: 'Chinese',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD5GNw3CZg-dENF3dFLMWRWs_h1DByZiBfjqYHOze05iWJpkzj_WFMf7fJyrdp4HqVzeqYHc9ZHipMcx7z8WlStM-DI3Iz1R-6n7JFJmWY14G95BKaeZVa83nEqoIyRHGFVkNtcF9POyA52ycYtVJlIXFrvtVyxvGJH4Pplhe-lCf60H1kWwip5rjXVC41MzOx8GeNtjr_sJQyKt69_gfh0gNx4XXRhDVOsxek_mnBFm0kSNgFLAICwnLM6Q610FTncePEoJzEpnVg',
    alt: 'Chinese dim sum dumplings',
  },
  {
    name: 'Vietnamese',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAO_L2cLKYoijVSGjECx32dL2hQG1UU7_ZS3abKzB8B3dYIbsjJ8L5osgJbq3rpwTbwY0s6wDuoB7Cr9hSp9fOLImwUpejBKrbcaDBWyhHqXola8UyUDTxHR1XLIuFRT2E3FsoKnJaxKZPP6YlCuI6iyvHQBSbOqcuy8BYj20Wk_KyEQdf9iaye_Op12ql5LSnbm_i8XpbDvr1hNJaFlxvekH4-P51Iqe8gpZMPQMGegX9pSvh8wHP4H69RiAsBxBP1xUutq3zNdb8',
    alt: 'Vietnamese beef pho noodle soup',
  },
];

function OnboardingCuisine() {
  const navigate = useNavigate();
  const [selectedCuisines, setSelectedCuisines] = useState(() => new Set(['Italian', 'Thai']));

  const toggleCuisine = (cuisineName) => {
    setSelectedCuisines((current) => {
      const next = new Set(current);
      if (next.has(cuisineName)) {
        next.delete(cuisineName);
      } else {
        next.add(cuisineName);
      }
      return next;
    });
  };

  return (
    <>
      <style>
        {`
          .onboarding-cuisine .font-headline {
            font-family: 'Plus Jakarta Sans', 'Manrope', sans-serif;
          }

          .onboarding-cuisine .font-body,
          .onboarding-cuisine .font-label {
            font-family: 'Manrope', sans-serif;
          }
        `}
      </style>

      <div
        className="onboarding-cuisine min-h-screen bg-surface font-body text-on-surface"
        style={{ minHeight: 'max(884px, 100dvh)' }}
      >
        <header className="sticky top-0 z-50 flex w-full items-center justify-between bg-[#fff4f3] px-6 py-4 dark:bg-stone-950">
          <div className="flex items-center gap-4">
            <button
              className="-ml-2 p-2 text-[#ac2c00] duration-200 active:scale-95 dark:text-[#ffb4a1]"
              type="button"
              onClick={() => navigate({ to: '/onboarding/location' })}
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <span className="font-headline text-lg font-bold tracking-tight text-[#4e2121] dark:text-[#f1dfdf]">
              Cuisine Preferences
            </span>
          </div>
          <div className="font-headline text-lg font-extrabold tracking-tighter text-[#ac2c00] dark:text-[#ffb4a1]">
            The Culinary Curator
          </div>
        </header>

        <main className="mx-auto flex-1 w-full max-w-xl px-6 pb-32 pt-8">
          <div className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-label text-xs font-bold uppercase tracking-widest text-on-surface/60">
                Step 2 of 3
              </span>
              <span className="font-label text-xs font-bold uppercase tracking-widest text-primary">
                67% Complete
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-primary to-primary-container" />
            </div>
          </div>

          <section className="mb-10">
            <h1 className="mb-2 font-headline text-3xl font-extrabold leading-tight text-on-surface">
              What delights your palate?
            </h1>
            <p className="font-body text-base text-on-surface-variant">
              Select your favorite cuisines to personalize your curated menu. Choose as many as
              you like.
            </p>
          </section>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {cuisines.map((cuisine) => {
              const isSelected = selectedCuisines.has(cuisine.name);

              return (
                <button
                  key={cuisine.name}
                  aria-pressed={isSelected}
                  className={`group relative flex flex-col items-center rounded-xl border-2 p-5 transition-all duration-300 ${
                    isSelected
                      ? 'border-primary bg-gradient-to-br from-primary/5 to-transparent'
                      : 'border-transparent bg-surface-container-lowest hover:bg-surface-container-low'
                  }`}
                  type="button"
                  onClick={() => toggleCuisine(cuisine.name)}
                >
                  <div className="mb-3 h-16 w-16 overflow-hidden rounded-full">
                    <img
                      alt={cuisine.alt}
                      className="h-full w-full object-cover"
                      src={cuisine.image}
                    />
                  </div>
                  <span className="font-headline text-sm font-bold text-on-surface">
                    {cuisine.name}
                  </span>
                  <div
                    className={`absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full transition-transform group-active:scale-90 ${
                      isSelected
                        ? 'bg-primary'
                        : 'border-2 border-outline-variant/30 bg-transparent'
                    }`}
                  >
                    {isSelected && (
                      <span
                        className="material-symbols-outlined text-[16px] text-white"
                        style={{ fontVariationSettings: "'wght' 700" }}
                      >
                        check
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </main>

        <div className="fixed bottom-0 left-0 right-0 z-40 flex flex-col gap-4 bg-surface/80 px-6 pb-10 pt-4 backdrop-blur-xl">
          <button
            className="w-full rounded-full bg-gradient-to-br from-primary to-primary-container py-4 font-headline font-bold text-white shadow-[0_8px_24px_rgba(172,44,0,0.2)] duration-200 active:scale-95"
            type="button"
            onClick={() => navigate({ to: '/onboarding/address' })}
          >
            Continue to Address
          </button>
          <button
            className="w-full py-2 font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant transition-opacity duration-200 active:opacity-60"
            type="button"
            onClick={() => navigate({ to: '/onboarding/address' })}
          >
            Skip for now
          </button>
        </div>
      </div>
    </>
  );
}

export default OnboardingCuisine;

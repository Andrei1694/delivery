import { Children, useEffect, useId, useRef, useState, type ReactNode } from 'react';

const DEFAULT_DESKTOP_GRID_CLASSNAME = 'md:grid md:grid-cols-2 md:gap-4';
const DEFAULT_SLIDE_WIDTH_CLASSNAME = 'w-[calc(100%-3rem)]';

type MobileCardSliderProps = {
  children: ReactNode;
  ariaLabel: string;
  className?: string;
  trackClassName?: string;
  slideClassName?: string;
  slideWidthClassName?: string;
  showDots?: boolean;
  desktopGridClassName?: string;
};

export default function MobileCardSlider({
  children,
  ariaLabel,
  className = '',
  trackClassName = '',
  slideClassName = '',
  slideWidthClassName = DEFAULT_SLIDE_WIDTH_CLASSNAME,
  showDots = true,
  desktopGridClassName = DEFAULT_DESKTOP_GRID_CLASSNAME,
}: MobileCardSliderProps) {
  const slides = Children.toArray(children);
  const sliderId = useId();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updatePreference);

      return () => mediaQuery.removeEventListener('change', updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  useEffect(() => {
    const trackNode = trackRef.current;

    if (!trackNode || slides.length === 0 || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)[0];

        if (!mostVisibleEntry) {
          return;
        }

        const nextIndex = Number(mostVisibleEntry.target.getAttribute('data-slide-index'));

        if (Number.isInteger(nextIndex)) {
          setActiveIndex(nextIndex);
        }
      },
      {
        root: trackNode,
        threshold: [0.6, 0.75, 0.9],
      },
    );

    slideRefs.current.forEach((slideNode) => {
      if (slideNode) {
        observer.observe(slideNode);
      }
    });

    return () => observer.disconnect();
  }, [slides.length]);

  const scrollToSlide = (index: number) => {
    const slideNode = slideRefs.current[index];

    if (!slideNode) {
      return;
    }

    slideNode.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  };

  return (
    <div
      className={`mobile-card-slider ${className}`.trim()}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div
        ref={trackRef}
        className={`mobile-card-slider__track flex gap-4 overflow-x-auto pb-3 pr-4 snap-x snap-mandatory md:overflow-visible md:pb-0 md:pr-0 ${desktopGridClassName} ${trackClassName}`.trim()}
        style={{
          scrollBehavior: prefersReducedMotion ? 'auto' : 'smooth',
          touchAction: 'pan-x',
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={`${sliderId}-slide-${index}`}
            id={`${sliderId}-slide-${index}`}
            ref={(node) => {
              slideRefs.current[index] = node;
            }}
            data-slide-index={index}
            className={`${slideWidthClassName} mobile-card-slider__slide shrink-0 snap-start md:w-auto ${slideClassName}`.trim()}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
          >
            {slide}
          </div>
        ))}
      </div>

      {showDots && slides.length > 1 ? (
        <div className="mt-1 flex items-center justify-center gap-2 md:hidden" role="group" aria-label="Choose slide">
          {slides.map((_, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={`${sliderId}-dot-${index}`}
                type="button"
                className={`mobile-card-slider__dot${isActive ? ' is-active' : ''}`}
                aria-controls={`${sliderId}-slide-${index}`}
                aria-current={isActive ? 'true' : undefined}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => scrollToSlide(index)}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

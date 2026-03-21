export default function HorizontalScroller({ children, className = '', gap = 'gap-3' }) {
  return (
    <>
      <style>{`
        .hs-container::-webkit-scrollbar { display: none; }
        .hs-container { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <div className={`hs-container flex overflow-x-auto ${gap} ${className}`.trim()}>
        {children}
      </div>
    </>
  );
}

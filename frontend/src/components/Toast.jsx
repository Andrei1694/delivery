export default function Toast({ visible, fading, children }) {
  if (!visible) return null;

  return (
    <div
      className="fixed bottom-28 left-0 z-40 flex w-full justify-center px-6 transition-opacity duration-300"
      style={{ opacity: fading ? 0 : 1 }}
    >
      <div className="toast-enter w-full max-w-md">
        {children}
      </div>
    </div>
  );
}

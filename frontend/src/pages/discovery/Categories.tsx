import { Link } from '@tanstack/react-router';
import SymbolIcon from '../../components/SymbolIcon';
import { getAllCategories } from '../../mocks';

export default function Categories() {
  const categories = getAllCategories();

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">
      <header className="sticky top-0 w-full z-50 bg-surface/70 backdrop-blur-xl border-b border-surface-container">
        <div className="px-4 py-3 w-full max-w-lg mx-auto flex items-center gap-3">
          <Link to="/" className="p-2 -ml-2 text-on-surface active:scale-95 transition-transform" aria-label="Go back">
            <SymbolIcon name="arrow_back" />
          </Link>
          <h1 className="font-headline font-bold text-lg">All Categories</h1>
        </div>
      </header>
      <main className="p-4 max-w-lg mx-auto pb-8">
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category, idx) => (
            <Link
              key={category.id}
              to="/search"
              aria-label={`Explore ${category.name} category`}
              className="group flex flex-col items-center gap-3 bg-surface-container-lowest p-4 py-8 rounded-3xl active:scale-95 transition-all shadow-sm active:bg-surface-container-low duration-200"
              style={{ animation: `fadeIn 400ms ease-out ${idx * 40}ms both` }}
            >
              <div
                className={`w-20 h-20 ${category.bgClassName} rounded-2xl flex items-center justify-center overflow-hidden group-active:scale-95 transition-transform duration-300`}
              >
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-14 h-14 object-contain"
                  />
                ) : (
                  <SymbolIcon name={category.icon ?? 'restaurant'} className="text-3xl text-on-surface-variant" />
                )}
              </div>
              <span className="font-bold text-sm text-center text-on-surface tracking-tight">{category.name}</span>
            </Link>
          ))}
        </div>
      </main>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

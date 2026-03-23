import { useState, useEffect, useRef, type KeyboardEvent, type MouseEvent } from 'react';
import { useNavigate } from '@tanstack/react-router';
import SymbolIcon from './SymbolIcon';
import { restaurants } from '../mocks/discovery';

const RECENT_SEARCHES = ['Artisan Italian Pizza', 'Burger', 'Sushi'];

type SearchSuggestion =
  | { type: 'restaurant'; label: string; id: string; meta: string }
  | { type: 'recent' | 'query'; label: string; id?: never; meta?: never };

export default function SearchInput() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  // Debounce logic to wait 300ms before triggering search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsLoading(false);
      setActiveIndex(-1); // Reset keyboard focus
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Click away listener to close the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | globalThis.MouseEvent) {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Compute suggestions
  const isSearchActive = debouncedQuery.trim().length > 0;
  let suggestions: SearchSuggestion[] = [];

  if (isSearchActive && !isLoading) {
    const term = debouncedQuery.toLowerCase();
    suggestions = restaurants
      .filter(
        (r) =>
          r.name.toLowerCase().includes(term) ||
          r.cuisine.toLowerCase().includes(term)
      )
      .slice(0, 5) // Limit to 5 suggestions
      .map((r) => ({ type: 'restaurant', label: r.name, id: r.id, meta: r.cuisine }));
  } else if (!isSearchActive && !isLoading) {
    suggestions = RECENT_SEARCHES.map((s) => ({
      type: 'recent',
      label: s,
    }));
  }

  // Keyboard Navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
      e.preventDefault();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        handleSelectSuggestion(suggestions[activeIndex]);
      } else if (query.trim()) {
        // If Enter pressed with no active index, submit as text search
        handleSelectSuggestion({ type: 'query', label: query.trim() });
      }
    }
  };

  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    setIsOpen(false);
    if (suggestion.type === 'restaurant') {
      navigate({ to: '/restaurant-menu/$restaurantId', params: { restaurantId: suggestion.id } });
    } else {
      navigate({ to: '/search' });
    }
    inputRef.current?.blur();
  };

  const handleFocus = () => {
    setIsOpen(true);
    setActiveIndex(-1);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-on-surface-variant">
        <SymbolIcon name="search" className="text-[20px]" />
      </div>
      <input
        type="text"
        ref={inputRef}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
          setIsLoading(e.target.value.trim() !== '');
        }}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder="Search restaurants, dishes..."
        className="w-full bg-surface-container-lowest border-none rounded-xl py-2.5 pl-11 pr-10 shadow-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/50 text-sm font-medium focus:outline-none"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        aria-controls="search-suggestions"
        role="combobox"
      />
      
      {/* Clear/Cancel Icon */}
      {query && (
        <button
          className="absolute inset-y-0 right-3 flex justify-center items-center w-8 h-full rounded-full text-on-surface-variant hover:text-on-surface focus:outline-none"
          onClick={() => {
            setQuery('');
            setIsLoading(false);
            inputRef.current?.focus();
          }}
          aria-label="Clear search"
          type="button"
        >
          <SymbolIcon name="close" className="text-[18px]" />
        </button>
      )}

      {/* Suggestions Dropdown */}
      {isOpen && (
        <div
          id="search-suggestions"
          role="listbox"
          className="absolute top-full mt-2 left-0 right-0 bg-surface/90 backdrop-blur-xl border border-surface-container rounded-2xl shadow-lg overflow-hidden z-[100]"
        >
          {isLoading ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="w-6 h-6 rounded-full bg-surface-container-high" />
                  <div className="h-4 w-3/4 rounded bg-surface-container-high" />
                </div>
              ))}
            </div>
          ) : suggestions.length > 0 ? (
            <div className="py-2 max-h-80 overflow-y-auto">
              {!isSearchActive && (
                <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Recent Searches
                </div>
              )}
              {suggestions.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={`${item.type}-${item.id || item.label}`}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => handleSelectSuggestion(item)}
                    className={`w-full text-left flex items-center min-h-[44px] px-4 py-3 gap-3 transition-colors active:bg-surface-container-high
                      ${isActive ? 'bg-surface-container-low/80' : 'hover:bg-surface-container-lowest'}
                    `}
                  >
                    <SymbolIcon
                      name={item.type === 'recent' ? 'history' : 'restaurant'}
                      className="text-[20px] text-on-surface-variant"
                    />
                    <div className="flex-1 flex flex-col justify-center">
                      <span className="text-sm font-medium text-on-surface leading-tight">
                        {item.label}
                      </span>
                      {item.meta && (
                        <span className="text-xs text-on-surface-variant mt-0.5 leading-tight">
                          {item.meta}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
             <div className="p-8 flex flex-col items-center justify-center text-center">
                <SymbolIcon name="search_off" className="text-4xl text-on-surface-variant/50 mb-3" />
                <p className="text-sm font-medium text-on-surface">No results found for "{query}"</p>
                <p className="text-xs text-on-surface-variant mt-1">Try checking for typos or searching another term</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
}

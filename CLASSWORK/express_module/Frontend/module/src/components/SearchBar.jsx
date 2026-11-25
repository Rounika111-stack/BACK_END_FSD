import React, { useRef, useEffect } from 'react';
import { SearchIcon, ClearIcon, SparklesIcon } from './Icons';

const SUGGESTIONS = [
  { label: 'report', query: 'report' },
  { label: 'certificate', query: 'certificate' },
  { label: 'assignment', query: 'assignment' },
  { label: 'project', query: 'project' },
  { label: 'notes', query: 'notes' },
  { label: '.pdf', query: '.pdf' }
];

export function SearchBar({ query, setQuery, onSearch, isLoading }) {
  const inputRef = useRef(null);

  // Keyboard shortcut: '/' or 'Ctrl+K' focuses the search input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === '/' && document.activeElement !== inputRef.current) ||
          ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className="search-section">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <SearchIcon size={22} className="search-icon-adornment" />
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Search files by exact name, partial name, keyword, or extension (e.g., report, .pdf)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck="false"
          />
          {query && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={handleClear}
              title="Clear search query"
            >
              <ClearIcon size={16} />
            </button>
          )}
          <div className="search-shortcut-badge" title="Press '/' or 'Ctrl+K' to search">
            <kbd>/</kbd>
          </div>
          <button
            type="submit"
            className={`search-submit-btn ${isLoading ? 'btn-loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              <span>Search</span>
            )}
          </button>
        </div>
      </form>

      {/* Quick Search Suggestions */}
      <div className="quick-suggestions">
        <span className="suggestions-label">
          <SparklesIcon size={14} /> Quick Queries:
        </span>
        <div className="chips-container">
          {SUGGESTIONS.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`chip-btn ${query.toLowerCase() === item.query.toLowerCase() ? 'chip-active' : ''}`}
              onClick={() => {
                setQuery(item.query);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

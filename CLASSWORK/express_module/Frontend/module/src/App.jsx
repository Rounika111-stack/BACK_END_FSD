import React, { useState, useEffect, useRef } from 'react';
import { searchFilesApi } from './api/fileApi';
import './App.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [hasError, setHasError] = useState(false);

  const debounceTimerRef = useRef(null);

  // Search function calling the backend
  const performSearch = async (searchTerm) => {
    const trimmed = searchTerm.trim();
    if (!trimmed) {
      setResults([]);
      setHasSearched(false);
      setIsLoading(false);
      setHasError(false);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    try {
      const data = await searchFilesApi({ q: trimmed });
      setResults(data.results || []);
      setHasSearched(true);
    } catch (err) {
      console.error('Search request failed:', err);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Browse all files (optional helper if query is empty)
  const handleBrowseAll = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const data = await searchFilesApi({ q: '' });
      setResults(data.results || []);
      setHasSearched(true);
    } catch (err) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger search on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    performSearch(query);
  };

  // Smooth search as you type
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (query.trim()) {
      debounceTimerRef.current = setTimeout(() => {
        performSearch(query);
      }, 250);
    } else {
      setResults([]);
      setHasSearched(false);
    }

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [query]);

  // Handle file download
  const handleDownload = (file) => {
    const link = document.createElement('a');
    link.href = file.downloadUrl;
    link.setAttribute('download', file.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1 className="title">File Search</h1>
        <p className="subtitle">Find files quickly.</p>
      </header>

      {/* Search Bar */}
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Search files..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button
              type="button"
              className="clear-btn"
              onClick={() => {
                setQuery('');
                setHasSearched(false);
                setResults([]);
              }}
              title="Clear search"
            >
              ✕
            </button>
          )}
          <button type="submit" className="search-btn" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Main Content / Results Area */}
      <main className="results-container">
        {isLoading && results.length === 0 ? (
          <p className="status-message">Searching...</p>
        ) : hasError ? (
          <p className="status-message error-message">
            Something went wrong. Please try again.
          </p>
        ) : !hasSearched && query.trim() === '' ? (
          <div className="empty-state">
            <p className="status-message">Search for a file to get started.</p>
            <button
              type="button"
              className="browse-all-link"
              onClick={handleBrowseAll}
            >
              or view all files
            </button>
          </div>
        ) : results.length === 0 ? (
          <div className="empty-state">
            <p className="status-message">No files found.</p>
            <p className="status-sub">Try a different search.</p>
          </div>
        ) : (
          <div className="results-list-wrapper">
            <h2 className="results-heading">Search results</h2>
            <div className="results-list">
              {results.map((file) => {
                const extUpper = file.extension ? file.extension.toUpperCase() : 'FILE';
                return (
                  <div className="result-item" key={file.relativePath}>
                    <div className="result-info">
                      <div className="result-name-row">
                        <span className="file-icon" aria-hidden="true">📄</span>
                        <span className="file-name">{file.name}</span>
                      </div>
                      <div className="file-path">{file.relativePath}</div>
                      <div className="file-meta">
                        {extUpper} · {file.formattedSize}
                      </div>
                    </div>

                    <div className="result-actions">
                      <a
                        href={file.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-action btn-open"
                      >
                        Open
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDownload(file)}
                        className="btn-action btn-download"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

import React from 'react';
import { GridViewIcon, ListViewIcon, FilterIcon, RefreshIcon } from './Icons';

const CATEGORIES = [
  { id: 'all', label: 'All Files' },
  { id: 'document', label: 'Documents' },
  { id: 'certificate', label: 'Certificates' },
  { id: 'image', label: 'Images' },
  { id: 'code', label: 'Code' },
  { id: 'other', label: 'Other' }
];

export function FilterBar({
  category,
  setCategory,
  folder,
  setFolder,
  extension,
  setExtension,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  availableFolders = [],
  availableExtensions = {},
  categoryCounts = {},
  onResetFilters
}) {
  const hasActiveFilters = category !== 'all' || folder !== 'all' || extension !== 'all' || sortBy !== 'relevance';

  return (
    <div className="filter-bar">
      {/* Category Pills */}
      <div className="category-scroll-wrapper">
        <div className="category-pills">
          {CATEGORIES.map((cat) => {
            const count = cat.id === 'all' 
              ? Object.values(categoryCounts).reduce((a, b) => a + b, 0)
              : (categoryCounts[cat.id] || 0);

            return (
              <button
                key={cat.id}
                type="button"
                className={`category-pill ${category === cat.id ? 'pill-active' : ''}`}
                onClick={() => setCategory(cat.id)}
              >
                <span className="pill-text">{cat.label}</span>
                {count > 0 && <span className="pill-count">{count}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dropdown Filters & Controls */}
      <div className="filter-controls-row">
        <div className="filter-dropdowns">
          {/* Folder Filter */}
          <div className="select-wrapper">
            <label htmlFor="folder-select" className="select-label">Folder:</label>
            <select
              id="folder-select"
              className="custom-select"
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
            >
              <option value="all">All Folders</option>
              {availableFolders.map((f) => (
                <option key={f} value={f}>
                  📁 {f}
                </option>
              ))}
            </select>
          </div>

          {/* Extension Filter */}
          <div className="select-wrapper">
            <label htmlFor="ext-select" className="select-label">Extension:</label>
            <select
              id="ext-select"
              className="custom-select"
              value={extension}
              onChange={(e) => setExtension(e.target.value)}
            >
              <option value="all">All Extensions</option>
              {Object.keys(availableExtensions).sort().map((ext) => (
                <option key={ext} value={ext}>
                  .{ext} ({availableExtensions[ext]})
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Filter */}
          <div className="select-wrapper">
            <label htmlFor="sort-select" className="select-label">Sort:</label>
            <select
              id="sort-select"
              className="custom-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="relevance">Relevance</option>
              <option value="name_asc">Name (A → Z)</option>
              <option value="name_desc">Name (Z → A)</option>
              <option value="size_desc">Size (Largest first)</option>
              <option value="size_asc">Size (Smallest first)</option>
              <option value="date_desc">Date (Newest first)</option>
              <option value="date_asc">Date (Oldest first)</option>
            </select>
          </div>

          {/* Reset button if filters active */}
          {hasActiveFilters && (
            <button
              type="button"
              className="reset-filters-btn"
              onClick={onResetFilters}
              title="Reset all filters to default"
            >
              <RefreshIcon size={14} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* View Toggle */}
        <div className="view-mode-toggle">
          <button
            type="button"
            className={`view-btn ${viewMode === 'grid' ? 'view-btn-active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
            aria-label="Grid View"
          >
            <GridViewIcon size={18} />
          </button>
          <button
            type="button"
            className={`view-btn ${viewMode === 'list' ? 'view-btn-active' : ''}`}
            onClick={() => setViewMode('list')}
            title="List / Table View"
            aria-label="List View"
          >
            <ListViewIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

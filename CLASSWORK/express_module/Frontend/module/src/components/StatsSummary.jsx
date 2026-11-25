import React from 'react';
import { ClearIcon } from './Icons';

export function StatsSummary({
  resultsCount,
  totalFiles,
  totalFormattedSize,
  query,
  onClearQuery
}) {
  return (
    <div className="stats-summary-bar">
      <div className="stats-summary-left">
        <span className="results-badge">
          <strong>{resultsCount}</strong> {resultsCount === 1 ? 'file' : 'files'} found
        </span>

        {query && (
          <div className="active-query-pill">
            <span>Matching: "<strong>{query}</strong>"</span>
            <button
              type="button"
              className="query-pill-clear"
              onClick={onClearQuery}
              title="Clear search filter"
            >
              <ClearIcon size={12} />
            </button>
          </div>
        )}
      </div>

      <div className="stats-summary-right">
        <span className="meta-stat-item">
          Total in Storage: <strong>{totalFiles || 0} files</strong>
        </span>
        <span className="meta-stat-divider">•</span>
        <span className="meta-stat-item">
          Size: <strong>{totalFormattedSize || '0 Bytes'}</strong>
        </span>
      </div>
    </div>
  );
}

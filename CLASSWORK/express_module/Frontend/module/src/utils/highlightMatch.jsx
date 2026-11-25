import React from 'react';

/**
 * Highlights matches of query keywords within a given string
 */
export function highlightMatch(text, query) {
  if (!query || !query.trim() || !text) {
    return text;
  }

  const trimmed = query.trim();
  // Split query into keywords (space, underscore, hyphen)
  const tokens = trimmed
    .split(/[\s\-_]+/)
    .filter(Boolean)
    .map(token => token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  if (tokens.length === 0) return text;

  // Build regex matching any token
  const regex = new RegExp(`(${tokens.join('|')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (regex.test(part)) {
      return (
        <mark key={index} className="search-highlight">
          {part}
        </mark>
      );
    }
    return part;
  });
}

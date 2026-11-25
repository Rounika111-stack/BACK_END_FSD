import React, { useState } from 'react';
import { FileTypeIcon, DownloadIcon, EyeIcon, CopyIcon, CheckIcon, FolderIcon } from './Icons';
import { highlightMatch } from '../utils/highlightMatch';

export function FileTableRow({ file, query, onPreview, onDownload, onCopyPath }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    onCopyPath(file.relativePath);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedDate = file.modifiedAt
    ? new Date(file.modifiedAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : 'Unknown date';

  return (
    <tr className="file-table-row" onClick={() => onPreview(file)}>
      <td className="cell-filename">
        <div className="file-row-name-wrapper">
          <div className={`file-row-icon file-icon-${file.category || 'other'}`}>
            <FileTypeIcon ext={file.extension} category={file.category} size={20} />
          </div>
          <div className="file-row-text">
            <span className="file-row-name" title={file.name}>
              {highlightMatch(file.name, query)}
            </span>
            <span className="file-row-subpath">{file.relativePath}</span>
          </div>
        </div>
      </td>

      <td className="cell-folder">
        <span className="folder-pill">
          <FolderIcon size={13} />
          <span>{file.folder}</span>
        </span>
      </td>

      <td className="cell-ext">
        <span className={`category-tag tag-${file.category || 'other'}`}>
          {file.extension ? `.${file.extension.toUpperCase()}` : 'FILE'}
        </span>
      </td>

      <td className="cell-size">
        <span className="file-size-text">{file.formattedSize}</span>
      </td>

      <td className="cell-date">
        <span className="file-date-text">{formattedDate}</span>
      </td>

      <td className="cell-actions" onClick={(e) => e.stopPropagation()}>
        <div className="table-actions-wrapper">
          <button
            type="button"
            className="row-action-btn"
            onClick={() => onPreview(file)}
            title="Preview file"
          >
            <EyeIcon size={15} />
          </button>
          <button
            type="button"
            className="row-action-btn"
            onClick={() => onDownload(file)}
            title="Download file"
          >
            <DownloadIcon size={15} />
          </button>
          <button
            type="button"
            className={`row-action-btn ${copied ? 'btn-copied' : ''}`}
            onClick={handleCopy}
            title="Copy path"
          >
            {copied ? <CheckIcon size={15} /> : <CopyIcon size={15} />}
          </button>
        </div>
      </td>
    </tr>
  );
}

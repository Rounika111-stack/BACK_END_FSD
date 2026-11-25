import React, { useState } from 'react';
import { FileTypeIcon, DownloadIcon, EyeIcon, CopyIcon, CheckIcon, FolderIcon } from './Icons';
import { highlightMatch } from '../utils/highlightMatch';

export function FileCard({ file, query, onPreview, onDownload, onCopyPath }) {
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
    <div className="file-card" onClick={() => onPreview(file)}>
      <div className="file-card-header">
        <div className={`file-icon-box file-icon-${file.category || 'other'}`}>
          <FileTypeIcon ext={file.extension} category={file.category} size={28} />
        </div>
        <div className="file-meta-badges">
          <span className={`category-tag tag-${file.category || 'other'}`}>
            {file.extension ? `.${file.extension.toUpperCase()}` : 'FILE'}
          </span>
        </div>
      </div>

      <div className="file-card-body">
        <h4 className="file-name" title={file.name}>
          {highlightMatch(file.name, query)}
        </h4>

        <div className="file-folder-info" title={`Folder: ${file.folder}`}>
          <FolderIcon size={14} className="folder-icon" />
          <span className="folder-text">{highlightMatch(file.folder, query)}</span>
        </div>

        <div className="file-details-row">
          <span className="file-size-badge">{file.formattedSize}</span>
          <span className="file-date">{formattedDate}</span>
        </div>
      </div>

      <div className="file-card-footer" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="btn-card-action btn-preview"
          onClick={() => onPreview(file)}
          title="Preview file content"
        >
          <EyeIcon size={15} />
          <span>Preview</span>
        </button>

        <button
          type="button"
          className="btn-card-action btn-download"
          onClick={() => onDownload(file)}
          title="Download file to computer"
        >
          <DownloadIcon size={15} />
          <span>Download</span>
        </button>

        <button
          type="button"
          className={`btn-card-action btn-copy ${copied ? 'btn-copied' : ''}`}
          onClick={handleCopy}
          title="Copy file path"
        >
          {copied ? <CheckIcon size={15} /> : <CopyIcon size={15} />}
        </button>
      </div>
    </div>
  );
}

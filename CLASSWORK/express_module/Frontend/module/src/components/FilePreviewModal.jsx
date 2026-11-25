import React, { useState, useEffect } from 'react';
import {
  FileTypeIcon,
  CloseIcon,
  DownloadIcon,
  CopyIcon,
  CheckIcon,
  FolderIcon
} from './Icons';

export function FilePreviewModal({ file, onClose, onDownload, onCopyPath }) {
  const [copied, setCopied] = useState(false);
  const [textContent, setTextContent] = useState(null);
  const [loadingText, setLoadingText] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // If file is text or code, fetch text preview
  useEffect(() => {
    if (!file) return;

    const isTextLike = ['txt', 'md', 'json', 'js', 'jsx', 'html', 'css', 'sql', 'docx'].includes(file.extension);
    if (isTextLike) {
      setLoadingText(true);
      fetch(file.previewUrl)
        .then((res) => res.text())
        .then((data) => {
          setTextContent(data);
          setLoadingText(false);
        })
        .catch(() => {
          setTextContent('Could not load text preview directly.');
          setLoadingText(false);
        });
    } else {
      setTextContent(null);
    }
  }, [file]);

  if (!file) return null;

  const handleCopy = () => {
    onCopyPath(file.relativePath);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isImage = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(file.extension);
  const isPdf = file.extension === 'pdf';
  const isText = ['txt', 'md', 'json', 'js', 'jsx', 'html', 'css', 'sql'].includes(file.extension);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <div className={`modal-icon-badge file-icon-${file.category || 'other'}`}>
              <FileTypeIcon ext={file.extension} category={file.category} size={24} />
            </div>
            <div className="modal-title-group">
              <h3 className="modal-filename">{file.name}</h3>
              <div className="modal-file-tags">
                <span className="modal-folder-tag">
                  <FolderIcon size={12} /> {file.folder}
                </span>
                <span className="modal-tag-divider">•</span>
                <span className="modal-size-tag">{file.formattedSize}</span>
                <span className="modal-tag-divider">•</span>
                <span className={`category-tag tag-${file.category || 'other'}`}>
                  .{file.extension?.toUpperCase() || 'FILE'}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            title="Close modal (Esc)"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Modal Content Preview */}
        <div className="modal-body">
          {isImage ? (
            <div className="preview-image-container">
              <img
                src={file.previewUrl}
                alt={file.name}
                className="preview-img"
              />
            </div>
          ) : isPdf ? (
            <div className="preview-pdf-container">
              <iframe
                src={file.previewUrl}
                title={file.name}
                className="preview-pdf-frame"
              />
            </div>
          ) : isText ? (
            <div className="preview-code-container">
              {loadingText ? (
                <div className="preview-loading">
                  <span className="spinner"></span>
                  <span>Loading file text...</span>
                </div>
              ) : (
                <pre className="preview-code-block">
                  <code>{textContent}</code>
                </pre>
              )}
            </div>
          ) : (
            <div className="preview-generic-container">
              <div className={`preview-generic-icon file-icon-${file.category || 'other'}`}>
                <FileTypeIcon ext={file.extension} category={file.category} size={64} />
              </div>
              <h4>{file.name}</h4>
              <p className="preview-generic-sub">
                This binary file type (.{file.extension}) can be downloaded or inspected in an external application.
              </p>
              <div className="generic-meta-grid">
                <div className="generic-meta-item">
                  <span className="meta-lbl">Relative Path:</span>
                  <code>{file.relativePath}</code>
                </div>
                <div className="generic-meta-item">
                  <span className="meta-lbl">MIME Type:</span>
                  <span>{file.mimeType}</span>
                </div>
                <div className="generic-meta-item">
                  <span className="meta-lbl">Exact Size:</span>
                  <span>{file.size?.toLocaleString()} bytes</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="modal-footer">
          <div className="modal-footer-left">
            <button
              type="button"
              className={`modal-btn modal-btn-secondary ${copied ? 'btn-copied' : ''}`}
              onClick={handleCopy}
            >
              {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
              <span>{copied ? 'Path Copied!' : 'Copy Path'}</span>
            </button>

            <a
              href={file.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-btn modal-btn-secondary"
            >
              <span>Open in New Tab ↗</span>
            </a>
          </div>

          <div className="modal-footer-right">
            <button
              type="button"
              className="modal-btn modal-btn-primary"
              onClick={() => onDownload(file)}
            >
              <DownloadIcon size={16} />
              <span>Download File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

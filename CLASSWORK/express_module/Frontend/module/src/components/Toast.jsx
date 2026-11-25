import React from 'react';
import { CheckIcon, CloseIcon } from './Icons';

export function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className={`toast-container toast-${toast.type || 'info'}`}>
      <div className="toast-icon">
        <CheckIcon size={16} />
      </div>
      <div className="toast-message">{toast.message}</div>
      <button
        type="button"
        className="toast-close-btn"
        onClick={onClose}
        aria-label="Dismiss toast"
      >
        <CloseIcon size={14} />
      </button>
    </div>
  );
}

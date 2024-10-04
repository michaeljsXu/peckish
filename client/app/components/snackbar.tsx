// Snackbar.tsx
import React, { useEffect } from 'react';

interface SnackbarProps {
  message: string;
  visible: boolean;
  autoDismissDuration?: number; // otherwise provide time
  onDismiss?: () => void; // provide btn to dismiss snackbar
}

const Snackbar: React.FC<SnackbarProps> = ({
  message,
  visible,
  autoDismissDuration = 3000,
  onDismiss,
}) => {
  useEffect(() => {
    if (visible && !onDismiss) {
      const timer = setTimeout(() => {
        // This can be replaced with a state management solution
        // Or a callback to the parent component to set visibility
      }, autoDismissDuration);

      return () => clearTimeout(timer);
    }
  }, [visible, onDismiss, autoDismissDuration]);

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-4 rounded shadow-lg transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <span>{message}</span>
      {onDismiss && (
        <button className="ml-4 text-yellow-400 hover:text-yellow-300" onClick={onDismiss}>
          Dismiss
        </button>
      )}
    </div>
  );
};

export default Snackbar;

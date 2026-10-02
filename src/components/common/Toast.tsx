import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none select-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success' || !toast.type;
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border animate-in slide-in-from-bottom-5 duration-300 ${
              isError
                ? 'bg-[#2A120D] text-white border-red-800'
                : isWarning
                ? 'bg-[#3A220F] text-amber-100 border-amber-800'
                : 'bg-[#1B0E0A] text-[#F8EEE5] border-[#3A1C16]'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isError ? (
                <AlertCircle className="w-5 h-5 text-red-400" />
              ) : isWarning ? (
                <AlertCircle className="w-5 h-5 text-amber-400" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-[#C96852]" />
              )}
            </div>

            <div className="flex-1 text-xs">
              <h5 className="font-semibold text-sm text-[#F8EEE5]">
                {toast.title}
              </h5>
              {toast.message && (
                <p className="text-[#E8D8C8]/80 mt-0.5 leading-snug">
                  {toast.message}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#E8D8C8]/50 hover:text-white p-0.5 transition-colors cursor-pointer"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

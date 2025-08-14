import React from "react";

export default function ResourceCard({ title, subtitle, extra, actions }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-3">
      <h3 className="text-lg font-semibold">{title}</h3>

      {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}

      {extra && <p className="text-gray-500 text-xs mt-1 italic">{extra}</p>}

      {actions && actions.length > 0 && (
        <div className="flex gap-2 mt-3">
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={action.onClick}
              className={`px-3 py-1 rounded text-sm ${action.className}`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export type ViewMode = "grid" | "list";

interface ViewToggleProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewToggle({ viewMode, onChange }: ViewToggleProps) {
  return (
    <div className="flex bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => onChange("grid")}
        title="Vista de mosaico"
        className={`px-3 py-2 transition-colors ${
          viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-700"
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 5h6v6H4V5zm10 0h6v6h-6V5zM4 15h6v6H4v-6zm10 0h6v6h-6v-6z"
          />
        </svg>
      </button>
      <button
        onClick={() => onChange("list")}
        title="Vista de lista"
        className={`px-3 py-2 transition-colors ${
          viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-700"
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
}
// src/components/VariantSelector.tsx
type Props = {
  label: string;
  options: string[];
  selected: string | null;
  onChange: (value: string) => void;
};

const VariantSelector = ({ label, options, selected, onChange }: Props) => (
  <div>
    <h2 className="text-lg font-medium mb-2">{label}</h2>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-4 py-2 rounded border ${
            selected === opt
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-black border-gray-400"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

export default VariantSelector;

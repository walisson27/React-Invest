// src/pages/components/VariantSelector.tsx
type Props = {
  label: string;
  options: string[];
  selected: string | null;
  onChange: (value: string) => void;
};

const VariantSelector = ({ label, options, selected, onChange }: Props) => {
  return (
    <div>
      <h2 className="font-semibold mb-2">{label}:</h2>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`px-4 py-2 border rounded-md transition duration-200 ${
              selected === option
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VariantSelector;

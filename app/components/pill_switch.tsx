const PillSwitch = <A extends string>({
  options,
  value,
  setValue,
}: {
  options:
    | {
        label: string;
        value: A;
      }[]
    | A[];
  value: A;
  setValue: (newValue: A) => void;
}) => (
  <div className="w-full flex bg-black text-white">
    {options.map((option) => {
      const optionLabel = typeof option === "string" ? option : option.label;
      const optionValue = typeof option === "string" ? option : option.value;
      return (
        <button
          key={optionValue}
          type="button"
          onClick={() => setValue(optionValue)}
          role="tab"
          className={`flex-1 btn ${
            value === optionValue ? "btn-primary" : ""
          }`.trim()}
        >
          {optionLabel}
        </button>
      );
    })}
  </div>
);

export default PillSwitch;

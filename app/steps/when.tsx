import { useMemo, useState } from "react";
import { format } from "date-fns";

const WhenStep = ({ onPress }: { onPress: (when: string) => void }) => {
  const [value, setValue] = useState(() => format(new Date(), "yyyy-MM-dd"));

  const max = useMemo(() => format(new Date(), "yyyy-MM-dd"), []);

  return (
    <>
      <h1 className="text-3xl font-bold">When is this for?</h1>
      <input
        type="date"
        className="input input-primary text-white"
        value={value}
        onChange={(v) => setValue(v.target.value)}
        min="2024-08-22"
        max={max}
      />
      <button
        type="button"
        onClick={() => onPress(value)}
        className="btn btn-primary w-48"
      >
        Confirm
      </button>
    </>
  );
};

export default WhenStep;

import { useState } from "react";

const StepsStep = ({
  onPress,
}: {
  onPress: (steps: number) => Promise<void>;
}) => {
  const [stepsText, setStepsText] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <h1 className="text-3xl font-bold">How many steps?</h1>
      <input
        className="input input-bordered input-primary text-center"
        value={stepsText}
        onChange={(v) => setStepsText(v.target.value)}
        type="number"
      />
      <button
        type="button"
        onClick={() => {
          setLoading(true);
          onPress(Number(stepsText)).finally(() => setLoading(false));
        }}
        disabled={!(Number(stepsText) > 0) || loading}
        className="btn btn-primary w-48"
      >
        Confirm
      </button>
    </>
  );
};

export default StepsStep;

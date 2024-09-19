import { useState } from "react";

const StepsStep = ({ onPress }: { onPress: (steps: number) => void }) => {
  const [stepsText, setStepsText] = useState("");

  return (
    <>
      <h1 className="text-3xl font-bold">How many steps?</h1>
      <input
        className="input input-bordered input-primary text-black text-center"
        value={stepsText}
        onChange={(v) => setStepsText(v.target.value)}
        type="number"
      />
      <button
        onClick={() => {
          onPress(Number(stepsText));
        }}
        disabled={!(Number(stepsText) > 0)}
        className="btn btn-primary w-48"
      >
        Confirm
      </button>
    </>
  );
};

export default StepsStep;

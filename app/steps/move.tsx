const MoveStep = ({ onPress }: { onPress: (points: number) => void }) => (
  <>
    <h1 className="text-3xl font-bold">
      Make your <span className="text-red-500">move</span> goal?
    </h1>
    <button
      type="button"
      onClick={() => onPress(0)}
      className="btn btn-primary w-48"
    >
      No
    </button>
    <button
      type="button"
      onClick={() => onPress(1)}
      className="btn btn-primary w-48"
    >
      Yes
    </button>
    <button
      type="button"
      onClick={() => onPress(3)}
      className="btn btn-primary w-48"
    >
      Doubled It
    </button>
  </>
);

export default MoveStep;

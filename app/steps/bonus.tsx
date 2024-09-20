const BonusStep = ({ onPress }: { onPress: (points: number) => void }) => (
  <>
    <h1 className="text-3xl font-bold">Do the bonus?</h1>
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
  </>
);

export default BonusStep;

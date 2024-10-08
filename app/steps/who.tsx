export type Person = "Alex" | "Darby" | "Mom" | "Dad" | "Jon" | "Keely";

const WhoStep = ({ onPress }: { onPress: (person: Person) => void }) => (
  <>
    <h1 className="text-3xl font-bold">Who is using this form?</h1>
    <button
      type="button"
      onClick={() => onPress("Alex")}
      className="btn btn-primary w-48"
    >
      Alex
    </button>
    <button
      type="button"
      onClick={() => onPress("Darby")}
      className="btn btn-primary w-48"
    >
      Darby
    </button>
    <button
      type="button"
      onClick={() => onPress("Mom")}
      className="btn btn-primary w-48"
    >
      Mom
    </button>
    <button
      type="button"
      onClick={() => onPress("Dad")}
      className="btn btn-primary w-48"
    >
      Dad
    </button>
    <button
      type="button"
      onClick={() => onPress("Jon")}
      className="btn btn-primary w-48"
    >
      Jon
    </button>
    <button
      type="button"
      onClick={() => onPress("Keely")}
      className="btn btn-primary w-48"
    >
      Keely
    </button>
  </>
);

export default WhoStep;

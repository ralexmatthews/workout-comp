export type Steps =
  | "who"
  | "when"
  | "move"
  | "stand"
  | "exercise"
  | "bonus"
  | "steps";

const stepsInOrder: Steps[] = [
  "who",
  "when",
  "move",
  "stand",
  "exercise",
  "bonus",
  "steps",
];

const isActive = (activeStep: Steps, index: number) =>
  stepsInOrder.indexOf(activeStep) >= index;

const Stepper = ({ step }: { step: Steps }) => (
  <div className="overflow-x-auto w-full px-4">
    <ul className="steps">
      <li className={`step ${isActive(step, 0) ? "step-primary" : ""}`.trim()}>
        Who
      </li>
      <li className={`step ${isActive(step, 1) ? "step-primary" : ""}`.trim()}>
        When
      </li>
      <li className={`step ${isActive(step, 2) ? "step-primary" : ""}`.trim()}>
        Move
      </li>
      <li className={`step ${isActive(step, 3) ? "step-primary" : ""}`.trim()}>
        Stand
      </li>
      <li className={`step ${isActive(step, 4) ? "step-primary" : ""}`.trim()}>
        Exercise
      </li>
      <li className={`step ${isActive(step, 5) ? "step-primary" : ""}`.trim()}>
        Bonus
      </li>
      <li className={`step ${isActive(step, 6) ? "step-primary" : ""}`.trim()}>
        Steps
      </li>
    </ul>
  </div>
);

export default Stepper;

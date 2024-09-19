import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import MoveStep from "~/steps/move";
import ExerciseStep from "~/steps/exercise";
import StandStep from "~/steps/stand";
import Stepper, { Steps } from "~/steps/stepper";
import WhoStep, { Person } from "~/steps/who";
import StepsStep from "~/steps/steps";
import BonusStep from "~/steps/bonus";
import WhenStep from "~/steps/when";

export const meta: MetaFunction = () => {
  return [
    { title: "Matthews Family Workout Tracker" },
    {
      name: "description",
      content: "An easier way to automate inputting workout data",
    },
  ];
};

export default function Index() {
  const [step, setStep] = useState<Steps>("who");
  const [date, setDate] = useState("");
  const [person, setPerson] = useState<Person>("Alex");
  const [movePoints, setMovePoints] = useState(0);
  const [standPoints, setStandPoints] = useState(0);
  const [exercisePoints, setExercisePoints] = useState(0);
  const [bonusPoints, setBonusPoints] = useState(0);
  const [steps, setSteps] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="w-full absolute top-12 mx-auto">
        <Stepper step={step} />
      </div>
      {step === "who" && (
        <WhoStep
          onPress={(person) => {
            setPerson(person);
            setStep("when");
          }}
        />
      )}
      {step === "when" && (
        <WhenStep
          onPress={(date) => {
            setDate(date);
            setStep("move");
          }}
        />
      )}
      {step === "move" && (
        <MoveStep
          onPress={(points) => {
            setMovePoints(points);
            setStep("stand");
          }}
        />
      )}
      {step === "stand" && (
        <StandStep
          onPress={(points) => {
            setStandPoints(points);
            setStep("exercise");
          }}
        />
      )}
      {step === "exercise" && (
        <ExerciseStep
          onPress={(points) => {
            setExercisePoints(points);
            setStep("bonus");
          }}
        />
      )}
      {step === "bonus" && (
        <BonusStep
          onPress={(points) => {
            setBonusPoints(points);
            setStep("steps");
          }}
        />
      )}
      {step === "steps" && (
        <StepsStep
          onPress={(amountOfSteps) => {
            setSteps(amountOfSteps);
            // setStep("steps");
          }}
        />
      )}
    </div>
  );
}

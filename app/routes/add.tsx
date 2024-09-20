import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { useState } from "react";
import MoveStep from "~/steps/move";
import ExerciseStep from "~/steps/exercise";
import StandStep from "~/steps/stand";
import Stepper, { type Steps } from "~/steps/stepper";
import WhoStep, { type Person } from "~/steps/who";
import StepsStep from "~/steps/steps";
import BonusStep from "~/steps/bonus";
import WhenStep from "~/steps/when";
import { json, useNavigate } from "@remix-run/react";
import { addRow } from "~/utils/google_sheets";

type ActionData = {
  date: string;
  person: Person;
  movePoints: number;
  standPoints: number;
  exercisePoints: number;
  bonusPoints: number;
  steps: number;
};

export async function action({ request }: ActionFunctionArgs) {
  const data: ActionData = await request.json();

  await addRow(data);

  return json({ ok: true });
}

export const meta: MetaFunction = () => {
  return [
    { title: "Add - MFWT" },
    {
      name: "description",
      content: "An easier way to automate inputting workout data",
    },
  ];
};

export default function Add() {
  const [step, setStep] = useState<Steps>("who");
  const [date, setDate] = useState("");
  const [person, setPerson] = useState<Person>("Alex");
  const [movePoints, setMovePoints] = useState(0);
  const [standPoints, setStandPoints] = useState(0);
  const [exercisePoints, setExercisePoints] = useState(0);
  const [bonusPoints, setBonusPoints] = useState(0);

  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <div className="w-full absolute top-8 overflow-x-auto">
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
          onPress={async (steps) => {
            const ok = await fetch("/add", {
              method: "POST",
              body: JSON.stringify({
                date,
                person,
                movePoints,
                standPoints,
                exercisePoints,
                bonusPoints,
                steps,
              }),
            }).then((v) => v.ok);

            if (ok) {
              navigate("/view");
            } else {
              alert("Failed to add data");
            }
          }}
        />
      )}
    </div>
  );
}

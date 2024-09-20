import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

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
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-3xl font-bold">The Matthews Fitness Tracker</h1>
        <div className="btn btn-primary">
          <Link to="/add">Add Fitness Data</Link>
        </div>
        <div className="btn btn-primary">
          <Link to="/view">View Standings</Link>
        </div>
      </div>
    </div>
  );
}

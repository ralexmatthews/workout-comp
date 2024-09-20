import { type MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import MonthlyView from "~/components/monthly_view";
import WeeklyView from "~/components/weekly_view";
import { getAllData } from "~/utils/google_sheets";

export const meta: MetaFunction = () => {
  return [
    { title: "View - MFWT" },
    {
      name: "description",
      content: "An easier way to automate inputting workout data",
    },
  ];
};

export const loader = async () => {
  const data = await getAllData();
  return json(data);
};

export default function View() {
  const data = useLoaderData<typeof loader>();

  const [viewType, setViewType] = useState<"weekly" | "monthly">("weekly");

  return (
    <div className="min-h-screen flex flex-col items-center justify-start gap-4 pt-8 px-8">
      <h1 className="text-3xl font-bold">Standings</h1>
      <div role="tablist" className="w-full flex bg-black text-white">
        <button
          onClick={() => setViewType("weekly")}
          role="tab"
          className={`flex-1 btn ${
            viewType === "weekly" ? "btn-primary" : ""
          }`.trim()}
        >
          Weekly
        </button>
        <button
          onClick={() => setViewType("monthly")}
          role="tab"
          className={`flex-1 btn ${
            viewType === "monthly" ? "btn-primary" : ""
          }`.trim()}
        >
          Monthly
        </button>
      </div>
      {viewType === "weekly" && <WeeklyView data={data} />}
      {viewType === "monthly" && <MonthlyView data={data} />}
    </div>
  );
}

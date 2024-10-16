import { type MetaFunction, json } from "@remix-run/node";
import {
  ShouldRevalidateFunction,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { useState } from "react";
import ChartView from "~/components/chart_view";
import MonthlyView from "~/components/monthly_view";
import PillSwitch from "~/components/pill_switch";
import RawView from "~/components/raw_view";
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

export const shouldRevalidate: ShouldRevalidateFunction = ({
  defaultShouldRevalidate,
  currentUrl,
  nextUrl,
}) => {
  // we update the search params for view type, but we don't want to refetch the
  // data every time, so if we aren't changing paths, don't revalidate
  if (currentUrl.pathname === nextUrl.pathname) {
    return false;
  }

  return defaultShouldRevalidate;
};

const getInitialViewType = (searchParams: URLSearchParams): ViewType => {
  const viewType = searchParams.get("type");
  switch (viewType) {
    case "weekly":
    case "monthly":
    case "chart":
    case "raw":
      return viewType;
    default:
      return "weekly";
  }
};

type ViewType = "monthly" | "weekly" | "chart" | "raw";

export default function View() {
  const [searchParams, setSearchParams] = useSearchParams();

  const data = useLoaderData<typeof loader>();

  const [viewType, setViewType] = useState(getInitialViewType(searchParams));

  const handleSetViewType = (value: ViewType) => {
    setViewType(value);
    setSearchParams({ type: value });
  };

  return (
    <div className="flex flex-col items-center justify-start gap-4 pt-8 px-8">
      <h1 className="text-3xl font-bold">Standings</h1>
      <PillSwitch
        value={viewType}
        setValue={handleSetViewType}
        options={[
          { label: "Weekly", value: "weekly" },
          { label: "Monthly", value: "monthly" },
          { label: "Chart", value: "chart" },
          { label: "Raw", value: "raw" },
        ]}
      />
      {viewType === "weekly" && <WeeklyView data={data} />}
      {viewType === "monthly" && <MonthlyView data={data} />}
      {viewType === "chart" && <ChartView data={data} />}
      {viewType === "raw" && <RawView data={data} />}
    </div>
  );
}

import { format, subDays } from "date-fns";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { createDate } from "~/utils/dates";
import type { AllData, SheetDatum } from "~/utils/google_sheets";

const findScoreForDay = (data: SheetDatum[], day: string) => {
  const daysData = data.find((datum) => datum.date === day);

  if (!daysData) {
    return 0;
  }

  return (
    daysData.movePoints +
    daysData.exercisePoints +
    daysData.standPoints +
    daysData.bonusPoints
  );
};

const normalizeData = (data: AllData, daysToGoBack: number) => {
  const mapperArray = new Array(daysToGoBack)
    .fill(0)
    .map((_, index) => subDays(new Date(), index))
    .map((date) => format(date, "yyyy-MM-dd"))
    .reverse();

  return mapperArray.reduce(
    (acc, day) => [
      ...acc,
      {
        name: format(createDate(day), "LLL d"),
        Alex: findScoreForDay(data.Alex, day),
        Darby: findScoreForDay(data.Darby, day),
        Mom: findScoreForDay(data.Mom, day),
        Dad: findScoreForDay(data.Dad, day),
        Jon: findScoreForDay(data.Jon, day),
        Keely: findScoreForDay(data.Keely, day),
      },
    ],
    [] as {
      name: string;
      Alex: number;
      Darby: number;
      Mom: number;
      Dad: number;
      Jon: number;
      Keely: number;
    }[]
  );
};

const ChartView = ({ data }: { data: AllData }) => {
  const [daysToGoBack, setDaysToGoBack] = useState(7);

  const normalizedData = useMemo(
    () => normalizeData(data, daysToGoBack),
    [data, daysToGoBack]
  );

  return (
    <div className="w-full">
      <div className="w-full pb-8">
        <input
          className="range range-primary"
          type="range"
          min={7}
          max="28"
          value={daysToGoBack}
          onChange={(v) => setDaysToGoBack(Number(v.target.value))}
          step={1}
        />
        <div className="flex w-full justify-between px-2 text-xs">
          <span>7</span>
          <span>14</span>
          <span>21</span>
          <span>28</span>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="mx-auto w-fit">
          <LineChart data={normalizedData} width={730} height={400}>
            <CartesianGrid strokeDasharray="5" />
            <XAxis dataKey="name" />
            <YAxis scale="linear" interval={0} domain={[0, "dataMax + 1"]} />
            <Tooltip />
            <Legend />
            <Line strokeWidth={5} type="monotone" dataKey="Alex" stroke="red" />
            <Line
              strokeWidth={5}
              type="monotone"
              dataKey="Darby"
              stroke="blue"
            />
            <Line strokeWidth={5} type="monotone" dataKey="Mom" stroke="pink" />
            <Line
              strokeWidth={5}
              type="monotone"
              dataKey="Dad"
              stroke="brown"
            />
            <Line
              strokeWidth={5}
              type="monotone"
              dataKey="Jon"
              stroke="green"
            />
            <Line
              strokeWidth={5}
              type="monotone"
              dataKey="Keely"
              stroke="purple"
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default ChartView;

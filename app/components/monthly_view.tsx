import { useMemo } from "react";
import { format, startOfWeek } from "date-fns";
import type { AllData, SheetDatum } from "~/utils/google_sheets";
import { getReferenceDatesForMonth, getWeeksRecords } from "~/utils/dates";

const getStatsByWeek = (data: SheetDatum[]) => {
  const referenceDates = getReferenceDatesForMonth(new Date());

  return referenceDates
    .map((date) => [date, getWeeksRecords(data, date)] as const)
    .map(([date, data]) =>
      data.reduce(
        (acc, datum) => ({
          ...acc,
          movePoints: acc.movePoints + datum.movePoints,
          standPoints: acc.standPoints + datum.standPoints,
          exercisePoints: acc.exercisePoints + datum.exercisePoints,
          bonusPoints: acc.bonusPoints + datum.bonusPoints,
          steps: acc.steps + datum.steps,
        }),
        {
          date: startOfWeek(date),
          movePoints: 0,
          standPoints: 0,
          exercisePoints: 0,
          bonusPoints: 0,
          steps: 0,
        }
      )
    );
};

const getMonthlyScore = (data: ReturnType<typeof getStatsByWeek>) =>
  data.reduce((acc, datum) => {
    const hasBonusPoints = datum.bonusPoints === 7;
    const extraBonusPoints = hasBonusPoints ? 5 : 0;

    return (
      acc +
      datum.movePoints +
      datum.standPoints +
      datum.exercisePoints +
      datum.bonusPoints +
      extraBonusPoints
    );
  }, 0);

export default function MonthlyView({ data }: { data: AllData }) {
  const thisMonthsStatsByWeek = useMemo(
    () => ({
      Alex: getStatsByWeek(data.Alex),
      Darby: getStatsByWeek(data.Darby),
      Mom: getStatsByWeek(data.Mom),
      Dad: getStatsByWeek(data.Dad),
      Jon: getStatsByWeek(data.Jon),
      Keely: getStatsByWeek(data.Keely),
    }),
    [data]
  );
  const thisMonthsScore = useMemo(
    () => ({
      Alex: getMonthlyScore(thisMonthsStatsByWeek.Alex),
      Darby: getMonthlyScore(thisMonthsStatsByWeek.Darby),
      Mom: getMonthlyScore(thisMonthsStatsByWeek.Mom),
      Dad: getMonthlyScore(thisMonthsStatsByWeek.Dad),
      Jon: getMonthlyScore(thisMonthsStatsByWeek.Jon),
      Keely: getMonthlyScore(thisMonthsStatsByWeek.Keely),
    }),
    [thisMonthsStatsByWeek]
  );

  const monthlyOrder = useMemo(() => {
    const entries = Object.entries(thisMonthsScore);

    return entries.sort((a, b) => b[1] - a[1]) as [
      keyof typeof thisMonthsScore,
      number
    ][];
  }, [thisMonthsScore]);

  return (
    <div className="w-full join join-vertical">
      {monthlyOrder.map(([name, score]) => (
        <div key={name} className="collapse collapse-arrow join-item border">
          <input type="radio" name="weekly-accordion" />
          <div className="collapse-title text-xl font-medium">
            {name} - {score} point{score === 1 ? "" : "s"}
          </div>
          <div className="collapse-content overflow-x-auto">
            <div className="w-full">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Move</th>
                    <th>Stand</th>
                    <th>Exercise</th>
                    <th>Bonus</th>
                    <th>Steps</th>
                  </tr>
                </thead>
                <tbody>
                  {thisMonthsStatsByWeek[name].map((datum) => (
                    <tr key={datum.date.toISOString()}>
                      <th>{format(datum.date, "M/d")}</th>
                      <td>{datum.movePoints}</td>
                      <td>{datum.standPoints}</td>
                      <td>{datum.exercisePoints}</td>
                      <td>{datum.bonusPoints}</td>
                      <td>{datum.steps}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

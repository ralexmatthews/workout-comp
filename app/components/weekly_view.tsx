import { useMemo } from "react";
import { format } from "date-fns";
import type { AllData } from "~/utils/google_sheets";
import { createDate, getWeeklyScore, getWeeksRecords } from "~/utils/dates";

export default function WeeklyView({ data }: { data: AllData }) {
  const thisWeeksData = useMemo(
    () => ({
      Alex: getWeeksRecords(data.Alex),
      Darby: getWeeksRecords(data.Darby),
      Mom: getWeeksRecords(data.Mom),
      Dad: getWeeksRecords(data.Dad),
      Jon: getWeeksRecords(data.Jon),
      Keely: getWeeksRecords(data.Keely),
    }),
    [data]
  );
  const thisWeeksScore = useMemo(
    () => ({
      Alex: getWeeklyScore(thisWeeksData.Alex),
      Darby: getWeeklyScore(thisWeeksData.Darby),
      Mom: getWeeklyScore(thisWeeksData.Mom),
      Dad: getWeeklyScore(thisWeeksData.Dad),
      Jon: getWeeklyScore(thisWeeksData.Jon),
      Keely: getWeeklyScore(thisWeeksData.Keely),
    }),
    [thisWeeksData]
  );

  const weeklyOrder = useMemo(() => {
    const entries = Object.entries(thisWeeksScore);

    return entries.sort((a, b) => b[1] - a[1]) as [
      keyof typeof thisWeeksScore,
      number
    ][];
  }, [thisWeeksScore]);

  return (
    <div className="w-full join join-vertical">
      {weeklyOrder.map(([name, score]) => (
        <div key={name} className="collapse collapse-arrow join-item border">
          <input type="radio" name="weekly-accordion" />
          <div className="collapse-title text-xl font-medium">
            {name} - {score} point{score === 1 ? "" : "s"}
          </div>
          <div className="collapse-content overflow-x-auto">
            <div className="w-full">
              {thisWeeksData[name].length > 0 ? (
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
                    {thisWeeksData[name].map((datum) => (
                      <tr key={datum.date}>
                        <th>{format(createDate(datum.date), "EEE")}</th>
                        <td>{datum.movePoints}</td>
                        <td>{datum.standPoints}</td>
                        <td>{datum.exercisePoints}</td>
                        <td>{datum.bonusPoints}</td>
                        <td>{datum.steps}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No data entered</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

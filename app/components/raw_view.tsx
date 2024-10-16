import { useMemo, useState } from "react";
import { format, compareDesc } from "date-fns";
import type { AllData } from "~/utils/google_sheets";
import { createDate, getWeeklyScore, getWeeksRecords } from "~/utils/dates";
import PillSwitch from "./pill_switch";
import { Person } from "~/steps/who";

const RawView = ({ data }: { data: AllData }) => {
  const [person, setPerson] = useState<Person>("Alex");

  const rows = useMemo(
    () =>
      data[person].sort((a, b) =>
        compareDesc(createDate(a.date), createDate(b.date))
      ),
    [data, person]
  );

  return (
    <div className="w-full">
      <div className="w-full join join-vertical">
        <PillSwitch
          value={person}
          setValue={setPerson}
          options={["Alex", "Darby", "Mom"]}
        />
        <PillSwitch
          value={person}
          setValue={setPerson}
          options={["Dad", "Jon", "Keely"]}
        />
      </div>

      <div className="my-4 overflow-x-auto">
        <div className="w-full">
          <table className="table table-sm table-pin-rows">
            <thead>
              <tr>
                <th className="block min-w-32">Date</th>
                <th>Move</th>
                <th>Stand</th>
                <th>Exercise</th>
                <th>Bonus</th>
                <th>Steps</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr className="border-b-white" key={row.date}>
                  <th>{format(createDate(row.date), "MMM d, y")}</th>
                  <td>{row.movePoints}</td>
                  <td>{row.standPoints}</td>
                  <td>{row.exercisePoints}</td>
                  <td>{row.bonusPoints}</td>
                  <td>{row.steps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RawView;

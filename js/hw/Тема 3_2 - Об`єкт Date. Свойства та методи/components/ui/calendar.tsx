import { daysShort, monthsFull } from "@/app/constants";
import { cn } from "@/lib/utils";
import React, { memo } from "react";
import { Button } from "./button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

// month-day
const holidays: {
  [key: string]: string;
} = {
  "1-1": "Новий рік",
  "9-1": "День знань",
  "9-21": "Міжнародний день миру",
  "9-30": "Всеукраїнський день бібліотек",
};

function getFirstDayOfWeek(year: number, month: number) {
  const jsDay = new Date(year, month, 1).getDay();
  return (jsDay + 6) % 7;
}

function isWeekend(idx: number) {
  return idx === 5 || idx === 6;
}

const Calendar = memo(
  function Calendar({
    date,
    setDate,
  }: {
    date: Date;
    setDate: (date: Date) => void;
  }) {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfWeek = getFirstDayOfWeek(year, month);

    const cellAmt = 42;
    const today = new Date();

    const cells = Array.from({ length: cellAmt }, (_, i) => {
      const dayNum = i - firstDayOfWeek + 1;
      const cellDate = new Date(year, month, dayNum);
      const inMonth = cellDate.getMonth() === month;
      const isToday =
        cellDate.getDate() === today.getDate() &&
        cellDate.getMonth() === today.getMonth() &&
        cellDate.getFullYear() === today.getFullYear();

      return { date: cellDate, inMonth, isToday };
    });

    const weeks = Array.from({ length: cellAmt / 6 }, (_, i) =>
      cells.slice(i * 7, i * 7 + 7)
    );

    return (
      <div className="rounded-lg border font-mono">
        <div className="flex justify-between items-center p-2 border-b">
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => setDate(new Date(year, month - 1))}
          >
            {"<"}
          </Button>
          <span>
            {date.getFullYear()} {monthsFull[date.getMonth()]}
          </span>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => setDate(new Date(year, month + 1))}
          >
            {">"}
          </Button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {daysShort.map((d) => (
                <th
                  key={d}
                  className="p-2 text-sm font-semibold text-muted-foreground"
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, i) => (
              <tr key={i} className="border-b last:border-b-0">
                {week.map(({ date, inMonth, isToday }, j) => (
                  <td key={j} className="p-2 text-center text-sm">
                    {holidays[`${date.getMonth() + 1}-${date.getDate()}`] ? (
                      <Tooltip>
                        <TooltipTrigger>
                          <div
                            className={cn(
                              "relative flex h-6 w-6 items-center justify-center rounded-sm",
                              !inMonth && "text-muted-foreground opacity-50",
                              isWeekend(j) && "bg-destructive/20 border",
                              isToday && "bg-green-600/20 border"
                            )}
                          >
                            <div className="absolute bg-red-500 w-1 h-1 -top-0 -right-0 rounded-lg"></div>
                            {date.getDate()}
                          </div>
                          <TooltipContent className="bg-card p-2 border rounded-lg">
                            {
                              holidays[
                                `${date.getMonth() + 1}-${date.getDate()}`
                              ]
                            }
                          </TooltipContent>
                        </TooltipTrigger>
                      </Tooltip>
                    ) : (
                      <div
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-sm",
                          !inMonth && "text-muted-foreground opacity-50",
                          isWeekend(j) && "bg-destructive/20 border",
                          isToday && "bg-green-600/20 border"
                        )}
                      >
                        {date.getDate()}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
  (prev, next) => {
    return (
      prev.date.getFullYear() === next.date.getFullYear() &&
      prev.date.getMonth() === next.date.getMonth() &&
      prev.date.getDate() === next.date.getDate()
    );
  }
);

export default Calendar;

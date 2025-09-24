"use client";

import { Button } from "@/components/ui/button";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { daysFull } from "./constants";
import Calendar from "@/components/ui/calendar";

function formatTime(date: Date) {
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const milliseconds = date.getUTCMilliseconds();

  return (
    [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":") +
    "." +
    Math.floor(milliseconds / 10)
      .toString()
      .padStart(2, "0")
  );
}

function addZero(num: number) {
  return num < 10 ? `0${num}` : num;
}

function formatDateTime(date: Date) {
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());
  const seconds = addZero(date.getSeconds());

  const day = addZero(date.getDate());
  const month = addZero(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${hours}:${minutes}:${seconds} | ${
    daysFull[(date.getDay() + 6) % 7]
  }, ${day}.${month}.${year}`;
}

export default function Home() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [elapsed, setElapsed] = useState<Date>(new Date(0));
  const [paused, setPaused] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setCurrentDate(date);

      if (paused) return;
      setElapsed((prev) => new Date(prev.getTime() + 50));
    }, 50);

    return () => clearInterval(interval);
  });

  return (
    <div className="p-16 flex flex-col w-fit gap-2">
      <span className="border p-2 rounded-lg font-mono flex items-center justify-center h-8">
        {formatDateTime(currentDate)}
      </span>

      <div className="flex">
        <span className="border p-2 rounded-lg rounded-r-none flex items-center h-8 font-mono justify-center min-w-[120px]">
          {formatTime(elapsed)}
        </span>
        <Button
          size={"icon"}
          variant={"secondary"}
          onClick={() => setPaused((p) => !p)}
          className="rounded-l-none h-8"
        >
          {!paused ? <PauseIcon /> : <PlayIcon />}
        </Button>
      </div>

      <Calendar date={calendarDate} setDate={setCalendarDate} />
    </div>
  );
}

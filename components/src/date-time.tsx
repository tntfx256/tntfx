import { useEffect, useState } from "react";
import { shortMonths } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { useInterval } from "./hooks";
import { Box } from "./layout/box";
import { Text } from "./text";

type DateTimeData = ReturnType<typeof getDate>;

type DateTimeProps = { className?: string };

export function DateTime(props: DateTimeProps) {
  const { className } = props;

  const [date, setDate] = useState<DateTimeData>(getDatePlaceholder);
  const timer = useInterval(60000, () => setDate(getDate()));

  useEffect(() => {
    timer.start();
    setDate(getDate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className={classNames("dateTime", className)}>
      <Text className="dateTime__time">
        {date.hour}:{date.minutes}
      </Text>
      <Text className="dateTime__date">
        {date.weekDay} {date.day} {date.month}
      </Text>
    </Box>
  );
}

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const padZero = (d: number): number | string => (d < 10 ? `0${d}` : d);

function getDate() {
  const date = new Date();
  const hour = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const weekDay = weekDays[date.getDay()];
  const day = date.getDate().toString();
  const month = shortMonths[date.getMonth()];
  return { day, hour, minutes, month, weekDay };
}

function getDatePlaceholder(): DateTimeData {
  return { day: "", hour: "", minutes: "", month: "", weekDay: "" };
}

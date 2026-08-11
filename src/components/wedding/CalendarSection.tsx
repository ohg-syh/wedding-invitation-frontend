import { useEffect, useState } from "react";

import { DateTime } from "luxon";

import weddingData from "@/payloads/wedding";

const CalendarSection: React.FC = () => {
  const { ceremony, groom, bride } = weddingData;
  const weddingDate = DateTime.fromISO(ceremony.date);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = DateTime.now();
      const diff = weddingDate.diff(now, ["days", "hours", "minutes", "seconds"]);

      setTimeLeft({
        days: Math.floor(diff.days),
        hours: Math.floor(diff.hours),
        minutes: Math.floor(diff.minutes),
        seconds: Math.floor(diff.seconds),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  // 달력 생성
  const firstDay = weddingDate.startOf("month").weekday % 7; // 0 (일요일) ~ 6 (토요일)
  const daysInMonth = weddingDate.daysInMonth || 31;
  const weddingDay = weddingDate.day;

  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = new Array(firstDay).fill(null);

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    weeks.push(week);
  }

  return (
    <section className="calendar-section">
      <div className="calendar-container">
        <div className="calendar-date-info">
          <div className="date-display">{weddingDate.toFormat("yyyy.MM.dd")}</div>
          <div className="time-display">{ceremony.time}</div>
        </div>

        <div className="calendar">
          <table className="calendar-table">
            <thead>
              <tr>
                <th className="sunday">일</th>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th className="saturday">토</th>
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, weekIndex) => (
                <tr key={weekIndex}>
                  {week.map((day, dayIndex) => (
                    <td
                      key={dayIndex}
                      className={[
                        day === weddingDay ? "wedding-day" : "",
                        dayIndex === 0 ? "sunday" : "",
                        dayIndex === 6 ? "saturday" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {day === weddingDay ? <div className="day-marker">{day}</div> : day || ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="countdown-timer">
        <div className="timer-display">
          <div className="timer-unit">
            <span className="timer-label">Days</span>
            <span className="timer-value">{timeLeft.days}</span>
          </div>
          <span className="timer-separator">:</span>
          <div className="timer-unit">
            <span className="timer-label">Hour</span>
            <span className="timer-value">{timeLeft.hours}</span>
          </div>
          <span className="timer-separator">:</span>
          <div className="timer-unit">
            <span className="timer-label">Min</span>
            <span className="timer-value">{timeLeft.minutes}</span>
          </div>
          <span className="timer-separator">:</span>
          <div className="timer-unit">
            <span className="timer-label">Sec</span>
            <span className="timer-value">{timeLeft.seconds}</span>
          </div>
        </div>
        <p className="countdown-message">
          {groom.name}, {bride.name}의 결혼식이 {timeLeft.days}일 남았습니다.
        </p>
      </div>
    </section>
  );
};

export default CalendarSection;

import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const events = [
    {
      id: 1,
      title: "Meeting with client",
      date: "2023-10-16T10:00:00Z",
    },
    {
      id: 2,
      title: "Lunch with team",
      date: "2023-10-16T12:00:00Z",
    },
    {
      id: 3,
      title: "Doctor's appointment",
      date: "2023-10-16T14:00:00Z",
    },
    {
      id: 4,
      title: "Dinner with friends",
      date: "2023-10-16T19:00:00Z",
    },
    {
      id: 5,
      title: "Birthday party",
      date: "2023-10-17T18:00:00Z",
    },
  ];

  useEffect(() => {
    // Fetch events from API or database here
  }, []);

  const getMonthDays = () => {
    const month = dayjs().month();
    const daysInMonth = dayjs().daysInMonth(month);
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const day = dayjs().month(month).date(i);
      days.push(day);
    }
    return days;
  };

  console.log("date", dayjs(1697214633588).format())

  const getWeekDays = () => {
    const weekDays = [];
    const startOfWeek = dayjs().startOf("week");
    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.add(i, "day");
      weekDays.push(day);
    }
    return weekDays;
  };

  const getSevenDays = () => {
    const today = dayjs();

    const lastThreeDays = [];
    for (let i = 1; i <= 3; i++) {
      const day = dayjs(today).subtract(i, "days");
      lastThreeDays.push(day);
    }

    const nextFourDays = [];
    for (let i = 1; i <= 4; i++) {
      const day = dayjs(today).add(i, "days");
      nextFourDays.push(day);
    }

    return [...lastThreeDays.reverse(), today, ...nextFourDays];
  };

  const renderCalendarDay = (day) => {
    const eventsOnDay = events.filter((event) =>
      dayjs(event.date).isSame(day, "day")
    );

    return (
      <div className="calendar-day">
        <div className="calendar-date">
          <div className="date-button">
            <button type="button">
              <span className="date">{day.format("DD")}</span>
            </button>
          </div>
        </div>
        <div className="calendar-events">
          {eventsOnDay.map((event) => (
            <div className="calendar-event" key={event.id}>
              {event.title}
            </div>
          ))}
        </div>
      </div>
    );
  };

  console.log(currentDate.format("MMM YYYY"));

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h1>{currentDate.format("MMM YYYY")}</h1>
      </div>
      <div className="calendar-body">
        {getSevenDays().map((day,i) => (
          <div 
          key={i}
          >{renderCalendarDay(day)}</div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

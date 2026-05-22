import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const CalendarCard = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // Future: dispatch(setSelectedDate(date));
        // Future: dispatch(fetchDataByDate(date));
    };

    return (
        <div className="bg-white  p-4 rounded-3xl shadow-md w-full ">
            <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleDateChange}
                modifiersClassNames={{
                    selected: "bg-black text-white font-bold rounded-full w-9 h-9",
                }}
                classNames={{
                    caption: "text-gray-800 text-sm font-medium mb-2",
                    head_cell: "text-gray-400 text-xs font-semibold",
                    day: "text-gray-800 text-sm hover:bg-gray-100 rounded-full w-9 h-9",
                }}
                className="text-sm leading-none"
            />
        </div>
    );
};

export default CalendarCard;

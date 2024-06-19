import React from 'react';
import {
    format,
    parseISO,
    isSameDay,
    isWithinInterval,
    getMinutes,
    getHours,
    differenceInMinutes
} from 'date-fns';

interface CalendarProps {
    daysOfWeek: Date[];
    numRows: number;
    numCols: number;
    events: any[];
}

const Calendar: React.FC<CalendarProps> = ({ daysOfWeek, numRows, numCols, events }) => {

    const generateClockArray = (): string[] => {
        let clock: string[] = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                clock.push(`${hour < 10 ? '0' : ''}${hour}:${minute === 0 ? '00' : '30'}`);
            }
        }
        return clock;
    };

    const clock = generateClockArray();

    const renderEvents = (rowIndex: number, columnDate: string, events: any[]) => {
        const currentTimeSlot = parseISO(`${columnDate}T${clock[rowIndex]}`);
        const nextTimeSlot = rowIndex + 1 < clock.length ? parseISO(`${columnDate}T${clock[rowIndex + 1]}`) : null;

        const overlappingEvents = events.filter(event => {
            const eventStart = parseISO(event.start);
            const eventEnd = parseISO(event.end);
            return isSameDay(eventStart, currentTimeSlot) && (
                isWithinInterval(currentTimeSlot, { start: eventStart, end: eventEnd }) ||
                (nextTimeSlot && isWithinInterval(nextTimeSlot, { start: eventStart, end: eventEnd }))
            );
        });

        return overlappingEvents.slice(0, 3).map((event, index) => {
            const eventStart = parseISO(event.start);
            const eventEnd = parseISO(event.end);
            const startMinutes = getHours(eventStart) * 60 + getMinutes(eventStart);
            const endMinutes = getHours(eventEnd) * 60 + getMinutes(eventEnd);
            const slotHeight = (endMinutes - startMinutes) / 30 * 100; // Height in percentage
            const width = 33; // 33% width for up to 3 events
            const left = index * width; // Adjust left position based on the index
            const top = ((startMinutes - (getHours(currentTimeSlot) * 60 + getMinutes(currentTimeSlot))) / 30) * 100;

            return (
                <div
                    key={event.id}
                    className="absolute bg-blue-200 p-1 text-xs"
                    style={{ top: `${top}%`, height: `${slotHeight}%`, width: `${width}%`, left: `${left}%` }}
                >
                    {event.name}
                </div>
            );
        });
    };

    const generateCells = (i: number, j: number) => {
        const columnDate = format(daysOfWeek[j], 'yyyy-MM-dd');
        const dayKey = `${i}-${columnDate}`;

        const isTimeColumn = j === 0;
        const isFirstRow = i === 0;
        const timeText = isTimeColumn ? <p className="relative right-16 bottom-3">{clock[i]}</p> : null;
        const dayHeader = isFirstRow ? (
            <p className="text-center relative bottom-10">{format(daysOfWeek[j], 'EEEE')} {format(daysOfWeek[j], 'd')}</p>
        ) : null;

        return (
            <div key={dayKey} className={`relative w-56 h-10 bg-white ${i % 2 === 0 ? 'my-0' : 'mb-0.5'} mr-0.5`}>
                {dayHeader}
                {timeText}
                {renderEvents(i, columnDate, events)}
            </div>
        );
    };

    const rows = Array.from({ length: numRows }, (_, i) => (
        <div key={i} className="flex m-auto bg-neutral-200 w-fit">
            {Array.from({ length: numCols }, (_, j) => generateCells(i, j))}
        </div>
    ));

    return (
        <div className="w-full px-20 h-200 relative top-20">
            {rows}
        </div>
    );
};

export default Calendar;

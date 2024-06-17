import React from 'react';
import { format, parseISO, isSameDay, isSameMinute, getHours, getMinutes } from 'date-fns';

interface CalendarProps {
    daysOfWeek: Date[];
    numRows: number;
    numCols: number;
    events: any;
}

const Calendar: React.FC<CalendarProps> = ({ daysOfWeek, numRows, numCols, events }) => {
    let rows: JSX.Element[] = [];
    let clock: string[] = [];
    // Start from 6:00
    let hour = 6;
    let minute = 0;

    // Loop until 20:00
    while (hour < 24 || (hour === 24 && minute === 0)) {
        // Format the hour and minute strings
        let hourStr = hour < 10 ? '0' + hour : '' + hour;
        let minuteStr = minute === 0 ? '00' : '30';
        // Push the time into the array
        clock.push(`${hourStr}:${minuteStr}`);
        // Push an empty record after every second element
        clock.push('');
        // Increment by 30 minutes
        minute += 30;
        if (minute >= 60) {
            hour++;
            minute = 0;
        }
    }

    const renderEvents = (rowIndex: number, columnDate: string, events: any[]) => {
        const currentTimeSlot = parseISO(`${columnDate}T${clock[rowIndex]}`);
        return events
            .filter(event => {
                const eventStart = parseISO(event.start);
                return isSameDay(eventStart, currentTimeSlot) &&
                    isSameMinute(eventStart, currentTimeSlot);
            })
            .map(event => (
                <div key={event.id} className="absolute bg-blue-200 p-1 text-xs">
                    {event.name}
                </div>
            ));
    };

    /**
     *  Rows of the calendar
     */

    for (let i = 0; i < numRows; i++) {

        let cells: JSX.Element[] = []; 

        /**
         *  Columns of the calendar
         */

        for (let j = 0; j < numCols; j++) {

            let column_id = `${format(daysOfWeek[j], 'yyyy-MM-dd')}`;
            const dayKey = `${i}-${column_id}`;

            /**
             *  Sunday column
             */
            
            if (j === 0) {
                if (i === 0) {
                    cells.push(
                        <div key={dayKey} className="relative w-56 h-10 bg-white mt-0.5 mr-0.5 text-black">
                            <p className="text-center relative bottom-10">{format(daysOfWeek[0], 'EEEE')} {format(daysOfWeek[0], 'd')}</p>
                            <p className="relative right-16 bottom-[52.5px]">{clock[i]}</p>
                            {renderEvents(i, column_id, events)}
                        </div>
                    );
                } else {
                    if (i % 2 === 0) {
                        cells.push(
                            <div key={dayKey} className="relative w-56 h-10 bg-white my-0 mr-0.5 text-black">
                                {renderEvents(i, column_id, events)}
                                <p className="relative right-16 bottom-3">{clock[i]}</p>
                            </div>
                        );
                    } else {
                        cells.push(
                            <div key={dayKey} className="relative w-56 h-10 bg-white mb-0.5 mr-0.5">
                                {renderEvents(i, column_id, events)}
                            </div>
                        );
                    }
                }
            } else {

                /** 
                 *  Days row + 06:00 Mon-Sat
                 */

                if (i === 0) {
                    cells.push(
                        <div key={dayKey} className="relative w-56 h-10 bg-white mt-0.5 mr-0.5">
                            <p className="text-center relative bottom-10">{format(daysOfWeek[j], 'EEEE')} {format(daysOfWeek[j], 'd')}</p>
                            {renderEvents(i, column_id, events)}
                        </div>
                    );
                    
                    /**
                     * All the rest 
                     */

                } else {
                    if (i % 2 === 0) {
                        cells.push(
                            <div key={dayKey} className="relative w-56 h-10 bg-white my-0 mr-0.5">
                                {renderEvents(i, column_id, events)}
                            </div>
                        );
                    } else {
                        cells.push(
                            <div key={dayKey} className="relative w-56 h-10 bg-white mb-0.5 mr-0.5">
                                {renderEvents(i, column_id, events)}
                            </div>
                        );
                    }
                }
            }
        }
        rows.push(<div key={i} className="flex m-auto bg-neutral-200 w-fit">{cells}</div>);
    }

    return (
        <div className="w-full px-20 h-200 relative top-20">
            {rows}
        </div>
    );
};

export default Calendar;
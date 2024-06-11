import Calendar from "@/components/ui/calendar";
import React, { useState } from 'react';
import { startOfWeek, endOfWeek, addWeeks, subWeeks, addDays, subDays, eachDayOfInterval } from 'date-fns';
import NavigationCalendar from "@/components/ui/navigation-calendar";

export default function CalendarPage () {

    const [currentWeek, setCurrentWeek] = useState(new Date());
    const startDate = startOfWeek(currentWeek);
    const endDate = endOfWeek(currentWeek);
    const daysOfWeek = eachDayOfInterval({ start: startDate, end: endDate });
    const [events, setEvents] = useState({});
    const [newEvent, setNewEvent] = useState('');

    return(
        <section>
            <NavigationCalendar
                prevWeek={() => setCurrentWeek(subWeeks(currentWeek, 1))} 
                nextWeek={() => setCurrentWeek(addWeeks(currentWeek, 1))} 
                startDate={startDate} 
                endDate={endDate}      
                events={events}
                setNewEvent={setNewEvent}
                newEvent={newEvent}   
                />
            <Calendar 
            daysOfWeek={daysOfWeek} 
            numCols={7} 
            numRows={58} 
            events={events}
            />
        </section>
    );
}

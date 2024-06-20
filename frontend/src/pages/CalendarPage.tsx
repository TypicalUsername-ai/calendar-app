import Calendar from "@/components/ui/calendar";
import React, { useState } from 'react';
import { startOfWeek, endOfWeek, addWeeks, subWeeks, addDays, subDays, eachDayOfInterval } from 'date-fns';
import NavigationCalendar from "@/components/ui/navigation-calendar";
import { useQuery } from "@tanstack/react-query";
import authContext from "@/utils/authContext";
import axiosContext from "@/utils/axiosContext";
import { useContext } from "react";
import { Button } from '@components/ui/button'

export default function CalendarPage() {

    const [currentWeek, setCurrentWeek] = useState(new Date());
    const startDate = startOfWeek(currentWeek);
    const endDate = endOfWeek(currentWeek);
    const daysOfWeek = eachDayOfInterval({ start: startDate, end: endDate });
    const auth = useContext(authContext);
    const axios = useContext(axiosContext);
    const [isLoading, setIsLoading] = useState(true);

    const session = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const data = await auth.currentUser()?.getUserData();
            return data
        }
    })

    const token = useQuery({
        queryKey: ['token'],
        queryFn: async () => {
            const data = await auth.currentUser()?.jwt();
            return data
        },
        enabled: !!session.data
    })

    const array_events = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const data = await axios.get(`/events`, { headers: { 'Authorization': `Bearer ${token.data}` }, params: {owner: `eq.${session.data.id}`} })
            setIsLoading(false)
            return data
        },
        enabled: !!token.data
    })

    const exportCalendar = () => {
        const events = array_events.data?.data
        const lines = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Example Corp//Example Calendar//EN'
        ];

        events.forEach(event => {
            lines.push('BEGIN:VEVENT');
            lines.push(`UID:${event.id}`);
            lines.push(`DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}Z`);
            lines.push(`DTSTART:${event.start.replace(/[-:]/g, '').replace(/\.\d{3}/, '')}Z`);
            lines.push(`DTEND:${event.end.replace(/[-:]/g, '').replace(/\.\d{3}/, '')}Z`);
            lines.push(`SUMMARY:${event.name}`);
            lines.push(`DESCRIPTION:${event.description}`);
            if (event.location) {
                lines.push(`LOCATION:${event.location}`);
            }
            lines.push('END:VEVENT');
        });

        lines.push('END:VCALENDAR');

        const string = lines.join('\n');
        console.log(string)
        const blob = new Blob([string], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'events.ics';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    }

    return (
        <section>
            {!isLoading ?
                <section>
                    <Button variant="secondary" onClick={exportCalendar}> export </Button>
                    <NavigationCalendar
                        prevWeek={() => setCurrentWeek(subWeeks(currentWeek, 1))}
                        nextWeek={() => setCurrentWeek(addWeeks(currentWeek, 1))}
                        startDate={startDate}
                        endDate={endDate}
                        axios={axios}
                        auth={token}
                        session={session}
                    />
                    <Calendar
                        daysOfWeek={daysOfWeek}
                        numCols={7}
                        numRows={48}
                        events={array_events.data.data}
                        axios={axios}
                        auth={token}
                        session={session}
                    />
                </section> : <div></div>
            }
        </section>
    );
}

import Calendar from "@/components/ui/calendar";
import React, { useState } from 'react';
import { startOfWeek, endOfWeek, addWeeks, subWeeks, addDays, subDays, eachDayOfInterval } from 'date-fns';
import NavigationCalendar from "@/components/ui/navigation-calendar";
import { useQuery } from "@tanstack/react-query";
import authContext from "@/utils/authContext";
import axiosContext from "@/utils/axiosContext";
import { useContext } from "react";

export default function CalendarPage () {

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
        }
    })

    const array_events = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const data = await axios.get("/events", { headers: { 'Authorization': `Bearer ${token.data}` } } )
            setIsLoading(false)
            return data
        },
        enabled: !!token.data        
    })

    return(
        <section>
            {!isLoading ?
            <section>
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
                    numRows={74} 
                    events={array_events.data.data}
                />
            </section> : <div></div>
            }
        </section>
    );
}

import React from 'react';
import { format } from 'date-fns';
import left from "../../assets/left-arrow.png";
import right from "../../assets/right-arrow.png";
import CreateEventButton from './button-create-event';

interface NavigationCalendarProps {
    prevWeek: () => void;
    nextWeek: () => void;
    startDate: Date;
    endDate: Date;
    axios: any;
    auth: any;
    session: any;
}

const NavigationCalendar: React.FC<NavigationCalendarProps> = ({
    prevWeek,
    nextWeek,
    startDate,
    endDate,
    axios,
    auth,
    session
}) => {
    return (
        <div className="w-full min-w-[1662px] h-16 bg-gray-200">
            <section className="float-left flex bg-white relative top-3 rounded-lg ml-10 shadow-md">
                        <section className='flex h-10'>
                            <button onClick={prevWeek} className="w-5 h-5 mx-3 relative top-2"><img src={left} alt="Previous Week" /></button>
                            <p className="relative top-2">{format(startDate, 'dd-MM-yyyy')} - {format(endDate, 'dd-MM-yyyy')}</p>
                            <button onClick={nextWeek} className="w-5 h-5 mx-3 relative top-2"><img src={right} alt="Next Week" /></button>
                        </section>
            </section>
            <section className="float-right inline-flex">
                <CreateEventButton 
                    axios={axios}
                    auth={auth}
                    session={session}
                />
            </section>
        </div>
    );
};

export default NavigationCalendar;
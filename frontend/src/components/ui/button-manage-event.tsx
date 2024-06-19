import React, { useState, Fragment, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { PencilIcon } from '@heroicons/react/20/solid';
import { deleteEvent, editEvent } from '@/functions/calendar';
import { MinusIcon } from 'lucide-react';
import { useToast } from './use-toast';
import ICalendarLink from 'react-icalendar-link'

interface ManageEventButtonProps {
    axios: any;
    auth: any;
    session: any;
    event: any;
}

const callsToAction = [
    { name: 'Edit Event', edit: true, icon: PencilIcon },
    { name: 'Delete Event', edit: false, icon: MinusIcon }
];

const ManageEventButton: React.FC<ManageEventButtonProps> = ({ axios, auth, session, event }) => {

    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        title: '',
        description: '',
        location: ''
    });

    useEffect(() => {
        if (event) {

            const startDate = event.start.split('T')[0]
            const endDate = event.end.split('T')[0]
            const startTime = event.start.split('T')[1]
            const endTime = event.end.split('T')[1]

            setFormData({
                startDate: startDate,
                endDate: endDate,
                startTime: startTime || '',
                endTime: endTime || '',
                title: event.name || '',
                description: event.description || '',
                location: event.location || ''
            });
        }
    }, [event]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const { toast } = useToast();

    const handleEventEdition = async (
        axios: any,
        auth: any,
        formData: any,
        session: any,
        id: any
    ) => {
        try {
            editEvent(axios, auth, formData, session, id);
            toast({
                title: "Hooray!",
                description: `Event edited successfully.`
            })
        } catch (error: any) {
            toast({
                title: "Something went wrong...",
                description: error.json?.msg || error.response?.data.error_description,
                variant: 'destructive'
            })
        }
    }

    const handleEventDeletion = async (
        axios: any,
        auth: any,
        id: any
    ) => {
        try {
            deleteEvent(axios, auth, id);
            toast({
                title: "Hooray!",
                description: `Event deleted successfully.`
            })
        } catch (error: any) {
            toast({
                title: "Something went wrong...",
                description: error.json?.msg || error.response?.data.error_description,
                variant: 'destructive'
            })
        }
    }

    const eventIcal = {
        title: event.name,
        description: event.description,
        startTime: event.start,
        endTime: event.end,
        location: event.location,
        attendees: [
        ]
    }

    return (
        <Popover>
            <Popover.Button className="text-sm p-1 relative w-full font-semibold text-gray-900 bg-gray-200">
                <p>{event.name}</p>
            </Popover.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                    {({ close }) => (
                        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                            <div className="p-4 flex flex-col">
                                <section>
                                    <label className='h-10 text-lg'>Start Date: </label>
                                    <input
                                        type="date"
                                        className='h-10 text-lg border-solid border-2 border-sky-500 ml-8'
                                        name='startDate'
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        placeholder='Date'
                                    />
                                </section>

                                <section>
                                    <label className='h-10 text-lg' htmlFor="hourPicker">Start Hour:</label>
                                    <input
                                        className='h-10 text-lg border-solid border-2 border-sky-500 ml-4'
                                        type="time"
                                        id="time"
                                        name="startTime"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                    />
                                </section>
                                <section>
                                    <label className='h-10 text-lg'>End Date: </label>
                                    <input
                                        type="date"
                                        className='h-10 text-lg border-solid border-2 border-sky-500 ml-8'
                                        name='endDate'
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        placeholder='Date'
                                    />
                                </section>
                                <section>
                                    <label className='h-10 text-lg' htmlFor="hourPicker">End Hour:</label>
                                    <input
                                        className='h-10 text-lg border-solid border-2 border-sky-500 ml-4'
                                        type="time"
                                        id="time"
                                        name="endTime"
                                        value={formData.endTime}
                                        onChange={handleChange}
                                    />
                                </section>

                                <input name='title' value={formData.title} onChange={handleChange} className='h-10 text-lg ' placeholder='Title' />
                                <input name='description' value={formData.description} onChange={handleChange} className='h-10 text-lg ' placeholder='Location' />
                                <textarea name='location' value={formData.location} onChange={handleChange} className='h-40 text-lg ' maxLength={250} placeholder='Description' />
                            </div>
                            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                {callsToAction.map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => {
                                            if (item.edit == true) {
                                                handleEventEdition(axios, auth, formData, session, event.id);
                                                location.reload()
                                            } else {
                                                if (window.confirm("Are you sure?")) {
                                                    handleEventDeletion(axios, auth, event.id);
                                                }
                                            }
                                            location.reload()
                                            close();
                                        }}
                                        className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                                    >
                                        <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                            <ICalendarLink event={eventIcal}>
                                Add to Calendar (ics)
                            </ICalendarLink>;
                        </div>
                    )}
                </Popover.Panel>
            </Transition>
        </Popover>
    );
};

export default ManageEventButton;

import React, { useState, Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, PhoneIcon, PlusIcon } from '@heroicons/react/20/solid';
import { addEvent } from '@/functions/calendar';

interface CreateEventButtonProps {
  events: Record<string, any>;
  setNewEvent: (newEvent: any) => void;
  newEvent: any;
}

const callsToAction = [
  { name: 'Add Event', href: '#', icon: PlusIcon },
];

const CreateEventButton: React.FC<CreateEventButtonProps> = ({ events, setNewEvent, newEvent }) => {
  // Variables used to create an event
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedHour, setSelectedHour] = useState<string>('');
  const [selectedMinute, setSelectedMinute] = useState<string>('0');

  // Functions that handle the change of variables 
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleHourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedHour(event.target.value);
  };

  const handleMinuteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedMinute(value);
  };

  return (
    <Popover>
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 relative top-3 mx-10 bg-white rounded-md shadow-md p-1">
        <span className='p-1'>Add Event</span>
        <ChevronDownIcon className="h-8 w-5" aria-hidden="true" />
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
                  <label className='h-10 text-lg'>Date: </label>
                  <input
                    type="date"
                    className='h-10 text-lg border-solid border-2 border-sky-500 ml-8'
                    value={selectedDate}
                    onChange={handleDateChange}
                    placeholder='Date'
                  />
                </section>
                
                <section>
                  <label className='h-10 text-lg' htmlFor="hourPicker">Hour:</label>
                  <input
                    className='h-10 text-lg border-solid border-2 border-sky-500 ml-1'
                    id="hourPicker"
                    type="number"
                    min="6"
                    max="20"
                    value={selectedHour}
                    onChange={handleHourChange}
                  />
                </section>

                <section>
                  <label htmlFor="minutePicker" className='h-10 text-lg'>Minutes:</label>
                  <select
                    className='h-10 text-lg border-solid border-2 border-sky-500 ml-4'
                    id="minutePicker"
                    value={selectedMinute}
                    onChange={handleMinuteChange}
                  >
                    <option value="0">00</option>
                    <option value="1">15</option>
                    <option value="2">30</option>
                    <option value="3">45</option>
                  </select>
                </section>
                <input className='h-10 text-lg ' placeholder='Title' />
                <input className='h-10 text-lg ' placeholder='Location' />
                <textarea className='h-40 text-lg ' maxLength={250} placeholder='Description' />
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      addEvent(parseInt(selectedHour), parseInt(selectedMinute), selectedDate, events, setNewEvent, newEvent);
                      close();
                    }}
                    className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default CreateEventButton;

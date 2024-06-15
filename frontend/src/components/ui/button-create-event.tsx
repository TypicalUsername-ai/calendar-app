import React, { useState, Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, PhoneIcon, PlusIcon } from '@heroicons/react/20/solid';
import { addEvent } from '@/functions/calendar';

interface CreateEventButtonProps {
  axios: any;
  auth: any;
  session: any;
}

const callsToAction = [
  { name: 'Add Event', href: '#', icon: PlusIcon },
];

const CreateEventButton: React.FC<CreateEventButtonProps> = ({ axios, auth, session }) => {
  // Variables used to create an event
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    title: '',
    description: '',
    location: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
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
                      addEvent( axios, auth, formData, session );
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

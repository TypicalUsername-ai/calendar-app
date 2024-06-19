
// Function to handle adding events
export const addEvent = (
    axios: any,
    auth: any,
    formData: any,
    session: any
): void => {
    
    /**
     * Adding event object to database
     */ 

    axios.post('/events', {
        owner: session.data.id,
        name: formData.title,
        location: formData.location,
        description: formData.description,
        start: `${formData.startDate} ${formData.startTime}`,
        end: `${formData.endDate} ${formData.endTime}` 
    }, { headers: { 'Authorization': `Bearer ${auth.data}` } })
};

export const editEvent = (
    axios: any,
    auth: any, 
    formData: any,
    session: any,
    id: any
) : void => {

    /**
     * Editing event object in database 
     */

    axios.patch(`/events`, {
        owner: session.data.id,
        name: formData.title,
        location: formData.location,
        description: formData.description,
        start: `${formData.startDate} ${formData.startTime}`,
        end: `${formData.endDate} ${formData.endTime}` 
        }, 
        { 
            headers: { 'Authorization': `Bearer ${auth.data}` },
            params: {id: `eq.${id}`} 
        })
    }

export const deleteEvent = (
    axios: any,
    auth: any,
    id: any
    ) : void => {
      
    /**
    * Deleting event object from database
    */
      
    axios.delete(`/events`, {
        headers: { 'Authorization': `Bearer ${auth.data}` },
        params: { id: `eq.${id}` }
    })
}

// Function to render events in the calendar
export const renderEvents = (
    row: number, 
    col: string, 
    events: Record<string, any>
): JSX.Element | null => {
    const eventKey = `${row}-${col}`;
    if (events.hasOwnProperty(eventKey)) {
        console.log("hasOwnProperty", eventKey);
        return <div className="bg-teal-500 rounded-lg drop-shadow-xl absolute w-56 h-10"></div>;
    } else {
        return null;
    }
};
 
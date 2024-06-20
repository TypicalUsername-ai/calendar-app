export default () => {
    return (

        <div className="mt-6 ml-10 mt-10">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Welcome to the Calendar App!
            </h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                This application allows you to manage your time effectively by introducing your plans into the calendar.
            </p>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2 mb-10">
                <li>All your events are visible in the calendar, so can be tracked conveniently</li>
                <li>One or multiple events can be exported from the file with <i>ical</i> format</li>
                <li>One or multiple events may be imported from the file with <i>ical</i> format</li>
                <li>Your account info and events in the calendar are secure and available only to very you</li>
                <li>If you don't have an account, go to Account-&gt;Sign up</li>
                <li>If you have already registered, welcome back! Go to Account-&gt;Log in and provide your credentials</li>
                <li>You can reset your password in case you forgot it</li>
            </ul>
            <p>Here you can find technical documentation and the code: <br />
                <a href="https://github.com/TypicalUsername-ai/calendar-app">Github</a></p>
        </div>
    )
}


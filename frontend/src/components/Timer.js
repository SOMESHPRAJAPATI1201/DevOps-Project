import React from 'react';

export default function Timer() {
    const [time, setTime] = React.useState(0);

    setInterval(() => {
        setTime(time + 1);
    }, 1000);

    return (
        <div>
            <h1>Timer</h1>
            <p>Time: {time} seconds</p>
            <button onClick={() => setTime(0)}>Reset Timer</button>
        </div>
    );
}
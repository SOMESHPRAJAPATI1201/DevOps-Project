import HandleNewJoke from '../pages/Dashboard'; // Adjust the import path as necessary
import React, { useState } from 'react';

const JokeForm = () => {

    const [text, setText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitting new joke:', text);
        HandleNewJoke(text);
        setText(''); // Clear the input field after submission
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                onChange={(e) => setText(e.target.value)}
                value={text}
                type="text"
                placeholder="Enter a new joke"
                required
            />
            <button type="submit">Add Joke</button>
        </form>
    );

}

export default JokeForm;
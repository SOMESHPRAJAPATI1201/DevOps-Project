import React, { useEffect, useState } from 'react'; // Ensure 'self' is available in the global scope
import first from '../styling/1.png'; // Adjust the path as necessary

const HandleImage = () => {
    const [images, setImages] = useState([]);
    const[title, settitle] = useState('');


    useEffect(() => {
        console.log('Component mounted or images changed');
        document.title = title; // Set the document title when the component mounts or images change
        window.scroll({
            top: Number.MAX_SAFE_INTEGER,
            behavior: 'smooth'
        })
    });



    const handleImg = (src) => {
        setImages([...images, {
        id: crypto.randomUUID(), 
        src }]);

        document.title = `Image Count: ${images.length + 1}`; // Update the document title with the new count
    }

    const handleDeleteImg = (id) => {
        setImages(images.filter(image => image.id !== id));
    }

    return (
        <>
            {images.map(({id, src}) => (
                <img onClick={() => handleDeleteImg(id)} src={src} alt="Uploaded" key={id} style={{ width: '100px', height: '100px', cursor: 'pointer' }} />
            ))}

            <h1>Handle Image</h1>
            <button onClick={() => handleImg(first)}>Add Image</button>
        </>
    );
}

export default HandleImage;
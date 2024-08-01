import { useState } from 'react';

export default function Home() {
    const [message, setMessage] = useState('');
    const [imagePath, setImagePath] = useState('');

    const processImage = async () => {
        const res = await fetch('/api/process-image');
        const data = await res.json();

        if (res.status === 200) {
            setMessage(data.message);
            setImagePath(data.imagePath);
        } else {
            setMessage(data.error);
        }
    };

    return (
        <div>
            <h1>Image Processing with Next.js</h1>
            <button onClick={processImage}>Process Image</button>
            {message && <p>{message}</p>}
            {imagePath && <img src={imagePath} alt="Processed Image" />}
        </div>
    );
}
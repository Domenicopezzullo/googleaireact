import "bootstrap/dist/css/bootstrap.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState } from 'react';

interface GoogleProps {
  google_api_key: string
}

function GoogleThingieComponent(props:GoogleProps) {
    const [text, setText] = useState('');
    const [output, setOutput] = useState('');

    // Create the model instance outside of the component to avoid re-creating it on every render
    const model = new GoogleGenerativeAI(props.google_api_key).getGenerativeModel({ model: "gemini-pro" });

    async function handleTextSubmitted(message: string) {
        try {
            const response = await model.generateContent(message);
            setOutput(response.response.text());  // Assuming the response contains the generated content
        } catch (error) {
            console.error("Error generating content:", error);
            setOutput("Error generating content");
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleTextSubmitted(text);
    }

    return (
        <div className="google-container">
            <form onSubmit={handleSubmit}>
                <textarea
                    value={text}
                    className="form-control"
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter your text here"
                ></textarea>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
            <textarea
                value={output}
                className="form-control"
                readOnly
                placeholder="AI-generated content will appear here"
            ></textarea>
        </div>
    );
}

export default GoogleThingieComponent;

import { useState } from 'react';

function ChatComponent() {
    const [history, setHistory] = useState([
        { role: "user", parts: [{ text: "Hello, I have 2 dogs in my house." }] },
        { role: "model", parts: [{ text: "Great to meet you. What would you like to know?" }] }
    ]);
    const [userMessage, setUserMessage] = useState('');

    const sendMessageToChat = async (message, history) => {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userMessage: message, history })
        });

        const data = await response.json();
        return data;
    };

    const handleSendMessage = async () => {
        const newHistory = [
            ...history,
            { role: "user", parts: [{ text: userMessage }] }
        ];
        const chatResponse = await sendMessageToChat(userMessage, newHistory);
        setHistory([...newHistory, { role: "model", parts: [{ text: chatResponse.message }] }]);
        setUserMessage('');
    };

    return (
        <div>
            <div>
                {history.map((message, index) => (
                    <div key={index} className={message.role}>
                        {message.parts.map((part, i) => (
                            <p key={i}>{part.text}</p>
                        ))}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}

export default ChatComponent;

import { useState, useEffect } from "react";

const agents = [
    { id: "default", name: "General AI" },
    { id: "drilling-expert", name: "Drilling Expert AI" },
    { id: "compliance-ai", name: "Compliance AI" },
    { id: "merlin-erd", name: "Merlin ERD AI" }
];

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [selectedAgent, setSelectedAgent] = useState("default");
    const [isStreaming, setIsStreaming] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessage = { sender: "user", text: input, agent: selectedAgent };
        setMessages([...messages, newMessage]);
        setInput("");
        setIsStreaming(true);

        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input, agent: selectedAgent })
        });

        const reader = response.body.getReader();
        let botMessage = { sender: "ai", text: "", agent: selectedAgent };

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            botMessage.text += new TextDecoder().decode(value);
            setMessages([...messages, newMessage, botMessage]);
        }

        setIsStreaming(false);
    };

    return (
        <div className="flex flex-col h-full">
            {/* Agent Selector */}
            <div className="p-3 bg-gray-200 dark:bg-gray-700 flex items-center">
                <label className="mr-2">Select AI:</label>
                <select className="p-2 rounded bg-white dark:bg-gray-800"
                        value={selectedAgent}
                        onChange={(e) => setSelectedAgent(e.target.value)}>
                    {agents.map((agent) => (
                        <option key={agent.id} value={agent.id}>{agent.name}</option>
                    ))}
                </select>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`p-2 my-2 rounded ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
                        <strong>{agents.find(a => a.id === msg.agent)?.name}:</strong> {msg.text}
                    </div>
                ))}
                {isStreaming && <p className="text-gray-500">AI is typing...</p>}
            </div>

            {/* Chat Input */}
            <div className="p-3 flex">
                <input className="flex-1 p-2 border rounded"
                       placeholder="Type a message..."
                       value={input}
                       onChange={(e) => setInput(e.target.value)} />
                <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded">Send</button>
            </div>
        </div>
    );
}

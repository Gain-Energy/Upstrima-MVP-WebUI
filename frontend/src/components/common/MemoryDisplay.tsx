import { useEffect, useState } from "react";

export default function MemoryDisplay({ userId }) {
    const [memory, setMemory] = useState([]);

    useEffect(() => {
        const fetchMemory = async () => {
            const response = await fetch(`/api/chat-memory?user_id=${userId}`);
            const data = await response.json();
            setMemory(data.memory);
        };

        fetchMemory();
    }, [userId]);

    return (
        <div className="p-4 border-t mt-4">
            <h3 className="text-lg font-bold">AI Memory</h3>
            <ul className="text-sm text-gray-500">
                {memory.map((mem, i) => (
                    <li key={i}>🔄 {mem.metadata.text.substring(0, 100)}...</li>
                ))}
            </ul>
        </div>
    );
}

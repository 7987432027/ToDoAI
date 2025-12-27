import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [chatInput, setChatInput] = useState("");

  // Handle sending message
  const handleSend = () => {
    const message = chatInput.trim();
    if (!message) return; // prevent sending empty messages

    // Call parent callback with the message
    onSend(message);

    // Clear input after sending
    setChatInput("");
  };

  // Send message on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent new line in textarea
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <textarea
        className="flex-1 border rounded p-2 focus:outline-none"
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        rows={1}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}

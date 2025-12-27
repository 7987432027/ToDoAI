"use client";

import { useState } from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import ChatInput from "@/components/chatInput";

export default function AiChatPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (text) => {
  const newMessages = [
    ...messages,
    { role: "user", content: text },
  ];

  setMessages(newMessages);
  setLoading(true);

  try {
    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: newMessages,
      }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.reply },
    ]);
  } catch (err) {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Something went wrong 😕",
      },
    ]);
  } finally {
    setLoading(false);
  }
};
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          py: 3,
        }}
      >
        {/* Header */}
        <Typography variant="h4" fontWeight={600} mb={2}>
          AI Chat
        </Typography>

        {/* Messages */}
        <Paper
          elevation={2}
          sx={{
            flex: 1,
            p: 2,
            mb: 2,
            overflowY: "auto",
            borderRadius: 3,
            backgroundColor: "#fafafa",
          }}
        >
          {messages.length === 0 && (
            <Typography color="text.secondary">
              Start a conversation with the AI ✨
            </Typography>
          )}

          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                mb: 1.5,
                display: "flex",
                justifyContent:
                  msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  maxWidth: "75%",
                  backgroundColor:
                    msg.role === "user" ? "#1976d2" : "#e0e0e0",
                  color:
                    msg.role === "user" ? "#fff" : "#000",
                }}
              >
                {msg.content}
              </Box>
            </Box>
          ))}
        </Paper>

        {/* Input */}
        <ChatInput onSend={handleSend} disabled={loading} />
      </Box>
    </Container>
  );
}

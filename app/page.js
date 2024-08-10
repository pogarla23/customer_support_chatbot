"use client";
import * as React from 'react';
import { Box, Stack, TextField, Button, Typography, Modal } from "@mui/material";
import { useState } from "react";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import Header from "./components/header"; 
import Login from "./components/login";
import Review from "./components/modal"
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const firstMessage = "Hi there! I'm the Headstarter customer service. How can I help?";
   
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const sendMessage = async () => {
    if (message.toLowerCase() === "y") {
      setOpenModal(true);
    }
    
    setHistory((history) => [ ...history, {role: "user", parts: [{text: message}]} ])
    setMessage('');

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify([ ...history, {role: "user", parts: [{text: message}]} ])
    });

    const data = await response.json();

    setHistory((history) => [ ...history, {role: "model", parts: [{text: data}] }])
  };
  
  const clearConversation = () => {
    setHistory([]);
    setMessage("");
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text("Conversation Log", 14, 16);

    const columns = ["Role", "Message"];
    const rows = history.map(item => [item.role, item.parts[0].text]);
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
    });

    doc.save("conversation_log.pdf");
  };
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor={darkMode ? "#121212" : "#f5f5f5"}
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> {/* Use Header here */}

      <Stack
        direction="column"
        width="600px"
        height="600px"
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
        borderRadius={8}
        bgcolor={darkMode ? "#333" : "white"}
        p={2}
        spacing={3}
        overflow="auto"
        marginBottom="5%"
        sx={{ opacity: openModal ? 0.5 : 1 }} 
      >
        <Stack direction="row" display="flex">
          <Button
            onClick={clearConversation}
            sx={{
              alignSelf: 'flex-start',
              mb: 1,
              paddingRight: "10px",
              position: 'static',
              bgcolor: darkMode ? "grey.800" : "grey.300",
              color: darkMode ? "white" : "black",
            }}
          >
            <DeleteOutlinedIcon /> Clear
          </Button>
          <Button
            onClick={generatePDF}
            sx={{
              alignSelf: 'flex-start',
              position: 'static',
              mb: 1,
              bgcolor: darkMode ? "grey.800" : "grey.300",
              color: darkMode ? "white" : "black",
               marginLeft: "2%"
            }}
          >
            <DownloadIcon />
          </Button>
        </Stack>
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
          pr={1}
        >
          <Box
            display="flex"
            justifyContent="flex-start"
            bgcolor={darkMode ? "grey.700" : "lightblue"}
            borderRadius={8}
            p={2}
            mb={2}
            maxWidth="70%"
          >
            <Typography color="white" variant="body1">
              {firstMessage}
            </Typography>
          </Box>

          {history.map((textObject, index) => (
            <Box
              key={index}
              display="flex"
              flexDirection="column"
              alignItems={textObject.role === 'user' ? 'flex-end' : 'flex-start'}
              mb={2}
            >
              {textObject.role !== 'user' && (
                <Typography
                  fontSize="15px"
                  color={darkMode ? "white" : "grey.500"}
                  mb={1}
                  marginLeft={2}
                >
                  Headstarter Assistant
                </Typography>
              )}
              <Box
                bgcolor={
                  textObject.role === 'user'
                    ? darkMode
                      ? "#37474F"
                      : "lightgreen"
                    : darkMode
                    ? "grey.700"
                    : "lightblue"
                }
                color="white"
                borderRadius={8}
                p={2}
                maxWidth="75%"
                boxShadow="0 2px 10px rgba(0, 0, 0, 0.1)"
              >
                <Typography component="div" sx={{ whiteSpace: 'pre-line' }}>
                  {textObject.parts[0].text}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
        <AccountCircle fontSize='large'/>
          <TextField 
            label="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{
              borderRadius: 4,
              backgroundColor: darkMode ? "#424242" : "#fff",
              color: darkMode ? "white" : "black",
            }}
            InputLabelProps={{
              style: { color: darkMode ? "white" : "black" },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={sendMessage}
            sx={{
              padding: '14px 24px',
              borderRadius: 4,
              textTransform: 'none',
              fontWeight: 'bold',
            }}
          >
            <ArrowUpwardIcon />
          </Button>
        </Stack>
      </Stack>

      {/* Call Review Component here if modal is open */}
      {openModal && <Review handleClose={handleCloseModal} />}
    </Box>
  );
}


"use client";
import * as React from 'react';
import { Box, Stack, Button, Typography, Modal, TextField } from "@mui/material";
import Rating from '@mui/material/Rating';


export default function Review({ handleClose }) {
    const [value, setValue] = React.useState(2);
  
    return (
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          position="absolute"
          left={"28%"}
          top={"32%"}
          transform="translate(-50%, -50%)"
          width="400px"
          bgcolor="white"
          borderRadius={8}
          boxShadow={24}
          p={4}
          textAlign="center"
        >
          <Stack direction={"column"} alignItems={"center"}>
          <Typography id="modal-title" variant="h5" component="h2">
            Leave Us A Review!
          </Typography>
          <Typography id="modal-description"  sx={{ mt: 3, marginBottom: "3%" }}>
            Rate Your Experience
          </Typography>
          
            <Rating
              name="simple-controlled"
              
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <TextField 
            label="Tell us More!"
            variant="outlined"
            fullWidth
            sx={{
              borderRadius: 4,
              backgroundColor:"#fff",
              color: "black",
              margin: "15px"
            }}
            InputLabelProps={{
              style: { color: "black" },
            }}
          />
          <Button 
            onClick={handleClose} 
            variant="contained" 
            color="primary" 
            
            sx={{ mt: 2, borderRadius: 3, padding: "10px 20px" }}
          >
            Submit
          </Button>
          
          </Stack>
          
        </Box>
      </Modal>
    );
  }
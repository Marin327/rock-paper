import React from "react";
import { Box, Typography, List, ListItem, Divider } from "@mui/material";


const GameHistory = ({ history }) => {
  return (
    <Box sx={{ mt: 3, bgcolor: "#e0e0e0", p: 2, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        История на играта
      </Typography>
      <List>
        {history.map((entry, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <Typography variant="body1">
                Игра {index + 1}: {entry.player} срещу {entry.computer} -{" "}
                <strong>{entry.result}</strong>
              </Typography>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default GameHistory;

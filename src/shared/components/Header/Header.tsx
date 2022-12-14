import { Box, AppBar, Typography, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const [currentTab, setCurrentTab] = useState("/book-app/books");

  const handleChange = (event: React.SyntheticEvent, newTab: string) => {
    setCurrentTab(newTab);
  };

  return (
    <Box mb={3}>
      <AppBar position="static">
        <Typography variant="h5" p={2}>
          Books App
        </Typography>
        <Tabs value={currentTab} onChange={handleChange} textColor="inherit">
          <Tab
            label="Book Overview"
            value="/book-app/books"
            to="/book-app/books"
            component={NavLink}
          />
          <Tab
            label="New Book"
            value="/book-app/book"
            to="/book-app/book"
            component={NavLink}
          />
        </Tabs>
      </AppBar>
    </Box>
  );
};

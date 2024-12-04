import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Menu, MenuItem, Box, Switch } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import '../../styles/Header.scss';
import noUser from '../../assets/user.png';
import ConfirmationLogout from "../popup/ConfirmLogout";

const Header = ({ activeTab, onTabChange }) => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const tabs = [
    { label: "All Tasks", path: "/all-task" },
    { label: "Pending Tasks", path: "/pending-task" },
    { label: "Completed Tasks", path: "/completed-task" },
  ];

  const handleTabChange = (index, path) => {
    onTabChange(index);
    navigate(path);
  };

  const handleOpenUser = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setIsLogoutOpen(true);
  };

  const handleCloseLogout = () => {
    setIsLogoutOpen(false);
  };

  const handleConfirmLogout = () => {
    setIsLogoutOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setDarkMode();
    } else {
      setLightMode();
    }
  }, []);

  const setDarkMode = () => {
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    setIsDarkMode(true);
  };

  const setLightMode = () => {
    document.body.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    setIsDarkMode(false);
  };

  const toggleTheme = () => {
    if (isDarkMode) {
      setLightMode();
    } else {
      setDarkMode();
    }
  };

  const storedUserName = localStorage.getItem('userName');
  const storedEmail = localStorage.getItem('userEmail');

  return (
    <Typography>
      <Typography className="header">
        <Typography className="m-2 Todo">
          <h3>Todo List App</h3>
        </Typography>
        <Typography className="mt-2">
          <nav>
            {tabs.map((tab, index) => (
              <span
                key={tab.label}
                className={`tab ${activeTab === index ? "active" : ""}`}
                onClick={() => handleTabChange(index, tab.path)}>
                {tab.label}
              </span>
            ))}
            <span onClick={handleOpenUser} className="user-name">
              <img src={noUser} alt="No User" className="user-img" />
              {storedUserName || "User  "}
            </span>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseUser}
              className="menu">
              <MenuItem disabled className="menu-item">{storedUserName || "User"}</MenuItem>
              <MenuItem disabled className="menu-item">{storedEmail || "Email not set"}</MenuItem>
              <MenuItem onClick={handleLogout} className="menu-item">
                <span>Logout</span>
                <LogoutIcon fontSize="small" />
              </MenuItem>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="ml-3">Theme</span>
                <Switch
                  onClick={toggleTheme}
                  name="themeToggle"
                  inputProps={{ 'aria-label': 'theme toggle' }}
                />
              </Box>
            </Menu>
          </nav>
        </Typography>

      </Typography>

      <ConfirmationLogout
        open={isLogoutOpen}
        onClose={handleCloseLogout}
        onConfirm={handleConfirmLogout}
      />
    </Typography>
  );
};

export default Header;
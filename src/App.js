import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from './components/NotFound';
import './App.css';
import './styles/Theme.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/all-task" element={<HomePage tab={0} />} />
        <Route path="/pending-task" element={<HomePage tab={1} />} />
        <Route path="/completed-task" element={<HomePage tab={2} />} />
        <Route path="/add-task" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

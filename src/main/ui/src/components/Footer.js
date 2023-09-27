import React from "react";
import "./styles/Footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="https://github.com/Chicha63/ToDoList#todolist-app-project-readme">About</a>
          <a href="mailto:gupal2004@gmail.com">Contact</a>
        </div>
        
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
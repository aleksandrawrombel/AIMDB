import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import humanoid_icon from "../assets/humanoid_icon.svg";

import { useState, useEffect } from "react";

function Chatbot() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const steps = [
    {
      id: "0",
      message: "Welcome to react chatbot!",
      trigger: "1",
    },
    {
      id: "1",
      message: "Bye!",
      end: true,
    },
  ];

  const theme = {
    background: "#f5f8fb",
    fontFamily: "Helvetica Neue",
    headerBgColor: "#333333",
    headerFontColor: "#fff",
    headerFontSize: "1.5rem",
    botBubbleColor: "#333333",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#ffdb4d",
  };

  return (
    <main className={`chatbot_container ${isVisible ? "fade_in" : ""}`}>
      <ThemeProvider theme={theme}>
        <ChatBot
          steps={steps}
          width={"60vw"}
          height={"60vh"}
          headerTitle={"AIMDb"}
          botAvatar={humanoid_icon}
        />
      </ThemeProvider>
    </main>
  );
}

export default Chatbot;

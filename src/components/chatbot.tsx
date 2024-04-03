import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import humanoid_icon from "../assets/humanoid_icon.svg";
import user_icon from "../assets/user_icon.svg";

import { useState, useEffect } from "react";

function GetName({ steps }: { steps: { name: { value: string } } }) {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(steps.name.value);
  }, [steps.name.value]);

  return (
    <p>{`I am the AI Movie Database main manager, the one and only manager in fact, and I have a little problem. Would you like to help me, ${name}?`}</p>
  );
}

function Chatbot() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const steps = [
    {
      id: "welcome",
      message: "Welcome to AIMDb! My name is cyberLingua_language_model_v1.pth",
      trigger: "bob",
    },
    {
      id: "bob",
      message: "Umm, sorry! My name is Bob! What is your name?",
      trigger: "name",
    },
    {
      id: "name",
      user: true,
      trigger: "username",
      validator: (value: string) => {
        value = value.trim();

        if (value === "" || value.length > 15) {
          return "Enter your name! Keep it under 15 letters!";
        }

        if (value.indexOf(" ") !== -1) {
          return "One word, please!";
        }

        if (!/^[a-zA-Z]+$/.test(value)) {
          return "No special characters allowed!";
        }

        return true;
      },
    },
    {
      id: "username",
      message: "Hi {previousValue}, nice to meet you!",
      trigger: "explanation",
    },
    {
      id: "explanation",
      component: <GetName />,
      asMessage: true,
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
    userBubbleColor: "#ffdb4d",
    userFontColor: "#333333",
  };

  return (
    <main className={`chatbot_container ${isVisible ? "fade_in" : ""}`}>
      <ThemeProvider theme={theme}>
        <ChatBot
          steps={steps}
          width={"60vw"}
          height={"60vh"}
          headerTitle={
            <>
              <span className="AI_color robotic_animation">AI</span>
              <span>MDb</span>
            </>
          }
          botAvatar={humanoid_icon}
          userAvatar={user_icon}
          botDelay={1700}
          userDelay={1200}
        />
      </ThemeProvider>
    </main>
  );
}

export default Chatbot;

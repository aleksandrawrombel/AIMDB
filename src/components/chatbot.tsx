import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import humanoid_icon from "../assets/humanoid_icon.svg";
import user_icon from "../assets/user_icon.svg";
import { randomMoviesArray } from "../assets/movies";

import { useState, useEffect } from "react";

function GetName({ steps }: { steps: { name: { value: string } } }) {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(steps.name.value);
  }, [steps.name.value]);

  return (
    <p>{`I am the AI Movie Database main manager, the one and only manager in fact. I have a little problem... Would you like to help me, ${name}?`}</p>
  );
}

interface AnswerCheckerProps {
  index: number;
  previousStep: { value: string };
}

function AnswerChecker({ index, previousStep }: AnswerCheckerProps) {
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const userAnswer = previousStep.value;
    const currentMovieAuthor = randomMoviesArray[index].author;

    if (userAnswer === currentMovieAuthor) {
      setIsCorrect(true);
    }
  }, [index, previousStep.value]);

  return (
    <>
      <p>{isCorrect ? "Yes, you are right! Let's keep going, I am so thrilled!" : "No, no, no! It's not correct, let's try another one!"}</p>
    </>
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
      message: "Hello {previousValue}, nice to meet you!",
      trigger: "explanation",
    },
    {
      id: "explanation",
      component: <GetName />,
      asMessage: true,
      trigger: "help",
    },
    {
      id: "help",
      options: [
        { value: "yes", label: "Of course!", trigger: "yes" },
        { value: "yes2", label: "Yes, I guess...", trigger: "yes2" },
      ],
    },
    {
      id: "yes",
      message: `Thank you! Thank you! Thank you! Let's do this!`,
      trigger: "explanation_help",
    },
    {
      id: "yes2",
      message: `Great, let's go!`,
      trigger: "explanation_help",
    },
    {
      id: "explanation_help",
      message:
        "I have some movie descriptions that I am having trouble with. Are those movies written by humans or are they written by AI? Could you help me check? Here comes the first description! Is it a human movie or an AI movie?!",
      trigger: "firstMovie",
    },
    {
      id: "firstMovie",
      message: `${randomMoviesArray[0].description}`,
      delay: 6000,
      trigger: "firstAIOrHuman",
    },
    {
      id: "firstAIOrHuman",
      options: [
        { value: "AI", label: "AI", trigger: "firstAnswerChecker" },
        { value: "human", label: "Human", trigger: "firstAnswerChecker" },
      ],
    },
    {
      id: "firstAnswerChecker",
      component: <AnswerChecker index={0} />,
      asMessage: true,
      trigger: "secondMovie",
    },
    {
      id: "secondMovie",
      message: `${randomMoviesArray[1].description}`,
      delay: 6000,
      trigger: "secondAIOrHuman",
    },
    {
      id: "secondAIOrHuman",
      options: [
        { value: "AI", label: "AI", trigger: "secondAnswerChecker" },
        { value: "human", label: "Human", trigger: "secondAnswerChecker" },
      ],
    },
    {
      id: "secondAnswerChecker",
      component: <AnswerChecker index={1} />,
      asMessage: true,
      trigger: "thirdMovie",
    },
    {
      id: "thirdMovie",
      message: `${randomMoviesArray[2].description}`,
      delay: 6000,
      trigger: "thirdAIOrHuman",
    },
    {
      id: "thirdAIOrHuman",
      options: [
        { value: "AI", label: "AI", trigger: "thirdanswerChecker" },
        { value: "human", label: "Human", trigger: "thirdanswerChecker" },
      ],
    },
    {
      id: "thirdanswerChecker",
      component: <AnswerChecker index={2} />,
      asMessage: true,
      end: true,
    },
  ];

  const theme = {
    background: "#f5f8fb",
    fontFamily: "Helvetica Neue",
    headerBgColor: "#333333",
    headerFontColor: "#ffffff",
    headerFontSize: "1.5rem",
    botBubbleColor: "#333333",
    botFontColor: "#ffffff",
    userBubbleColor: "#ffdb4d",
    userFontColor: "#333333",
  };

  const bubbleOptionStyle = {
    backgroundColor: "rgba(255, 219, 77, 0.6)",
    color: "#333333",
  };

  return (
    <main className={`chatbot_container ${isVisible ? "fade_in" : ""}`}>
      <ThemeProvider theme={theme}>
        <ChatBot
          className="chatbot"
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
          botDelay={2500}
          userDelay={10}
          bubbleOptionStyle={bubbleOptionStyle}
        />
      </ThemeProvider>
    </main>
  );
}

export default Chatbot;

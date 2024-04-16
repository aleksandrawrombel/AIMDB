import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import humanoid_icon from "../assets/humanoid_icon.svg";
import user_icon from "../assets/user_icon.svg";
import {
  randomMoviesArray,
  generateApiMovies,
} from "./movies";

import { useState, useEffect } from "react";

function GetName({ steps }: { steps: { name: { value: string } } }) {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(steps.name.value);
  }, [steps.name.value]);

  return (
    <p>{`I am the AI Movie Database manager, the only manager and most important manager in fact. I have a little problem... Would you like to help me, ${name}?`}</p>
  );
}

interface AnswerCheckerProps {
  index: number;
  previousStep: { value: string };
}

function AnswerChecker({ index, previousStep }: AnswerCheckerProps) {
  const [isCorrectAI, setIsCorrectAI] = useState(false);
  const [isCorrectHuman, setIsCorrectHuman] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);

  const humanCorrectAnswers = [
    `That's right, this one came out of the human brain!`,
    `You are correct, this one was written by a human!`,
    `You are right! This one, well... That's on humans!`,
    `Yes, exactly! Crafted by the human mind! Incredible!`,
    `Yes, you are right! This is pure human imagination!`,
    `Yes, well done! A manifestation of human thought!`,
  ];

  const AICorrectAnswers = [
    `That's right, this one is written by AI! Incredible!`,
    `You are correct, artificial intelligence at it's best!`,
    `You are right! This one, well... That's on me, my friend!`,
    `Yes, exactly! Crafted by the AI power! Incredible!`,
    `Yes, you are right! This is pure AI imagination!`,
    `Yes, well done! A manifestation of mechanical thought!`,
  ];

  useEffect(() => {
    const userAnswer = previousStep.value;
    const currentMovieAuthor = randomMoviesArray[index].author;

    if (userAnswer === "AI" && currentMovieAuthor === "AI") {
      setIsCorrectAI(true);
      setIsCorrectHuman(false);
      setIsIncorrect(false);
    } else if (userAnswer === "human" && currentMovieAuthor === "human") {
      setIsCorrectAI(false);
      setIsCorrectHuman(true);
      setIsIncorrect(false);
    } else {
      setIsCorrectAI(false);
      setIsCorrectHuman(false);
      setIsIncorrect(true);
    }
  }, [index, previousStep.value]);

  const currentMoviePoster = randomMoviesArray[index].poster;
  const currenMovieUrl = randomMoviesArray[index].url;

  return (
    <>
      {isCorrectAI && <p>{AICorrectAnswers[index]}</p>}
      {isCorrectHuman && (
        <>
          <p>{humanCorrectAnswers[index]}</p>
          <div className="movie_poster">
            <a href={currenMovieUrl} target="_blank" className="movie_link">
              <img src={currentMoviePoster} alt="movie_poster" />
            </a>
          </div>
        </>
      )}
      {isIncorrect && (
        <p>No, sorry, it's the other way around! Come on, check what's next!</p>
      )}
    </>
  );
}

function Chatbot() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    generateApiMovies();
  }, []);

  const steps = [
    {
      id: "welcome",
      message: "Welcome to AIMDb! My name is 01000010 01101111 01100010!",
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
      message: "Hello {previousValue}, pleasure to meet you!",
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
      message: `Thank you, my saviour! Let's do this!`,
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
        "I have some movie descriptions that I am having trouble with. Are those movies written by humans or are they written by AI? Please, help me categorize them!",
      trigger: "explanation_help2",
    },
    {
      id: "explanation_help2",
      message:
        "Here comes the first description! Is it a human movie or an AI movie?!",
      trigger: "firstMovie",
    },
    {
      id: "firstMovie",
      message: `${randomMoviesArray[0].description}`,
      delay: 8000,
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
      trigger: "secondOption",
    },
    {
      id: "secondOption",
      options: [
        {
          value: "secondOptionYes",
          label: "Show another one!",
          trigger: "secondMovie",
        },
      ],
    },
    {
      id: "secondMovie",
      message: `${randomMoviesArray[1].description}`,
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
      trigger: "thirdOption",
    },
    {
      id: "thirdOption",
      options: [
        {
          value: "thirdOptionYes",
          label: "Next, please!",
          trigger: "thirdMovie",
        },
      ],
    },
    {
      id: "thirdMovie",
      message: `${randomMoviesArray[2].description}`,
      trigger: "thirdAIOrHuman",
    },
    {
      id: "thirdAIOrHuman",
      options: [
        { value: "AI", label: "AI", trigger: "thirdAnswerChecker" },
        { value: "human", label: "Human", trigger: "thirdAnswerChecker" },
      ],
    },
    {
      id: "thirdAnswerChecker",
      component: <AnswerChecker index={2} />,
      asMessage: true,
      trigger: "fourthOption",
    },
    {
      id: "fourthOption",
      options: [
        {
          value: "fourthOptionYes",
          label: "Let's see the next one!",
          trigger: "fourthMovie",
        },
      ],
    },
    {
      id: "fourthMovie",
      message: `${randomMoviesArray[3].description}`,
      trigger: "fourthAIOrHuman",
    },
    {
      id: "fourthAIOrHuman",
      options: [
        { value: "AI", label: "AI", trigger: "fourthAnswerChecker" },
        { value: "human", label: "Human", trigger: "fourthAnswerChecker" },
      ],
    },
    {
      id: "fourthAnswerChecker",
      component: <AnswerChecker index={3} />,
      asMessage: true,
      trigger: "fifthOption",
    },
    {
      id: "fifthOption",
      options: [
        {
          value: "fifthOptionYes",
          label: "Show another one!",
          trigger: "fifthMovie",
        },
      ],
    },
    {
      id: "fifthMovie",
      message: `${randomMoviesArray[4].description}`,
      trigger: "fifthAIOrHuman",
    },
    {
      id: "fifthAIOrHuman",
      options: [
        { value: "AI", label: "AI", trigger: "fifthAnswerChecker" },
        { value: "human", label: "Human", trigger: "fifthAnswerChecker" },
      ],
    },
    {
      id: "fifthAnswerChecker",
      component: <AnswerChecker index={4} />,
      asMessage: true,
      trigger: "sixthOption",
    },
    {
      id: "sixthOption",
      options: [
        { value: "sixthOptionYes", label: "Next!", trigger: "sixthMovie" },
      ],
    },
    {
      id: "sixthMovie",
      message: `${randomMoviesArray[5].description}`,
      trigger: "sixthAIOrHuman",
    },
    {
      id: "sixthAIOrHuman",
      options: [
        { value: "AI", label: "AI", trigger: "sixthAnswerChecker" },
        { value: "human", label: "Human", trigger: "sixthAnswerChecker" },
      ],
    },
    {
      id: "sixthAnswerChecker",
      component: <AnswerChecker index={5} />,
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
          width={"70vw"}
          height={"70vh"}
          headerTitle={
            <>
              <span className="AI_color robotic_animation">AI</span>
              <span>MDb</span>
            </>
          }
          botAvatar={humanoid_icon}
          userAvatar={user_icon}
          botDelay={3000}
          userDelay={10}
          bubbleOptionStyle={bubbleOptionStyle}
        />
      </ThemeProvider>
    </main>
  );
}

export default Chatbot;

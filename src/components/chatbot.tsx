import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

import humanoid_icon from "../assets/humanoid_icon.svg";
import user_icon from "../assets/user_icon.svg";
import { randomMoviesArray, generateApiMovies } from "./movies";

import { useState, useEffect } from "react";

function GetName({ steps }: { steps: { name: { value: string } } }) {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(steps.name.value);
  }, [steps.name.value]);

  return (
    <p>{`I am the AI Movie Database manager, the one and only manager in fact! I have a little problem... Would you like to help me, ${name}?`}</p>
  );
}

interface AnswerCheckerProps {
  index: number;
  previousStep: { value: string };
  joinedMoviesArray: Array<any>;
}

function AnswerChecker({
  index,
  previousStep,
  joinedMoviesArray,
}: AnswerCheckerProps) {
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

  const wrongAnswers = [
    `No, sorry, it's the other way around! Come on, check what's next!`,
    `Close, but no. Wrong answer!`,
    `Sorry, wrong answer! Keep going!`,
    `Incorrect, sorry! Good luck with the next one!`,
    `Wrong! Let's check the next one!`,
    `Well, you are incorrect... But good job nonetheless!`,
  ];

  useEffect(() => {
    const userAnswer = previousStep.value;
    const currentMovieAuthor = joinedMoviesArray[index].author;

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
  }, [index, previousStep.value, joinedMoviesArray]);

  const currentMoviePoster = joinedMoviesArray[index].poster;
  const currenMovieUrl = joinedMoviesArray[index].url;

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
      {isIncorrect && <p>{wrongAnswers[index]}</p>}
    </>
  );
}

function Chatbot() {
  const [isVisible, setIsVisible] = useState(false);

  interface AIMovie {
    author: string;
    description: string | null;
  }
  const [AIMovies, setAIMovies] = useState<AIMovie[]>([]);

  useEffect(() => {
    setIsVisible(true);

    async function fetchAIMovies() {
      const response = await generateApiMovies();
      setAIMovies(response);
    }
    // fetchAIMovies();
  }, []);

  if (AIMovies.length === 0) {
    return (
      <div className="loading">
        <span className="loader"></span>
      </div>
    );
  }

  const humanMoviesArrayCopy = [...randomMoviesArray];
  const AIMoviesArray = AIMovies;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const joinedMoviesArray = shuffleArray([
    ...humanMoviesArrayCopy,
    ...AIMoviesArray,
  ]);

  const steps = [
    {
      id: "welcome",
      message: "Welcome to AIMDb! What is your name?",
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
      message: `Awesome, let's go!`,
      trigger: "explanation_help",
    },
    {
      id: "explanation_help",
      message:
        "I have to categorize some movie descriptions, are those movies written by a human or by the AI? Are you ready to see the first description?",
      trigger: "ready",
    },
    {
      id: "ready",
      options: [
        {
          value: "user_ready",
          label: "I'm ready!",
          trigger: "here_we_go",
        },
      ],
    },
    {
      id: "here_we_go",
      message: "Here we go! Is it a human movie or an AI movie?!",
      trigger: "firstMovie",
    },
    {
      id: "firstMovie",
      message: `${joinedMoviesArray[0].description}`,
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
      component: (
        <AnswerChecker index={0} joinedMoviesArray={joinedMoviesArray} />
      ),
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
      message: `${joinedMoviesArray[1].description}`,
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
      component: (
        <AnswerChecker index={1} joinedMoviesArray={joinedMoviesArray} />
      ),
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
      message: `${joinedMoviesArray[2].description}`,
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
      component: (
        <AnswerChecker index={2} joinedMoviesArray={joinedMoviesArray} />
      ),
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
      message: `${joinedMoviesArray[3].description}`,
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
      component: (
        <AnswerChecker index={3} joinedMoviesArray={joinedMoviesArray} />
      ),
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
      message: `${joinedMoviesArray[4].description}`,
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
      component: (
        <AnswerChecker index={4} joinedMoviesArray={joinedMoviesArray} />
      ),
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
      message: `${joinedMoviesArray[5].description}`,
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
      component: (
        <AnswerChecker index={5} joinedMoviesArray={joinedMoviesArray} />
      ),
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

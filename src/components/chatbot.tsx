import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import GithubLogo from "./githubLogo";

import humanoid_icon from "../assets/humanoid_icon.svg";
import user_icon from "../assets/user_icon.svg";
import dance_1 from "../assets/AI_dance_1.gif";
import dance_2 from "../assets/AI_dance_2.gif";
import dance_3 from "../assets/AI_dance_3.gif";
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
  joinedMoviesArray: any[];
  checkedAnswer: (isCorrect: boolean) => void;
}

function AnswerChecker({
  index,
  previousStep,
  joinedMoviesArray,
  checkedAnswer,
}: AnswerCheckerProps) {
  const [isCorrectAI, setIsCorrectAI] = useState(false);
  const [isCorrectHuman, setIsCorrectHuman] = useState(false);
  const [isIncorrectAI, setIsIncorrectAI] = useState(false);
  const [isIncorrectHuman, setIsIncorrectHuman] = useState(false);

  const humanCorrectAnswers = [
    `That's right, this one came out of the human brain!`,
    `You are correct, this one was written by a human!`,
    `You are right! This one, well... That's on humans!`,
    `Yes, exactly! Crafted by the human mind! Incredible!`,
    `Yes, you are right! This is pure human imagination!`,
    `Yes, well done! A manifestation of human thought!`,
  ];

  const AICorrectAnswers = [
    `That's right, this one is written by AI! Incredible, right?!`,
    `You are correct, artificial intelligence at it's best!`,
    `You are right! This one... That's on me, my friend!`,
    `Yes, exactly! Crafted by the AI power! Incredible!`,
    `Yes, you are right! This is pure AI imagination!`,
    `Well done! A manifestation of mechanical thought!`,
  ];

  const AIDances = [dance_1, dance_2, dance_3, dance_1, dance_2, dance_3];

  const wrongAnswersAI = [
    `Sorry, wrong! It's actually a movie written by a human!`,
    `Well... wrong, this was written by humans actually!`,
    `Sorry, wrong answer! Not AI's work, it was a human!`,
    `Incorrect, sorry! Check out the poster! Incredible!`,
    `Wrong! Go on, you can do this! This one's on humans!`,
    `Well, you are incorrect... But good job nonetheless!`,
  ];

  const wrongAnswersHuman = [
    `Sorry, it's the other way around! Check what's next!`,
    `Well... close, but no. It's the wrong answer, sorry!`,
    `Sorry, wrong answer! Keep going!`,
    `Incorrect, sorry! Good luck with the next one!`,
    `Wrong! Let's check the next one!`,
    `Well, you are incorrect... But good job nonetheless!`,
  ];

  useEffect(() => {
    const userAnswer = previousStep.value;
    const currentMovieAuthor = joinedMoviesArray[index].author;

    let isCorrect = false;

    if (userAnswer === "AI" && currentMovieAuthor === "AI") {
      setIsCorrectAI(true);
      setIsCorrectHuman(false);
      setIsIncorrectAI(false);
      setIsIncorrectHuman(false);

      isCorrect = true;
    } else if (userAnswer === "human" && currentMovieAuthor === "human") {
      setIsCorrectAI(false);
      setIsCorrectHuman(true);
      setIsIncorrectAI(false);
      setIsIncorrectHuman(false);

      isCorrect = true;
    } else if (userAnswer === "human" && currentMovieAuthor === "AI") {
      setIsCorrectAI(false);
      setIsCorrectHuman(false);
      setIsIncorrectAI(false);
      setIsIncorrectHuman(true);
    } else if (userAnswer === "AI" && currentMovieAuthor === "human") {
      setIsCorrectAI(false);
      setIsCorrectHuman(false);
      setIsIncorrectAI(true);
      setIsIncorrectHuman(false);
    }

    checkedAnswer(isCorrect);
  }, [index, previousStep.value, joinedMoviesArray, checkedAnswer]);

  const currentMoviePoster = joinedMoviesArray[index].poster;
  const currenMovieUrl = joinedMoviesArray[index].url;
  const currentAIDance = AIDances[index];

  return (
    <>
      {isCorrectAI && (
        <>
          <p>{AICorrectAnswers[index]}</p>
          <div className="AI_dance">
            <a href={currentAIDance}>
              <img src={currentAIDance} alt="Boston_Dynamics_robots_dancing" />
            </a>
          </div>
        </>
      )}
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
      {isIncorrectAI && (
        <>
          <p>{wrongAnswersAI[index]}</p>
          <div className="movie_poster">
            <a href={currenMovieUrl} target="_blank" className="movie_link">
              <img src={currentMoviePoster} alt="movie_poster" />
            </a>
          </div>
        </>
      )}
      {isIncorrectHuman && <p>{wrongAnswersHuman[index]}</p>}
    </>
  );
}

function Chatbot() {
  const [isVisible, setIsVisible] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);

  interface AIMovie {
    author: string;
    description: string | null;
  }
  const [AIMovies, setAIMovies] = useState<AIMovie[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsVisible(true);
    let timer;

    async function fetchAIMovies() {
      try {
        const response = await generateApiMovies();
        setAIMovies(response);
      } catch (error) {
        setError("Something went wrong! Refresh the page!");
      }
    }

    timer = setTimeout(() => {
      setError("Something went wrong! Refresh the page!");
    }, 15_000);

    fetchAIMovies();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  function updateScore(isCorrect: boolean) {
    if (isCorrect) {
      setScoreCount((prev) => prev + 1);
    }
  }

  if (AIMovies.length === 0) {
    return (
      <div className="loading">
        <div className="loader_container">
          <span className="loader"></span>
          {error && <p className="loading_error">{error}</p>}
        </div>
      </div>
    );
  }

  const humanMoviesArrayCopy = [...randomMoviesArray];
  const AIMoviesArray = AIMovies;

  function shuffleArray(array: any) {
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
      placeholder: "Type the message...",
    },
    {
      id: "name",
      placeholder: "Type your name...",
      user: true,
      trigger: "username",
      validator: (value: string) => {
        value = value.trim();

        if (value === "" || value.length > 15) {
          return "Enter your name!";
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
      placeholder: "Choose your answer...",
    },
    {
      id: "explanation",
      // @ts-expect-error react simple chatbot specification
      component: <GetName />,
      asMessage: true,
      trigger: "help",
      placeholder: "Choose your answer...",
    },
    {
      id: "help",
      options: [
        { value: "yes", label: "Of course!", trigger: "yes" },
        { value: "yes2", label: "Yes, I guess...", trigger: "yes2" },
      ],
      placeholder: "Choose your answer...",
    },
    {
      id: "yes",
      message: `Thank you, my saviour! Let's do this!`,
      trigger: "explanationHelp",
      placeholder: "Choose your answer...",
    },
    {
      id: "yes2",
      message: `Awesome, let's go!`,
      trigger: "explanationHelp",
      placeholder: "Choose your answer...",
    },
    {
      id: "explanationHelp",
      message:
        "I have to categorize some movie descriptions, are those movies written by a human or by the AI? Are you ready to see the first description?",
      trigger: "ready",
      placeholder: "Choose your answer...",
    },
    {
      id: "ready",
      options: [
        {
          value: "userReady",
          label: "I'm ready!",
          trigger: "hereWeGo",
        },
      ],
      placeholder: "Choose your answer...",
    },
    {
      id: "hereWeGo",
      message: "Here we go! Is it a human movie or an AI movie?!",
      trigger: "firstMovie",
      placeholder: "Choose your answer...",
    },
    {
      id: "firstMovie",
      message: `${joinedMoviesArray[0].description}`,
      trigger: "firstAIOrHuman",
      placeholder: "Choose your answer...",
    },
    {
      id: "firstAIOrHuman",
      options: [
        { value: "AI", label: "AI", trigger: "firstAnswerChecker" },
        { value: "human", label: "Human", trigger: "firstAnswerChecker" },
      ],
      placeholder: "Choose your answer...",
    },
    {
      id: "firstAnswerChecker",
      component: (
        // @ts-expect-error react simple chatbot specification
        <AnswerChecker
          index={0}
          joinedMoviesArray={joinedMoviesArray}
          checkedAnswer={updateScore}
        />
      ),
      asMessage: true,
      trigger: "secondOption",
      placeholder: "Choose your answer...",
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
      placeholder: "Choose your answer...",
    },
    {
      id: "secondMovie",
      message: `${joinedMoviesArray[1].description}`,
      trigger: "secondAIOrHuman",
      placeholder: "Choose your answer...",
    },
    {
      id: "secondAIOrHuman",
      options: [
        { value: "AI", label: "AI", trigger: "secondAnswerChecker" },
        { value: "human", label: "Human", trigger: "secondAnswerChecker" },
      ],
      placeholder: "Choose your answer...",
    },
    {
      id: "secondAnswerChecker",
      component: (
        // @ts-expect-error react simple chatbot specification
        <AnswerChecker
          index={1}
          joinedMoviesArray={joinedMoviesArray}
          checkedAnswer={updateScore}
        />
      ),
      asMessage: true,
      trigger: "thirdOption",
      placeholder: "Choose your answer...",
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
      placeholder: "Choose your answer...",
    },
    {
      id: "thirdMovie",
      message: `${joinedMoviesArray[2].description}`,
      trigger: "thirdAIOrHuman",
      placeholder: "Choose your answer...",
    },
    {
      id: "thirdAIOrHuman",
      options: [
        { value: "AI", label: "AI", trigger: "thirdAnswerChecker" },
        { value: "human", label: "Human", trigger: "thirdAnswerChecker" },
      ],
      placeholder: "Choose your answer...",
    },
    {
      id: "thirdAnswerChecker",
      component: (
        // @ts-expect-error react simple chatbot specification
        <AnswerChecker
          index={2}
          joinedMoviesArray={joinedMoviesArray}
          checkedAnswer={updateScore}
        />
      ),
      asMessage: true,
      trigger: "fourthOption",
      placeholder: "Choose your answer...",
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
      placeholder: "Choose your answer...",
    },
    {
      id: "fourthMovie",
      message: `${joinedMoviesArray[3].description}`,
      trigger: "fourthAIOrHuman",
      placeholder: "Choose your answer...",
    },
    {
      id: "fourthAIOrHuman",
      options: [
        { value: "AI", label: "AI", trigger: "fourthAnswerChecker" },
        { value: "human", label: "Human", trigger: "fourthAnswerChecker" },
      ],
      placeholder: "Choose your answer...",
    },
    {
      id: "fourthAnswerChecker",
      component: (
        // @ts-expect-error react simple chatbot specification
        <AnswerChecker
          index={3}
          joinedMoviesArray={joinedMoviesArray}
          checkedAnswer={updateScore}
        />
      ),
      asMessage: true,
      trigger: "fifthOption",
      placeholder: "Choose your answer...",
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
      placeholder: "Choose your answer...",
    },
    {
      id: "fifthMovie",
      message: `${joinedMoviesArray[4].description}`,
      trigger: "fifthAIOrHuman",
      placeholder: "Choose your answer...",
    },
    {
      id: "fifthAIOrHuman",
      options: [
        { value: "AI", label: "AI", trigger: "fifthAnswerChecker" },
        { value: "human", label: "Human", trigger: "fifthAnswerChecker" },
      ],
      placeholder: "Choose your answer...",
    },
    {
      id: "fifthAnswerChecker",
      component: (
        // @ts-expect-error react simple chatbot specification
        <AnswerChecker
          index={4}
          joinedMoviesArray={joinedMoviesArray}
          checkedAnswer={updateScore}
        />
      ),
      asMessage: true,
      trigger: "sixthOption",
      placeholder: "Choose your answer...",
    },
    {
      id: "sixthOption",
      options: [
        { value: "sixthOptionYes", label: "Next!", trigger: "sixthMovie" },
      ],
      placeholder: "Choose your answer...",
    },
    {
      id: "sixthMovie",
      message: `${joinedMoviesArray[5].description}`,
      trigger: "sixthAIOrHuman",
      placeholder: "Choose your answer...",
    },
    {
      id: "sixthAIOrHuman",
      options: [
        { value: "AI", label: "AI", trigger: "sixthAnswerChecker" },
        { value: "human", label: "Human", trigger: "sixthAnswerChecker" },
      ],
      placeholder: "Choose your answer...",
    },
    {
      id: "sixthAnswerChecker",
      component: (
        // @ts-expect-error react simple chatbot specification
        <AnswerChecker
          index={5}
          joinedMoviesArray={joinedMoviesArray}
          checkedAnswer={updateScore}
        />
      ),
      asMessage: true,
      trigger: "done",
      placeholder: "Choose your answer...",
    },
    {
      id: "done",
      message: `And we are done! Now I got it all well categorized! Thank you!`,
      trigger: "secondEnd",
      placeholder: "Choose your answer...",
    },
    {
      id: "secondEnd",
      message: `Feel free to restart our conversation!`,
      trigger: "thirdEnd",
      placeholder: "Choose your answer...",
    },
    {
      id: "thirdEnd",
      options: [
        {
          value: "restart",
          label: "I'd like to talk again!",
          trigger: "reloadAction",
        },
      ],
      placeholder: "Choose your answer...",
    },
    {
      id: "reloadAction",
      hideInput: true,
      message: "All set, see ya in a moment!",
      trigger: () => {
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        return "bye";
      },
    },
    {
      id: "bye",
      delay: 10000,
      component: <div className="closing"></div>,
      hideInput: true,
      avatar: false,
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
                <div className="wrapper">
                  <span className="AI_color robotic_animation">AI</span>
                  <span>MDb</span>
                </div>
                <span
                  className={scoreCount < 1 ? "score_hidden" : "score_counter"}
                >{`score: ${scoreCount}/6`}</span>
              </>
            }
            botAvatar={humanoid_icon}
            userAvatar={user_icon}
            botDelay={2500}
            userDelay={10}
            bubbleOptionStyle={bubbleOptionStyle}
          />
        </ThemeProvider>
        <GithubLogo />
      </main>
  );
}

export default Chatbot;

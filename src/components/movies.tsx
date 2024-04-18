import SoulMan from "../assets/movie_posters/SoulMan.png";
import FaceOff from "../assets/movie_posters/FaceOff.png";
import BabyGeniuses from "../assets/movie_posters/BabyGeniuses.png";
import AirBud from "../assets/movie_posters/AirBud.png";
import SnakesOnAPlane from "../assets/movie_posters/SnakesOnAPlane.png";
import HowardTheDuck from "../assets/movie_posters/HowardTheDuck.png";
import Ed from "../assets/movie_posters/Ed.png";
import AttackOfTheKillerTomatoes from "../assets/movie_posters/AttackOfTheKillerTomatoes.png";
import Ekusute from "../assets/movie_posters/Ekusute.png";
import KillerKlownsFromOuterSpace from "../assets/movie_posters/KillerKlownsFromOuterSpace.png";
import JoesApartment from "../assets/movie_posters/JoesApartment.png";
import JoeVersusTheVolcano from "../assets/movie_posters/JoeVersusTheVolcano.png";
import TheOddLifeOfTimothyGreen from "../assets/movie_posters/TheOddLifeOfTimothyGreen.png";
import Mannequin from "../assets/movie_posters/Mannequin.png";
import HellComesToFrogtown from "../assets/movie_posters/HellComesToFrogtown.png";
import TheHappening from "../assets/movie_posters/TheHappening.png";
import TheThingWithTwoHeads from "../assets/movie_posters/TheThingWithTwoHeads.png";
import SantasDog from "../assets/movie_posters/SantasDog.png";
import TheHolidayCalendar from "../assets/movie_posters/TheHolidayCalendar.png";
import SantaClausConquersTheMartians from "../assets/movie_posters/SantaClausConquersTheMartians.png";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY as string;

function generateApiMovies() {
  async function getDescriptions() {
    console.log("API req sent");
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `generate description with a fictional, ridiculous (but also quiet possible in real world) movie plot that contains human protagonists with names and is similar to real life human stories; and that will be 90 tokens long, no additional text, no title, just pure description`,
          },
        ],
        max_tokens: 500,
      }),
    };
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        options
      );
      const data = await response.json();
      const description = data.choices[0].message.content;
      if (data.choices[0].message.content) {

        return description;
      }
    } catch (error) {
      console.error(error);
    }
  }

  const AIMovie = {
    author: "AI",
  };

  async function saveResponses() {
    const responses = [];

    for (let i = 0; i < 3; i++) {
      const description = await getDescriptions();
      const responseObject = { ...AIMovie, description };
      responses.push(responseObject);
    }
    return responses;
  }
  return saveResponses();
}

interface Movie {
  id: number;
  title: string;
  year: number;
  description: string;
  author: string;
  poster: string;
  url: string;
}

function getRandomMovie(movies: Movie[]) {
  const moviesCopy = [...movies];
  const randomIndex = Math.floor(Math.random() * moviesCopy.length);
  const randomMovie = moviesCopy[randomIndex];

  return {
    id: randomMovie.id,
    description: randomMovie.description,
    author: randomMovie.author,
    year: randomMovie.year,
    poster: randomMovie.poster,
    url: randomMovie.url,
  };
}

const movies: Movie[] = [
  {
    id: 1,
    title: "Soul Man",
    year: 1986,
    description: `Mark, a California kid, faces reality when his millionaire father rejects funding his Harvard Law School dreams. He concocts a scheme, posing as a Black student for a scholarship. Navigating moral dilemmas, he delves into deception, probing privilege, identity, and societal boundaries along his journey.`,
    author: "human",
    poster: SoulMan,
    url: "https://www.imdb.com/title/tt0091991/?ref_=ext_shr_lnk",
  },

  {
    id: 2,
    title: "Face/Off",
    year: 1997,
    description: `When FBI Agent's son falls to criminal Troy, his world shatters. As Troy slips into coma, leaving a deadly threat, Agent faces a chilling dilemma. A radical surgery of "face swapping" offers a chance to assume Troy's identity and thwart his catastrophic plans. In a tense cat-and-mouse game, boundaries blur between hero and villain, in a pulse-pounding battle for survival.`,
    author: "human",
    poster: FaceOff,
    url: "https://www.imdb.com/title/tt0119094/?ref_=ext_shr_lnk",
  },

  {
    id: 3,
    title: "Baby Geniuses",
    year: 1999,
    description: `At BabyCo, Dr. Kinder and Dr. Heep unlock the mysteries of infant communication called "baby talk". Their groundbreaking research takes a turn when Sly, the mischievous prodigy among toddlers, stages a daring escape. Chaos erupts, threatening to unravel the scientists' work. A whimsical tale of intellect, innocence, and the power of imagination.`,
    author: "human",
    poster: BabyGeniuses,
    url: "https://www.imdb.com/title/tt0118665/?ref_=ext_shr_lnk",
  },

  {
    id: 4,
    title: "Air Bud",
    year: 1997,
    description: `In the town of Fernfield, a bond forms between 12-year-old Josh and Buddy, a remarkable golden retriever with a talent for basketball. Josh and Buddy embark on a heartwarming journey of friendship and redemption, but their partnership is tested when Buddy's past resurfaces in the form of a greedy former owner. Josh must summon courage and resilience to protect his beloved companion and preserve their unbreakable bond.`,
    author: "human",
    poster: AirBud,
    url: "https://www.imdb.com/title/tt0118570/?ref_=ext_shr_lnk",
  },

  {
    id: 5,
    title: "Snakes on a Plane",
    year: 2006,
    description: `FBI Agent Flynn finds himself in a fight for survival at 30,000 feet. Boarding a fateful red-eye flight, Flynn escorts a crucial informant, unaware of the deadly cargo lurking in the cargo hold. As a diabolical plot unfolds, hundreds of venomous serpents are unleashed upon unsuspecting passengers. Flynn must navigate a perilous maze of slithering danger to save himself and those aboard.`,
    author: "human",
    poster: SnakesOnAPlane,
    url: "https://www.imdb.com/title/tt0417148/?ref_=ext_shr_lnk",
  },

  {
    id: 6,
    title: "Howard the Duck",
    year: 1986,
    description: `A routine scientific experiment catapults Howard from Duckworld to Earth, where he befriends a group of plucky youngsters. They embark on a mission to protect him from the clutches of greedy scientists and an intergalactic menace. When a malevolent force threatens to plunge both worlds into chaos, Howard and his newfound allies must summon courage to thwart the impending doom.`,
    author: "human",
    poster: HowardTheDuck,
    url: "https://www.imdb.com/title/tt0091225/?ref_=ext_shr_lnk",
  },

  {
    id: 7,
    title: "Ed",
    year: 1996,
    description: `When farm boy Jack lands a spot on the minor league Santa Rosa Rockets, he discovers that his ticket to success comes with an unexpected companion: Ed Sullivan, a baseball-loving chimpanzee. They forge an unbreakable bond that transcends species and stereotypes, but when adversity strikes and Ed's safety hangs in the balance, Jack must confront his fears and rally his team to save their unlikely mascot.`,
    author: "human",
    poster: Ed,
    url: "https://www.imdb.com/title/tt0116165/?ref_=ext_shr_lnk",
  },

  {
    id: 8,
    title: "Attack of the Killer Tomatoes!",
    year: 1978,
    description: `In a world where produce turns deadly, a crack team of specialists is assembled to combat a bizarre epidemic of killer tomatoes. The team embarks on a perilous mission to thwart the murderous fruits' rampage. With absurdity reaching new heights and danger lurking around every corner, they must rely on wit, ingenuity, and sheer determination to save humanity from the ultimate culinary catastrophe.`,
    author: "human",
    poster: AttackOfTheKillerTomatoes,
    url: "https://www.imdb.com/title/tt0080391/?ref_=ext_shr_lnk",
  },

  {
    id: 9,
    title: "Ekusute",
    year: 2007,
    description: `When a girl's mysterious death unveils a hair-raising secret, coroner Yamazaki finds himself in a chilling tale of terror and transformation. As the girl's hair continues to grow posthumously, it takes on a life of its own, wreaking havoc and terrorizing those who dare to possess it. In a race against time, Yamazaki must unravel the truth behind the lethal locks before it's too late.`,
    author: "human",
    poster: Ekusute,
    url: "https://www.imdb.com/title/tt0904049/?ref_=ext_shr_lnk",
  },

  {
    id: 10,
    title: "Killer Klowns from Outer Space",
    year: 1988,
    description: `A quaint town becomes the target of extraterrestrial invaders: killer clowns. Armed with sinister smiles and deadly gadgets, the otherworldly harlequins unleash havoc upon citizens. But as the town's youth rally to confront the alien menace, they face skepticism and disbelief from adults. With an ice cream truck as their only weapon, the young heroes embark on a daring mission to save their town.`,
    author: "human",
    poster: KillerKlownsFromOuterSpace,
    url: "https://www.imdb.com/title/tt0095444/?ref_=ext_shr_lnk",
  },

  {
    id: 11,
    title: "Joe's Apartment",
    year: 1996,
    description: `In New York City, aspiring artist Joe discovers that his dream apartment comes with an unexpected twist: 50,000 talking cockroaches as roommates. Initially repulsed, Joe soon finds common ground with his creepy companions, forging an unlikely alliance. As he navigates the ups and downs of city life alongside his insect cohorts, Joe discovers the true meaning of friendship, acceptance, and finding beauty in the most unexpected places.`,
    author: "human",
    poster: JoesApartment,
    url: "https://www.imdb.com/title/tt0116707/?ref_=ext_shr_lnk",
  },

  {
    id: 12,
    title: "Joe Versus the Volcano",
    year: 1990,
    description: `Diagnosed with a terminal illness, Joe embarks on a surreal odyssey that defies the bounds of fate and mortality. Offered a chance to live out his final days in luxury, Joe agrees to a daring pact: leaping into a live volcano on a remote island. In a whimsical tale of love, adventure, and self-discovery, Joe embraces the extraordinary and confronts his destiny with courage and grace.`,
    author: "human",
    poster: JoeVersusTheVolcano,
    url: "https://www.imdb.com/title/tt0099892/?ref_=ext_shr_lnk",
  },

  {
    id: 13,
    title: "The Odd Life of Timothy Green",
    year: 2012,
    description: `In the town of Stanleyville, Cindy and Jim Green's world is forever changed when a mysterious boy named Timothy appears in their lives. With leaves sprouting from his ankles, Timothy brings unexpected joy and wonder to the couple's lives. As Cindy and Jim navigate the complexities of raising a child unlike any other, they discover that family is defined not by blood, but by the bonds of love and acceptance that transcend the ordinary.`,
    author: "human",
    poster: TheOddLifeOfTimothyGreen,
    url: "https://www.imdb.com/title/tt1462769/?ref_=ext_shr_lnk",
  },

  {
    id: 14,
    title: "Mannequin",
    year: 1987,
    description: `Amidst the hustle and bustle of Prince and Company department store, artist Jonathan discovers his true muse: a beautiful mannequin named Emmy. To his astonishment, Jonathan soon learns that Emmy is a reincarnated ancient Egyptian princess with a zest for life and mischief. With love, laughter, and a touch of magic, Jonathan and Emmy defy the odds to prove that true beauty lies not in appearances but in the depths of the heart.`,
    author: "human",
    poster: Mannequin,
    url: "https://www.imdb.com/title/tt0093493/?ref_=ext_shr_lnk",
  },

  {
    id: 15,
    title: "Hell Comes to Frogtown",
    year: 1988,
    description: `In a dystopian future ruled by women, ex-convict 'Hell' is enlisted for a dangerous mission: rescuing fertile women from the clutches of mutant captors - humanoid frogs. With a lethal explosive tethered to his nether regions, Hell must navigate a perilous landscape of radiation, mutants, and treachery to complete his task.`,
    author: "human",
    poster: HellComesToFrogtown,
    url: "https://www.imdb.com/title/tt0093171/?ref_=ext_shr_lnk",
  },

  {
    id: 16,
    title: "The Happening",
    year: 2008,
    description: `When an inexplicable phenomenon plunges humanity into madness, Elliot and his companions find themselves at the mercy of a force beyond comprehension. As the nature itself turns against humanity, Elliot must navigate a world gone mad, where the only certainty is uncertainty. With theories abound but no explanations in sight, they embark on a desperate journey of survival.`,
    author: "human",
    poster: TheHappening,
    url: "https://www.imdb.com/title/tt0949731/?ref_=ext_shr_lnk",
  },

  {
    id: 17,
    title: "The Thing with Two Heads",
    year: 1972,
    description: `In a twisted tale of medical malpractice and racial tension, a dying racist plots a sinister scheme: transplanting his head onto the body of a black man. As doctors scramble to carry out the radical procedure, the consequences of their actions may prove more horrifying than anyone could have imagined.`,
    author: "human",
    poster: TheThingWithTwoHeads,
    url: "https://www.imdb.com/title/tt0069372/?ref_=ext_shr_lnk",
  },

  {
    id: 18,
    title: "Santa's Dog",
    year: 1972,
    description: `In a heartwarming holiday tale of friendship and magic, 12-year-old Max embarks on an adventure with a talking dog named Hercules to save Christmas. Max and Hercules journey to the North Pole to plead their case before Santa himself, along the way, they encounter a cast of colorful characters, from cheerful elves to grumpy snowmen, as they race against time to restore joy and wonder to the world.`,
    author: "human",
    poster: SantasDog,
    url: "https://www.imdb.com/title/tt2048854/?ref_=ext_shr_lnk",
  },

  {
    id: 19,
    title: "The Holiday Calendar",
    year: 2018,
    description: `When Abby inherits a magical advent calendar, her life takes an unexpected turn as its contents seem to predict the future. The enchanted calendar becomes a guiding light in her journey of self-discovery. With each passing day, Abby learns that sometimes the greatest gifts come not from the calendar itself but from the experiences and connections forged along the way.`,
    author: "human",
    poster: TheHolidayCalendar,
    url: "https://www.imdb.com/title/tt8262802/?ref_=ext_shr_lnk",
  },

  {
    id: 20,
    title: "Santa Claus Conquers the Martians",
    year: 1964,
    description: `In a far-out adventure, Martians embark on a mission to Earth with a singular goal: kidnapping Santa Claus. Concerned that their children have become too enamored with Earthly television shows, the Martians seek to bring the joy of Christmas to their desolate planet. With laughs, love, and a healthy dose of Christmas magic, Santa Claus and his newfound friends embark on an intergalactic odyssey that proves that the spirit of the season knows no bounds.`,
    author: "human",
    poster: SantaClausConquersTheMartians,
    url: "https://www.imdb.com/title/tt0058548/?ref_=ext_shr_lnk",
  },
];

type RandomMovie = {
  id: number;
  description: string;
  author: string;
  year: number;
  poster: string;
  url: string;
};

const randomMoviesArray: RandomMovie[] = [];

function createRandomMoviesArray() {
  while (randomMoviesArray.length < 3) {
    const selectedMovie = getRandomMovie(movies);
    let isUnique = true;
    for (const movie of randomMoviesArray) {
      if (movie.id === selectedMovie.id) {
        isUnique = false;
        break;
      }
    }
    if (isUnique) randomMoviesArray.push(selectedMovie);
  }
  return randomMoviesArray;
}
createRandomMoviesArray();

export { generateApiMovies, randomMoviesArray };

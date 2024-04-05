import SoulMan from "./movie_posters/SoulMan.png";
import FaceOff from "./movie_posters/FaceOff.png";
import BabyGeniuses from "./movie_posters/BabyGeniuses.png";
import AirBud from "./movie_posters/AirBud.png";
import SnakesOnAPlane from "./movie_posters/SnakesOnAPlane.png";
import HowardTheDuck from "./movie_posters/HowardTheDuck.png";
import Ed from "./movie_posters/Ed.png";
import AttackOfTheKillerTomatoes from "./movie_posters/AttackOfTheKillerTomatoes.png";
import Ekusute from "./movie_posters/Ekusute.png";
import KillerKlownsFromOuterSpace from "./movie_posters/KillerKlownsFromOuterSpace.png";
import JoesApartment from "./movie_posters/JoesApartment.png";
import JoeVersusTheVolcano from "./movie_posters/JoeVersusTheVolcano.png";
import TheOddLifeOfTimothyGreen from "./movie_posters/TheOddLifeOfTimothyGreen.png";
import Mannequin from "./movie_posters/Mannequin.png";
import HellComesToFrogtown from "./movie_posters/HellComesToFrogtown.png";
import TheHappening from "./movie_posters/TheHappening.png";
import TheThingWithTwoHeads from "./movie_posters/TheThingWithTwoHeads.png";
import SantasDog from "./movie_posters/SantasDog.png";
import TheHolidayCalendar from "./movie_posters/TheHolidayCalendar.png";
import SantaClausConquersTheMartians from "./movie_posters/SantaClausConquersTheMartians.png";

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
    description: `Mark, a carefree California kid, faces a crushing reality when his millionaire father refuses to fund his Harvard Law School dreams. Desperate, Mark concocts a wild scheme: posing as an African-American student to secure a scholarship meant for minorities. With tanning pills and a curly perm, he dives into a world of deception. But as he navigates the moral and legal implications of his actions, Mark's journey becomes a poignant exploration of privilege, identity, and the consequences of crossing societal boundaries.`,
    author: "human",
    poster: SoulMan,
    url: "https://www.imdb.com/title/tt0091991/?ref_=ext_shr_lnk",
  },

  {
    id: 2,
    title: "Face/Off",
    year: 1997,
    description: `FBI Agent's world shatters when his son falls victim to criminal mastermind Troy. Fuelled by grief and vengeance, Agent embarks on a relentless pursuit. But when criminal slips into a coma, leaving behind a deadly threat, Agent faces a chilling dilemma. A radical surgical procedure offers a chance to assume Troy's identity and thwart his catastrophic plans. As Agent and Troy engage in a harrowing game of cat and mouse, the lines blur between hero and villain, reality and illusion, in a pulse-pounding battle for survival.`,
    author: "human",
    poster: FaceOff,
    url: "https://www.imdb.com/title/tt0119094/?ref_=ext_shr_lnk",
  },

  {
    id: 3,
    title: "Baby Geniuses",
    year: 1999,
    description: `Within the secretive confines of BabyCo, Dr. Kinder and Dr. Heep unlock the mysteries of infant communication, delving into the enigmatic realm of "baby talk." But their groundbreaking research takes a perilous turn when Sly, the mischievous prodigy among toddlers, stages a daring escape. With Sly rallying his pint-sized comrades to break free from captivity, chaos erupts, threatening to unravel the scientists' work. As Dr. Kinder and Dr. Heep race against time to reclaim their prized subject, they confront ethical dilemmas and unexpected alliances in a whimsical tale of intellect, innocence, and the power of imagination.`,
    author: "human",
    poster: BabyGeniuses,
    url: "https://www.imdb.com/title/tt0118665/?ref_=ext_shr_lnk",
  },

  {
    id: 4,
    title: "Air Bud",
    year: 1997,
    description: `In the tranquil town of Fernfield, a bond forms between 12-year-old Josh and Buddy, a remarkable golden retriever with a talent for basketball. United by shared loss and a love for the game, Josh and Buddy embark on a heartwarming journey of friendship and redemption. But their idyllic partnership is tested when Buddy's past resurfaces in the form of a greedy former owner, threatening to tear them apart. With the stakes higher than ever, Josh must summon courage and resilience to protect his beloved companion and preserve their unbreakable bond.`,
    author: "human",
    poster: AirBud,
    url: "https://www.imdb.com/title/tt0118570/?ref_=ext_shr_lnk",
  },

  {
    id: 5,
    title: "Snakes on a Plane",
    year: 2006,
    description: `When witness protection collides with airborne terror, FBI Agent Neville Flynn finds himself in a fight for survival at 30,000 feet. Boarding a fateful red-eye flight, Flynn escorts a crucial informant, unaware of the deadly cargo lurking in the cargo hold. As a diabolical plot unfolds, hundreds of venomous serpents are unleashed upon unsuspecting passengers, transforming the journey into a harrowing battle for life and death. Amidst panic and chaos, Flynn must navigate a perilous maze of slithering danger to save himself and those aboard.`,
    author: "human",
    poster: SnakesOnAPlane,
    url: "https://www.imdb.com/title/tt0417148/?ref_=ext_shr_lnk",
  },

  {
    id: 6,
    title: "Howard the Duck",
    year: 1986,
    description: `A routine scientific experiment catapults cigar-smoking drake Howard from Duckworld to Earth, igniting a whimsical adventure that defies the laws of space and time. As Howard befriends a group of plucky youngsters, they embark on a mission to protect him from the clutches of greedy scientists and an intergalactic menace. But when a malevolent force threatens to plunge both worlds into chaos, Howard and his newfound allies must summon courage and ingenuity to thwart the impending doom. It's a quirky tale of friendship, heroism, and the boundless wonders of the cosmos.`,
    author: "human",
    poster: HowardTheDuck,
    url: "https://www.imdb.com/title/tt0091225/?ref_=ext_shr_lnk",
  },

  {
    id: 7,
    title: "Ed",
    year: 1996,
    description: `When farm boy Jack lands a spot on the minor league Santa Rosa Rockets, he discovers that his ticket to success comes with an unexpected companion: Ed Sullivan, a baseball-loving chimpanzee with a rocket arm and a mischievous streak. As Jack and Ed navigate the ups and downs of life on the diamond, they forge an unbreakable bond that transcends species and stereotypes. But when adversity strikes and Ed's safety hangs in the balance, Jack must confront his fears and rally his team to save their unlikely mascot. It's a heartwarming tale of teamwork, acceptance, and the power of friendship.`,
    author: "human",
    poster: Ed,
    url: "https://www.imdb.com/title/tt0116165/?ref_=ext_shr_lnk",
  },

  {
    id: 8,
    title: "Attack of the Killer Tomatoes!",
    year: 1978,
    description: `In a world where produce turns deadly, a crack team of specialists is assembled to combat a bizarre epidemic of killer tomatoes. Led by a quirky cast of characters, including a parachute-toting lieutenant and a master of disguise, the team embarks on a perilous mission to thwart the murderous fruits' rampage. With absurdity reaching new heights and danger lurking around every corner, they must rely on wit, ingenuity, and sheer determination to save humanity from the ultimate culinary catastrophe.`,
    author: "human",
    poster: AttackOfTheKillerTomatoes,
    url: "https://www.imdb.com/title/tt0080391/?ref_=ext_shr_lnk",
  },

  {
    id: 9,
    title: "Ekusute",
    year: 2007,
    description: `When a girl's mysterious death unveils a hair-raising secret, coroner Yamazaki finds himself ensnared in a chilling tale of terror and transformation. As the girl's hair continues to grow posthumously, Yamazaki discovers its deadly potential, leading to a series of hair-raising encounters with unsuspecting victims. With each extension sold as hair extensions ('exte'), the hair takes on a life of its own, wreaking havoc and terrorizing those who dare to possess it. In a race against time, Yamazaki must unravel the truth behind the lethal locks before it's too late.`,
    author: "human",
    poster: Ekusute,
    url: "https://www.imdb.com/title/tt0904049/?ref_=ext_shr_lnk",
  },

  {
    id: 10,
    title: "Killer Klowns from Outer Space",
    year: 1988,
    description: `When a quaint town becomes the target of extraterrestrial invaders, chaos descends in the most bizarre and terrifying form: killer clowns. Armed with sinister smiles and deadly gadgets, the otherworldly harlequins unleash havoc upon unsuspecting citizens. But as the town's youth rally to confront the alien menace, they face skepticism and disbelief from skeptical adults. With an ice cream truck as their only weapon, the young heroes embark on a daring mission to save their town from a fate worse than clowning around.`,
    author: "human",
    poster: KillerKlownsFromOuterSpace,
    url: "https://www.imdb.com/title/tt0095444/?ref_=ext_shr_lnk",
  },

  {
    id: 11,
    title: "Joe's Apartment",
    year: 1996,
    description: `In the concrete jungle of New York City, aspiring artist Joe discovers that his dream apartment comes with an unexpected twist: 50,000 talking cockroaches as roommates. Initially repulsed, Joe soon finds common ground with his creepy companions, forging an unlikely alliance that challenges societal norms and his own preconceptions. As he navigates the ups and downs of city life alongside his insect cohorts, Joe discovers the true meaning of friendship, acceptance, and finding beauty in the most unexpected places.`,
    author: "human",
    poster: JoesApartment,
    url: "https://www.imdb.com/title/tt0116707/?ref_=ext_shr_lnk",
  },

  {
    id: 12,
    title: "Joe Versus the Volcano",
    year: 1990,
    description: `When diagnosed with a terminal illness, Joe embarks on a surreal odyssey that defies the bounds of fate and mortality. Offered a chance to live out his final days in luxury, Joe agrees to a daring pact: leaping into a live volcano on a remote island. But as he journeys from the bustling streets of New York City to the tranquil seas aboard a yacht, Joe encounters a cast of colorful characters who challenge his perceptions and redefine his understanding of life and death. In a whimsical tale of love, adventure, and self-discovery, Joe embraces the extraordinary and confronts his destiny with courage and grace.`,
    author: "human",
    poster: JoeVersusTheVolcano,
    url: "https://www.imdb.com/title/tt0099892/?ref_=ext_shr_lnk",
  },

  {
    id: 13,
    title: "The Odd Life of Timothy Green",
    year: 2012,
    description: `In the picturesque town of Stanleyville, Cindy and Jim Green's world is forever changed when a mysterious boy named Timothy appears in their lives. With leaves sprouting from his ankles and an enigmatic past, Timothy brings unexpected joy and wonder to the couple's lives, teaching them profound lessons about parenthood, love, and the beauty of imperfection. As Cindy and Jim navigate the complexities of raising a child unlike any other, they discover that family is defined not by blood, but by the bonds of love and acceptance that transcend the ordinary.`,
    author: "human",
    poster: TheOddLifeOfTimothyGreen,
    url: "https://www.imdb.com/title/tt1462769/?ref_=ext_shr_lnk",
  },

  {
    id: 14,
    title: "Mannequin",
    year: 1987,
    description: `Amidst the hustle and bustle of Prince and Company department store, down-on-his-luck artist Jonathan discovers his true muse: a beautiful mannequin named Emmy. To his astonishment, Jonathan soon learns that Emmy is no ordinary figure but a reincarnated ancient Egyptian princess with a zest for life and mischief. As Jonathan and Emmy embark on a whirlwind romance, they must navigate the cutthroat world of retail and fend off rivals determined to sabotage their happiness. With love, laughter, and a touch of magic, Jonathan and Emmy defy the odds to prove that true beauty lies not in appearances but in the depths of the heart.`,
    author: "human",
    poster: Mannequin,
    url: "https://www.imdb.com/title/tt0093493/?ref_=ext_shr_lnk",
  },

  {
    id: 15,
    title: "Hell Comes to Frogtown",
    year: 1988,
    description: `In a dystopian future ruled by women, ex-convict 'Hell' is enlisted for a dangerous mission: rescuing fertile women from the clutches of mutant captors. With a lethal explosive tethered to his nether regions, Hell must navigate a perilous landscape of radiation, mutants, and treachery to complete his task. But as he delves deeper into the heart of darkness, Hell discovers that salvation may lie not in violence but in the power of redemption and the bonds of humanity that endure even in the face of extinction.`,
    author: "human",
    poster: HellComesToFrogtown,
    url: "https://www.imdb.com/title/tt0093171/?ref_=ext_shr_lnk",
  },

  {
    id: 16,
    title: "The Happening",
    year: 2008,
    description: `When an inexplicable phenomenon plunges humanity into madness, high school science teacher Elliot and his companions find themselves at the mercy of a force beyond comprehension. As the fabric of society unravels and nature itself turns against humanity, Elliot, his wife Alma, and young Jess must navigate a world gone mad, where the only certainty is uncertainty. With theories abound but no explanations in sight, they embark on a desperate journey of survival, grappling with fear, despair, and the terrifying realization that sometimes the greatest threat lies not in the unknown but within ourselves.`,
    author: "human",
    poster: TheHappening,
    url: "https://www.imdb.com/title/tt0949731/?ref_=ext_shr_lnk",
  },

  {
    id: 17,
    title: "The Thing with Two Heads",
    year: 1972,
    description: `In a twisted tale of medical malpractice and racial tension, a dying racist plots a sinister scheme: transplanting his head onto the body of a black man. As doctors scramble to carry out the radical procedure, the stage is set for a macabre showdown of identity, morality, and the limits of scientific ethics. With tensions mounting and time running out, the consequences of their actions may prove more horrifying than anyone could have imagined.`,
    author: "human",
    poster: TheThingWithTwoHeads,
    url: "https://www.imdb.com/title/tt0069372/?ref_=ext_shr_lnk",
  },

  {
    id: 18,
    title: "Santa's Dog",
    year: 1972,
    description: `In a heartwarming holiday tale of friendship and magic, mischievous twelve-year-old Max embarks on a whimsical adventure with a talking dog named Hercules to save Christmas. With the fate of the holiday season hanging in the balance, Max and Hercules journey to the North Pole to plead their case before Santa himself. Along the way, they encounter a cast of colorful characters, from cheerful elves to grumpy snowmen, as they race against time to restore joy and wonder to the world.`,
    author: "human",
    poster: SantasDog,
    url: "https://www.imdb.com/title/tt2048854/?ref_=ext_shr_lnk",
  },

  {
    id: 19,
    title: "The Holiday Calendar",
    year: 2018,
    description: `When struggling photographer Abby inherits a magical advent calendar, her life takes an unexpected turn as its contents seem to predict the future. As Abby navigates the ups and downs of love, friendship, and career, the enchanted calendar becomes a guiding light in her journey of self-discovery. With each passing day bringing new surprises and revelations, Abby learns that sometimes the greatest gifts come not from the calendar itself but from the experiences and connections forged along the way.`,
    author: "human",
    poster: TheHolidayCalendar,
    url: "https://www.imdb.com/title/tt8262802/?ref_=ext_shr_lnk",
  },

  {
    id: 20,
    title: "Santa Claus Conquers the Martians",
    year: 1964,
    description: `In a far-out adventure that spans the cosmos, Martians embark on a mission to Earth with a singular goal: kidnapping Santa Claus. Concerned that their children have become too enamored with Earthly television shows, the Martians seek to bring the joy of Christmas to their desolate planet. But when Santa and two plucky Earth children are abducted, a series of wacky hijinks ensue as they journey to Mars to spread holiday cheer. With laughs, love, and a healthy dose of Christmas magic, Santa Claus and his newfound friends embark on an intergalactic odyssey that proves that the spirit of the season knows no bounds.`,
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

while (randomMoviesArray.length < 6) {
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

export { randomMoviesArray };

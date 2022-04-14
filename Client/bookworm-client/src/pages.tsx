import React from "react";
import Home from "./components/HomeComponent";
import { BookData, ReviewData } from "./interfaces";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import BookDetail from "./components/BookDetailComponent";
import { Box, Container, Flex, Icon, Text } from "@chakra-ui/react";
import BookReviews from "./components/BookReviewsComponent";
import Auth from "./components/AuthComponent";
import { isAuthenticated } from "./services/AuthenticationService";
import { BsExclamationCircle } from "react-icons/bs";

const mockBookData: BookData[] = [
  {
    title: "Journey through Genius: The Great Theorems of Mathematics",
    image: "https://images.isbndb.com/covers/73/91/9780140147391.jpg",
    date_published: "1991",
    publisher: "Penguin Books",
    synopsis:
      "<p>Like masterpieces of art, music, and literature, great mathematical theorems are creative milestones, works of genius destined to last forever. Now William Dunham gives them the attention they deserve.</p><p>Dunham places each theorem within its historical context and explores the very human and often turbulent life of the creator - from Archimedes, the absentminded theoretician whose absorption in his work often precluded eating or bathing, to Gerolamo Cardano, the sixteenth-century mathematician whose accomplishments flourished despite a bizarre array of misadventures, to the paranoid genius of modern times, Georg Cantor. He also provides step-by-step proofs for the theorems, each easily accessible to readers with no more than a knowledge of high school mathematics.</p><p> A rare combination of the historical, biographical, and mathematical, <b>Journey Through Genius</b> is a fascinating introduction to a neglected field of human creativity.</p>",
    overview:
      "<p>Like masterpieces of art, music, and literature, great mathematical theorems are creative milestones, works of genius destined to last forever. Now William Dunham gives them the attention they deserve.</p><p>Dunham places each theorem within its historical context and explores the very human and often turbulent life of the creator - from Archimedes, the absentminded theoretician whose absorption in his work often precluded eating or bathing, to Gerolamo Cardano, the sixteenth-century mathematician whose accomplishments flourished despite a bizarre array of misadventures, to the paranoid genius of modern times, Georg Cantor. He also provides step-by-step proofs for the theorems, each easily accessible to readers with no more than a knowledge of high school mathematics.</p><p> A rare combination of the historical, biographical, and mathematical, <b>Journey Through Genius</b> is a fascinating introduction to a neglected field of human creativity.</p>",
    subjects: [
      "Mathematicians & Logicians - Biography",
      "History of Mathematics",
    ],
    authors: ["Dunham, William"],
    isbn13: "9780140147391",
    isbn: "014014739X",
    language: "en",
    pages: 320,
  },
  {
    title: "The Great Gatsby (A Scribner Classic)",
    image: "https://images.isbndb.com/covers/88/19/9780020198819.jpg",
    date_published: "1992",
    publisher: "Collier Books",
    synopsis:
      "The Great Gatsby Is A Novel By The American Author F. Scott Fitzgerald. First Published On April 10, 1925, It Is Set On Long Island's North Shore And In New York City During The Summer Of 1922. The Novel Chronicles An Era That Fitzgerald Himself Dubbed The Jazz Age. Following The Shock And Chaos Of World War I, American Society Enjoyed Unprecedented Levels Of Prosperity During The Roaring 1920s As The Economy Soared. At The Same Time, Prohibition, The Ban On The Sale And Manufacture Of Alcohol As Mandated By The Eighteenth Amendment, Made Millionaires Out Of Bootleggers And Led To An Increase In Organized Crime. Although Fitzgerald, Like Nick Carraway In His Novel, Idolized The Riches And Glamor Of The Age, He Was Uncomfortable With The Unrestrained Materialism And The Lack Of Morality That Went With It. Although It Was Adapted Into Both A Broadway Play And A Hollywood Film Within A Year Of Publication, It Was Not Popular Upon Initial Printing, Selling Fewer Than 25,000 Copies During The Remaining Fifteen Years Of Fitzgerald's Life. It Was Largely Forgotten During The Great Depression And World War Ii. After Its Republishing In 1945 And 1953, It Quickly Found A Wide Readership And Is Today Widely Regarded As A Paragon Of The Great American Novel. F. Scott Fitzgerald ; Preface And Notes By Matthew J. Bruccoli. The Authorized Text--p. 1 Of Cover. Includes Bibliographical References (p. 215-216).",
    subjects: [
      "Man-woman relationships",
      "Man-woman relationships--New York (State)--Long Island--Fiction",
      "Upper class",
      "Upper class--New York (State)--Long Island--Fiction",
      "PS3511.I9 G7 1992b",
      "813/.52",
    ],
    authors: ["F. Scott Fitzgerald"],
    isbn13: "9780020198819",
    isbn: "0020198817",
    language: "en",
    pages: 216,
  },
  {
    title:
      "The Startup Owner's Manual: The Step-By-Step Guide for Building a Great Company (DIATEINO)",
    image: "https://images.isbndb.com/covers/93/09/9780984999309.jpg",
    date_published: "2012",
    publisher: "K & S Ranch",
    synopsis:
      "The Startup Owner's Manual Is What It Says: A Comprehensive, Step-by-step Guide To Getting Startups Right. It Walks Entrepreneurs Through The Customer Development Process That Gets Them Out Of The Building, Where Customers Live, To Develop Winning Products Customers Will Buy-- More Than 100,000 Entrepreneurs Rely On This Book For Detailed, Step-by-step Instructions On Building Successful, Scalable, Profitable Startups. The National Science Foundation Pays Hundreds Of Startup Teams Each Year To Follow The Process Outlined In The Book, And It's Taught At Stanford, Berkeley, Columbia And More Than 100 Other Leading Universities Worldwide. Why? 'the Startup Owner's Manual' Guides You, Step-by-step, As You Put The Customer Development Process To Work. This Method Was Created By Renowned Silicon Valley Startup Expert Steve Blank, Acknowledged Catalyst Of The 'lean Startup' Movement, And Tested And Refined By Him For More Than A Decade-- Introduction. A Repeatable Path ; Why A Second Decade? ; The Four Steps: A New Path -- Getting Started. The Path To Disaster : A Startup Is Not A Small Version Of A Big Company ; The Path To The Epiphany : The Customer Development Model ; The Customer Development Manifesto -- Step One : Customer Discovery. An Introduction To Customer Discovery ; Customer Discovery, Phase One: State Your Business Model Hypotheses ; Customer Discovery, Phase Two : Get Out Of The Building To Test The Problem : Do People Care? ; Customer Discovery, Phase Three : Get Out Of The Building And Test The Product Solution ; Customer Discovery, Phase Four : Verify The Business Model And Pivot Or Proceed -- Step Two : Customer Validation. Introduction To Costumer Validation ; Customer Validation, Phase One : Get Ready To Sell ; Customer Validation, Phase Two : Get Out Of The Building And Sell! ; Customer Validation, Phase Three : Develop Product And Company Positioning ; Customer Validation, Phase Four : The Toughest Question Of All : Pivot Or Proceed? -- The Startup Owner's Manual Site Map -- Appendix A. Customer Development Checklists -- Appendix B. Glossary -- Appendix C. How To Build A Web Startup : A Simple Overview. Steve Blank And Bob Dorf. Includes Index.",
    subjects: [
      "New business enterprises",
      "Entrepreneurship",
      "HD62.5 .B53 2012",
      "658.1/1",
    ],
    authors: ["Blank, Steve", "Dorf, Bob"],
    isbn13: "9780984999309",
    isbn: "0984999302",
    language: "en",
    pages: 608,
  },
  {
    title:
      "What Great Principals Do Differently: Eighteen Things That Matter Most",
    image: "https://images.isbndb.com/covers/20/00/9781596672000.jpg",
    date_published: "2011",
    publisher: "Routledge",
    authors: ["Whitaker, Todd"],
    synopsis: "",
    isbn13: "9781596672000",
    isbn: "1596672005",
    language: "en",
    pages: 160,
  },
  {
    title:
      "Great Exhibits!: An Exhibit Planning and Construction Handbook for Small Museums",
    image: "https://images.isbndb.com/covers/07/63/9781442270763.jpg",
    date_published: "2017",
    publisher: "Rowman & Littlefield Publishers",
    synopsis:
      "Why Create An Exhibition? -- Who Will Create The Exhibition Ans When? -- What Will The Exhibition Be About? -- What Will People See? -- What Will We Tell Them? -- Will It Work? -- How Will Do It?. Beth Hansen. Includes Bibliographical References And Index.",
    subjects: [
      "Small museums--Exhibitions",
      "Small museums--Exhibitions--Handbooks, manuals, etc",
      "Museum exhibits--Design",
      "Museum exhibits--Design--Handbooks, manuals, etc",
      "Exhibit booths--Design and construction",
      "Exhibit booths--Design and construction--Handbooks, manuals, etc",
      "Museum techniques",
      "Museum techniques--Handbooks, manuals, etc",
      "AM151 .H36 2017",
      "069/.5",
    ],
    authors: ["Hansen, Beth"],
    isbn13: "9781442270763",
    isbn: "1442270764",
    language: "en",
    pages: 192,
  },
  {
    title:
      "Great Writing 1: Great Sentences for Great Paragraphs (Great Writing, New Edition)",
    image: "https://images.isbndb.com/covers/48/82/9781285194882.jpg",
    date_published: "2013",
    synopsis: "",
    publisher: "Heinle ELT",
    authors: [
      "Folse, Keith S.",
      "Muchmore-Vokoun, April",
      "Solomon, Elena Vestri",
    ],
    isbn13: "9781285194882",
    isbn: "1285194888",
    language: "en",
    pages: 288,
  },
  {
    title:
      "Good to Great and the Social Sectors: Why Business Thinking is Not the Answer",
    image: "https://images.isbndb.com/covers/64/02/9780977326402.jpg",
    date_published: "2005",
    publisher: "HarperCollins",
    synopsis:
      "Proposes Applying The Author's Business Strategies For Transforming Companies To Nonprofit And Public Organizations To Help Them Increase Efficiency And Most Benefit The Clients They Serve. Author's Note -- Good To Great And The Social Sectors: Why Business Thinking Is Not The Answer -- Summary Differences Between Business And Social Sectors Through The Good-to-great Framework -- Good-to-great Framework -- Concept Summary -- Notes -- About The Author. Jim Collins. Includes Bibliographical References (p. [36]).",
    overview:
      '<p>Building upon the concepts introduced in <b>Good to Great</b>, Jim Collins answers the most commonly asked questions raised by his readers in the social sectors. Using information gathered from interviews with over 100 social sector leaders, Jim Collins shows that his "Level 5 Leader" and other good-to-great principles can help social sector organizations make the leap to greatness.</p>',
    subjects: [
      "Leadership",
      "Executive ability",
      "Strategic planning",
      "Organizational change",
      "Technological innovations--Management",
      "Nonprofit organizations--Management",
      "Planning Techniques",
      "Organizational Innovation",
      "Technology--organization & administration",
      "Administrative Personnel",
      "HD57.7 .C6452 2005",
      "HD 57.7 C712gg 2005",
      "658",
    ],
    authors: ["Collins, Jim"],
    isbn13: "9780977326402",
    isbn: "0977326403",
    language: "en",
    pages: 35,
  },
  {
    title:
      "50 Great Myths of Popular Psychology: Shattering Widespread Misconceptions about Human Behavior",
    image: "https://images.isbndb.com/covers/11/24/9781405131124.jpg",
    date_published: "2009",
    publisher: "Wiley-Blackwell",
    synopsis:
      "Scott O. Lilienfeld ... [et Al.]. Includes Bibliographical References And Index.",
    overview:
      "<p><i>50 Great Myths of Popular Psychology</i> uses popular myths as a vehicle for helping students and laypersons to distinguish science from pseudoscience.</p>\n<ul>\n<li>Uses common myths as a vehicle for exploring how to distinguish factual from fictional claims in popular psychology</li>\n<li>Explores topics that readers will relate to, but often misunderstand, such as 'opposites attract', 'people use only 10% of their brains', and 'handwriting reveals your personality'</li>\n<li>Provides a 'mythbusting kit' for evaluating folk psychology claims in everyday life</li>\n<li>Teaches essential critical thinking skills through detailed discussions of each myth</li>\n<li>Includes over 200 additional psychological myths for readers to explore Contains an Appendix of useful Web Sites for examining psychological myths</li>\n<li>Features a postscript of remarkable psychological findings that sound like myths but that are true</li>\n<li>Engaging and accessible writing style that appeals to students and lay readers alike</li>\n</ul>",
    authors: [
      "Lilienfeld, Scott O.",
      "Lynn, Steven Jay",
      "Ruscio, John",
      "Beyerstein, Barry L.",
    ],
    isbn13: "9781405131124",
    isbn: "1405131128",
    language: "en",
    pages: 352,
  },
  {
    title: "The Great Adventure Catholic Bible",
    image: "https://images.isbndb.com/covers/94/19/9781945179419.jpg",
    date_published: "2018",
    synopsis: "",
    publisher: "Ascension Press",
    authors: ["Williamson, Peter"],
    isbn13: "9781945179419",
    isbn: "1945179414",
    language: "en",
  },
  {
    title: "Agile Retrospectives: Making Good Teams Great",
    image: "https://images.isbndb.com/covers/66/40/9780977616640.jpg",
    date_published: "2006",
    synopsis: "",
    publisher: "Pragmatic Bookshelf",
    overview:
      '<p>See how to mine the experience of your software development team <i>continually</i> throughout the life of the project. The tools and recipes in this book will help you uncover and solve hidden (and not-so-hidden) problems with your technology, your methodology, and those difficult "people" issues on your team.</p>\n<p>Project retrospectives help teams examine what went right and what went wrong on a project. But traditionally, retrospectives (also known as "post-mortems") are only helpful at the end of the project—too late to help. You need agile retrospectives that are iterative and incremental. You need to accurately find and fix problems to help the team today.</p>\n<p>Now, Derby and Larsen show you the tools, tricks, and tips you need to fix the problems you face on a software development project on an on-going basis. You\'ll see how to architect retrospectives in general, how to design them specifically for your team and organization, how to run them effectively, how to make the needed changes, and how to scale these techniques up. You\'ll learn how to deal with problems, and implement solutions effectively throughout the project—not just at the end.</p>\n<p>With regular tune-ups, your team will hum like a precise, world-class orchestra.</p>\n\n\n                        <p>The tools and recipes in this book will help readers uncover and solve hidden and not-so-hidden problems with their technology and methodology. It offers tips to fix the problems faced on a software development project on an ongoing basis.\n</p>',
    subjects: [
      "Teams in the workplace",
      "Project management",
      "Computer software--Development",
      "HD66",
    ],
    authors: ["Esther Derby", "Diana Larsen"],
    isbn13: "9780977616640",
    isbn: "0977616649",
    language: "en",
    pages: 178,
  },
  {
    title:
      "Tough Questions, Great Answers: Responding to Patient Concerns About Today's Dentistry",
    image: "https://images.isbndb.com/covers/32/00/9780867153200.jpg",
    date_published: "1997",
    publisher: "Quintessence Pub Co",
    synopsis:
      "Tough Questions, Great Answers offers specific guidance for responding to difficult patient questions, such as: How do you set your fees? Do you guarantee your work? Do you treat AIDS patients? How long can this treatment wait? Robin Wright describes how to turn a challenging conversation into a chance to build patient satisfaction with your dental practice. Based on research with U.S. dental professionals, this book gives great answers to nearly one hundred of the most common questions patients have. An excellent resource for the whole dental team.",
    overview:
      "Tough Questions, Great Answers offers specific guidance for responding to difficult patient questions, such as: How do you set your fees? Do you guarantee your work? Do you treat AIDS patients? How long can this treatment wait? Robin Wright describes how to turn a challenging conversation into a chance to build patient satisfaction with your dental practice. Based on research with U.S. dental professionals, this book gives great answers to nearly one hundred of the most common questions patients have. An excellent resource for the whole dental team.\n\n                        <p>The book contains black-and-white illustrations.\n</p>",
    subjects: [
      "Reference",
      "Multi-Language Phrasebooks",
      "Allied Health & Medical -> Medical -> Reference",
      "World Languages -> Dictionaries -> Dictionaries",
    ],
    authors: ["Wright, Robin"],
    isbn13: "9780867153200",
    isbn: "0867153202",
    language: "en",
    pages: 150,
  },
];

const sampleReviews: ReviewData[] = [
  {
    _id: "review1",
    author: "Cherie Morgan",
    text: "The box this comes in is 4 meter by 5 foot and weights 18 kilogram.I saw one of these in Haiti and I bought one.My velociraptor loves to play with it.",
    author_id: "user1",
    points: 5,
  },
  {
    _id: "review2",
    author: "Dilara Hayes",
    text: "My neighbor Elisha has one of these. She works as a fortune teller and she says it looks floppy.The box this comes in is 3 kilometer by 5 foot and weights 16 megaton!!!",
    author_id: "user2",
    points: 1,
  },
  {
    _id: "review3",
    author: "Reema Arias",
    text: "Heard about this on dance-rock radio, decided to give it a try. i use it for 10 weeks when i'm in my sauna.",
    author_id: "user3",
    points: 3,
  },
];
export const HomePage = () => {
  return <Home testData={mockBookData}></Home>;
};

export const UsersPage = () => {
  return <div>USERS</div>;
};

export const MyPagePage = () => {
  return <div>MYPAGE</div>;
};

export const BookDetailPage = () => {
  const { isbn } = useParams();
  const book = mockBookData.find((book) => book.isbn13 === isbn);
  if (book)
    return (
      <React.Fragment>
        <BookDetail book={book}></BookDetail>
        <BookReviews reviews={sampleReviews}></BookReviews>
      </React.Fragment>
    );
  else
    return (
      <Container
        my="3rem"
        p="3"
        bg="brand.100"
        borderRadius="3xl"
        boxShadow="md"
        w="50%"
      >
        <Text color="white" fontSize="3xl">
          The book does not exists!
        </Text>
      </Container>
    );
};

export const LoginPage = (props: { setAuthenticated: Function }) => {
  return <Auth type="login" setAuthenticated={props.setAuthenticated}></Auth>;
};

export const ResisterPage = (props: { setAuthenticated: Function }) => {
  return (
    <Auth type="register" setAuthenticated={props.setAuthenticated}></Auth>
  );
};

export const RequireAuth = () => {
  const location = useLocation();
  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }}></Navigate>
  );
};

export const PageNotFound = () => {
  return (
    <Container
      borderRadius="2xl"
      textColor="white"
      h="5rem"
      mt="2rem"
      backgroundColor="brand.200"
    >
      <Flex alignItems="center" h="100%" w="100%">
        <Icon as={BsExclamationCircle} w={7} h={7}></Icon>
        <Text w="100%" align="center">
          Page not found! Please select a valid URL!
        </Text>
      </Flex>
    </Container>
  );
};

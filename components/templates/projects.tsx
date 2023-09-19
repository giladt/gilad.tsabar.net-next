import type { FC } from "react";
import Project from "@/components/organisms/project";
import { PageSection } from "@/components/atoms/pageSection";
import { v4 as uuidv4 } from "uuid";

interface projectProps {
  title: string;
  description: string;
  release: string;
  liveUrl: string;
  repoUrl: string;
  image: string;
  stack: { text: string; src: string; size: number }[];
}

const images = {
  js: { text: "Javascript", src: "/icons/javascript-50.png", size: 30 },
  ts: { text: "Typescript", src: "/icons/typescript-50.png", size: 30 },
  react: { text: "React JS", src: "/icons/react-js-50.png", size: 30 },
  next: { text: "Next JS", src: "/icons/nextjs-50.png", size: 30 },
  html: { text: "HTML5", src: "/icons/html5-50.png", size: 30 },
  css: { text: "CSS3", src: "/icons/css3-50.png", size: 30 },
  sass: { text: "SASS", src: "/icons/sass-50.png", size: 30 },
  tailwind: {
    text: "TailwindCSS",
    src: "/icons/tailwind-css-50.png",
    size: 30,
  },
  node: { text: "NodeJS", src: "/icons/nodejs-50.png", size: 30 },
  git: { text: "Git", src: "/icons/git-50.png", size: 30 },
  github: { text: "Github", src: "/icons/github-50.png", size: 30 },
  firebase: { text: "Firebase", src: "/icons/firebase-50.png", size: 30 },
  graphql: { text: "GraphQL", src: "/icons/graphql-50.png", size: 30 },
  gatsby: { text: "GatsbyJS", src: "/icons/gatsby-js-50.png", size: 30 },
  aurelia: { text: "Aurelia JS", src: "/icons/aurelia-50.png", size: 30 },
  ether: { text: "Ether JS", src: "/icons/ethereum-50.png", size: 30 },
  gcp: { text: "GCP", src: "/icons/google-cloud-platform-50.png", size: 30 },
  webpack: { text: "Webpack", src: "/icons/webpack-50.png", size: 30 },
  vite: { text: "Vite", src: "/icons/vite-50.png", size: 30 },
  jest: { text: "Jest", src: "/icons/jest-50.png", size: 30 },
  python: { text: "Python", src: "/icons/python-50.png", size: 30 },
  postman: { text: "Postman", src: "/icons/postman-50.png", size: 30 },
  docker: { text: "Docker", src: "/icons/docker-50.png", size: 30 },
  marked: { text: "Marked", src: "/icons/marked.svg", size: 30 },
  es6: { text: "Vanilla ES6", src: "/icons/es6.png", size: 30 },
  cypress: { text: "CyPress", src: "/icons/cypress.jpg", size: 30 },
};

const ProjectsPage: FC<{}> = () => {
  const my_projects: projectProps[] = [
    {
      title: "Le-Petit-Moabit",
      release: "06/2023",
      liveUrl: "https://www.tsabar.net",
      repoUrl: "https://github.com/giladt/tsabar.next",
      description:
        "Side Project: Booking-Inquiry app for family-owned properties.",
      image: "/projects/le-petit-moabit.png",
      stack: [
        images.next,
        images.react,
        images.tailwind,
        images.ts,
        images.marked,
      ],
    },
    {
      title: "Prime Deals",
      release: "06/2022",
      liveUrl: "https://deals.prime.xyz",
      repoUrl: "https://github.com/PrimeDAO/prime-deals-dapp",
      description:
        "A part of PrimeDAO’s open-source platform: Decentralized collaboration between DAO’s.",
      image: "/projects/prime-deals.png",
      stack: [
        images.aurelia,
        images.ts,
        images.firebase,
        images.ether,
        images.cypress,
      ],
    },
    {
      title: "Prime Launch",
      release: "02/2022",
      liveUrl: "https://launch.prime.xyz",
      repoUrl: "https://github.com/PrimeDAO/prime-launch-dapp",
      description:
        "A part of PrimeDAO’s open-source DeFi platform: Decentralized Seeds and launches of DAO’s.",
      image: "/projects/prime-launch.png",
      stack: [images.aurelia, images.ts, images.ether],
    },
    {
      title: "Tag Supplies",
      release: "05/2021",
      liveUrl: "https://tag-supplies.vercel.app/",
      repoUrl: "https://github.com/giladt/tag-supplies",
      description: "Based on the classic game from the '80s.",
      image: "/projects/tag-supplies.png",
      stack: [images.es6, images.html, images.css],
    },
    {
      title: "Tetris Game",
      release: "08/2020",
      liveUrl: "https://giladt.github.io/TetrisGame/",
      repoUrl: "https://github.com/giladt/TetrisGame",
      description: "Based on the classic game from the '80s.",
      image: "/projects/tetris-game.png",
      stack: [images.es6, images.html, images.css],
    },
  ];

  return (
    <>
      <PageSection.Container
        label="projects"
        className="bg-stone-200 text-black"
      >
        <PageSection.Title align="left">Projects</PageSection.Title>
        <PageSection.Tiles>
          {projects.map((project, index) => (
            <Project key={uuidv4()} priority={index <= 4} {...project}>
              {project.description}
            </Project>
          ))}
        </PageSection.Tiles>
      </PageSection.Container>
    </>
  );
};
export default ProjectsPage;

import type { FC } from "react";
import Image from "next/image";

import Pill from "@/components/atoms/pill";
import {
  PageSection,
  PageSectionParagraph,
  PageSectionTitle,
} from "@/components/atoms/pageSection";
import VerticalTimeline, {
  type Experience,
} from "@/components/organisms/verticalTimeline";

interface aboutProps {}

const AboutPage: FC<aboutProps> = ({}) => {
  const pills = [
    { text: "Javascript", src: "/icons/javascript-50.png", size: 30 },
    { text: "Typescript", src: "/icons/typescript-50.png", size: 30 },
    { text: "React JS", src: "/icons/react-js-50.png", size: 30 },
    { text: "Next JS", src: "/icons/nextjs-50.png", size: 30 },
    { text: "HTML5", src: "/icons/html5-50.png", size: 30 },
    { text: "CSS3", src: "/icons/css3-50.png", size: 30 },
    { text: "SASS", src: "/icons/sass-50.png", size: 30 },
    { text: "TailwindCSS", src: "/icons/tailwind-css-50.png", size: 30 },
    { text: "NodeJS", src: "/icons/nodejs-50.png", size: 30 },
    { text: "Git", src: "/icons/git-50.png", size: 30 },
    { text: "Github", src: "/icons/github-50.png", size: 30 },
    { text: "Firebase", src: "/icons/firebase-50.png", size: 30 },
    { text: "GraphQL", src: "/icons/graphql-50.png", size: 30 },
    { text: "GatsbyJS", src: "/icons/gatsby-js-50.png", size: 30 },
    { text: "Aurelia JS", src: "/icons/aurelia-50.png", size: 30 },
    { text: "Ether JS", src: "/icons/ethereum-50.png", size: 30 },
    { text: "GCP", src: "/icons/google-cloud-platform-50.png", size: 30 },
    { text: "Webpack", src: "/icons/webpack-50.png", size: 30 },
    { text: "Vite", src: "/icons/vite-50.png", size: 30 },
    { text: "Jest", src: "/icons/jest-50.png", size: 30 },
    { text: "Python", src: "/icons/python-50.png", size: 30 },
    { text: "Postman", src: "/icons/postman-50.png", size: 30 },
    { text: "Docker", src: "/icons/docker-50.png", size: 30 },
  ];

  const experiences: Experience[] = [
    {
      title: "Frontend Web(3) Engineer",
      company: "Curve Labs - CL Cybernetix GmbH",
      begin: "06/2021",
      end: "10/2022",
      location: "Berlin, Hybrid",
      about:
        "Curve Labs is an innovation network working with Web3 primitives to design, develop and improve blockchain-native organizations more than the sum of their parts.",
      tasks: [
        "Participated in defining, designing, and developing two of PrimeDAO’s DeFi platform main products: Prime-Launch and Prime-Deals.",
        "Converted business logic into working features using Typescript, Aurelia, Firebase, and Ethers.js.",
        "Cooperated with various players in the WEB3 community to help improve Blockchain tools.",
      ],
    },
    {
      title: "Full-Stack Web Developer",
      company: "This Is Undefined Ltd.",
      begin: "03/2021",
      end: "05/2021",
      location: "Remote",
      about: "",
      tasks: [
        "Developed from scratch an e-commerce platform for the production and event industries to prepare and hire COVID related equipment, as a proof of concept for a client, using ReactJS, Gatsby, Firebase and Prismic.io (for CMS).",
        "Transformed UI designs into responsive and dynamic components using CSS Modules and JSX.",
        "Staging demo: https://tagsupplies.netlify.app/.",
      ],
    },
    {
      title: "Full-Stack Web Developer",
      company: "Gr8hub GmbH & co. KG.",
      begin: "05/2020",
      end: "03/2021",
      location: "Remote",
      tasks: [
        "Developed the Minimum Viable Product in NextJS, and ReactJS.",
        "Transformed UI designs into responsive web pages using HTML5, CSS3 and JavaScript.",
        "Mentored and supported the development team by providing guidance and constructive feedback.",
        "Maintained and optimized code for better performance and scalability. ",
      ],
    },
    {
      title: "Software Developer",
      company: "Trendence Institute GmbH",
      begin: "12/2018",
      end: "09/2020",
      location: "Berlin",
      about:
        "Trendence is one of the leading consulting and market research companies for employer branding, personnel marketing, and recruiting.",
      tasks: [
        "Designed, built, and maintained smart automation tools using VBA, Python and JavaScript.",
        "Merged multiple processes into a single solution, reducing over 1500 development hours yearly.",
      ],
    },
    {
      title: "Data Visualization Manager",
      company: "Trendence Institute GmbH",
      begin: "11/2016",
      end: "12/2018",
      location: "Berlin",
      tasks: [
        "Responsible for data visualization of the company's products.",
        "Programming Excel Macros (VBA) to automate production processes.",
        "Modernized and prepared reports for the end clients.",
        "Initiated optimization of the existing quality assurance processes, which lowered the overall test cycle duration by 60%.",
      ],
    },
    {
      title: "Research Analyst",
      company: "Trendence Institute GmbH",
      begin: "02/2009",
      end: "10/2016",
      location: "Berlin",
      tasks: ["Conducted data analysis for the core Barometer studies."],
    },
    {
      title: "IT-Manager",
      company: "M.I.S Ltd.",
      begin: "08/2006",
      end: "10/2007",
      location: "Israel",
      about:
        "M.I.S. (Marketing Information Systems) is a leading company in Israel for mystery shopping services and dedicated market research.",
      tasks: [
        "Administered, maintained, and acquired the company's technical equipment and peripherals.",
        "Co-ordinated supplier's contracts.",
        "Developed and implemented software solutions used by over 50 call center agents.",
        "Responsible for product implementation, ",
        "Analyzed and designed database architectures.",
      ],
    },
  ];

  return (
    <PageSection label="about me" className="bg-stone-200 text-black">
      <PageSectionTitle align="left">About Me</PageSectionTitle>
      <PageSectionParagraph>
        <div className="flex flex-wrap justify-center gap-4 p-4 rounded-lg bg-stone-300 my-2">
          <div className="md:max-w-[calc(100%-250px-1rem)] min-w-[250px] flex flex-col gap-2">
            <h2 className="text-xl font-bold">Who am I</h2>
            <p className="font-semibold">
              I am a passionate Fullstack web developer based in Berlin, Germany{" "}
              who enjoys building software. Very positive and highly motivated
              person with over 3 years of experience in building beautiful
              websites and web-applications with a stronger focus on the
              frontend technologies.
            </p>
            <p className="font-semibold">
              Outside of work I enjoy playing my guitar, watch films and travel
              the world.
            </p>
          </div>
          <Image
            className="rounded-lg shadow-lg aspect-square"
            src="/portrait.png"
            width={250}
            height={250}
            alt="Gilad Tsabar"
          />
        </div>
        <div>
          <h2 className="text-1xl font-bold pt-4">Most used technologies</h2>
          <ul className="flex flex-wrap justify-left gap-4 py-4">
            {pills.map((pill, index) => (
              <Pill key={index} src={pill.src} size={pill.size}>
                {pill.text}
              </Pill>
            ))}
          </ul>
        </div>
        <PageSectionTitle>Work Experience</PageSectionTitle>
        <VerticalTimeline experiences={experiences} />
      </PageSectionParagraph>
    </PageSection>
  );
};
export default AboutPage;

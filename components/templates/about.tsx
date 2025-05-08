import type { FC } from "react";
import Image from "next/image";

import { PageSection } from "@/components/atoms/page-section";
import VerticalTimeline from "@/components/organisms/verticalTimeline";
import Pill from "@/components/atoms/pill";
import type { TypExperience, TypIconPill } from "@/lib/types";

interface AboutProps {
  skills: TypIconPill[];
  experience: TypExperience[];
}

const About: FC<AboutProps> = ({ skills, experience }) => {
  return (
    <PageSection.Container label="about me" className="bg-stone-200 text-black">
      <PageSection.Title align="left">About Me</PageSection.Title>
      <PageSection.Paragraph>
        <div className="flex flex-wrap justify-center gap-4 p-4 rounded-lg bg-stone-300 my-2">
          <div className="md:max-w-[calc(100%-250px-1rem)] min-w-[250px] flex flex-col gap-2">
            <h2 className="text-xl font-bold">Who am I</h2>
            <p className="font-semibold">
              I am a passionate Full Stack web developer based in Berlin,
              Germany who enjoys building software. Very positive and highly
              motivated person with over 4 years of experience in building
              beautiful websites and web-applications with a focus on the
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
            {skills.map((skill, index) => (
              <Pill key={index} src={skill.src} size={30}>
                {skill.text}
              </Pill>
            ))}
          </ul>
        </div>
        <PageSection.Title>Work Experience</PageSection.Title>
        <VerticalTimeline experience={experience} />
      </PageSection.Paragraph>
    </PageSection.Container>
  );
};
export default About;

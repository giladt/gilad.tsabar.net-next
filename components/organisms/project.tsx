import { type FC, type ReactNode } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import Pill from "@/components/atoms/pill";
import { PageLink } from "@/components/atoms/page-link";

interface ProjectProps {
  title: string;
  release: string;
  liveUrl: string;
  repoUrl: string;
  image: string;
  priority?: boolean;
  stack: { text: string; src: string }[];
  children: ReactNode;
}

const Project: FC<ProjectProps> = ({
  title,
  release,
  image,
  priority,
  liveUrl,
  repoUrl,
  stack,
  children,
}) => {
  return (
    <div
      className="flex flex-col w-[calc(50%-1.25rem)] min-w-[300px]
        min-h-40 rounded-lg bg-white/20 gap-2 m-2 shadow-lg
        overflow-hidden
      "
    >
      <Image
        src={image}
        alt={title}
        priority={priority}
        width={500}
        height={500}
        className={`flex rounded-t-lg shadow-lg`}
      />
      <h2
        className="text-2xl font-bold p-4 
          flex justify-between items-center
        "
      >
        {title}
        <span className="text-xl font-light">{release}</span>
      </h2>
      <div className="flex flex-col p-4 pt-0 gap-4 h-full">
        {children}

        <div className="flex flex-wrap gap-4 justify-center">
          {stack.map((pill: any) => {
            return (
              <Pill src={pill.src} size={22} key={uuidv4()}>
                {pill.text}
              </Pill>
            );
          })}
        </div>
      </div>
      <p className="flex gap-2 mt-4 w-full p-4">
        <PageLink light href={liveUrl} about="A live demo of the project">
          Demo
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </PageLink>
        <PageLink light href={repoUrl} about="Project's repository">
          Code
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </PageLink>
      </p>
    </div>
  );
};

export default Project;

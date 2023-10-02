import { type FC, type ReactNode } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

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
        min-h-40 rounded-lg p-4 bg-white/20 gap-2 m-2 shadow-lg
      "
    >
      <h2
        className="text-2xl font-bold py-1 
        flex justify-between items-center
      "
      >
        {title}
        <span className="text-xl font-light">{release}</span>
      </h2>

      <div className="flex flex-col  gap-4">
        <Image
          src={image}
          alt={title}
          priority={priority}
          width={500}
          height={500}
          className={`w-full flex rounded-lg shadow-lg`}
        />

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
        <PageLink light href={liveUrl} about="A live demo of the project">
          Demo
        </PageLink>
        <PageLink light href={repoUrl} about="Project's repository">
          Code
        </PageLink>
      </p>
    </div>
  );
};

export default Project;

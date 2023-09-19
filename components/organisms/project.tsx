import Link from "next/link";
import type { FC, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

import Pill from "@/components/atoms/pill";
import Image from "next/image";

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

const Project: FC<ProjectProps> = ({ children, ...args }) => {
  return (
    <div
      className="flex flex-col w-[calc(50%-1.25rem)] min-w-[300px]
    min-h-40 rounded-lg p-4 bg-white/20 gap-2 m-2 shadow-lg"
    >
      <h2 className="text-2xl font-bold py-1 flex justify-between items-center">
        {args.title}
        <span className="text-xl font-light">{args.release}</span>
      </h2>

      <div className="relative">
        <Image
          src={args.image}
          width={500}
          height={500}
          alt={args.title}
          priority={args.priority || false}
          className={`w-full flex rounded-lg shadow-lg`}
        />
      </div>
      <div className="flex flex-col  gap-4">
        {children}
        <div className="flex flex-wrap gap-4 justify-center">
          {args.stack.map((pill: any, idx: number) => {
            return (
              <Pill src={pill.src} size={22} key={uuidv4()}>
                {pill.text}
              </Pill>
            );
          })}
        </div>
      </div>
      <p className="flex gap-2 mt-4 w-full">
        <Link
          className="inline-flex grow justify-center uppercase px-4 py-2 w-min rounded-lg text-black bg-white/50 shadow-sm hover:font-bold hover:shadow-lg hover:bg-white"
          href={args.liveUrl}
          about="A live demo of the project"
        >
          Demo
        </Link>
        <Link
          className="inline-flex grow justify-center uppercase px-4 py-2 w-min rounded-lg text-black bg-white/50 shadow-sm hover:font-bold hover:shadow-lg hover:bg-white"
          href={args.repoUrl}
          about="Project's repository"
        >
          Code
        </Link>
      </p>
    </div>
  );
};

export default Project;

import { type FC, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import TimelineItem from "@/components/molecules/timelineItem";

export interface Experience {
  title: string;
  begin: string;
  end: string;
  company: string;
  about?: string;
  location: string;
  tasks: string[];
}

interface VerticalTimelineProps {
  experiences: Experience[];
}

const VerticalTimeline: FC<VerticalTimelineProps> = ({ experiences }) => {
  return (
    <div className="timeline min-h-full grid content-center gap-4 p-2">
      <ul
        className="experiences 
              grid 
              grid-cols-[0.25rem_1fr]
              auto-cols-max 
              gap-x-8
              list-none
              w-[min(60rem,100%)]
              m-auto
              before:content-[''] 
              before:col-[1]
              before:row-[1_/_span_20]
            before:bg-[rgb(25,25,25)]
              before:rounded-1

              md:grid-cols-[1fr_0.25rem_1fr]
              md:before:col-[2]
            "
      >
        {experiences.map((experience) => {
          return <TimelineItem key={uuidv4()} data={experience} />;
        })}
      </ul>
    </div>
  );
};
export default VerticalTimeline;

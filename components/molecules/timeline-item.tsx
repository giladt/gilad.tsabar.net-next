import { useRef, type FC } from "react";
import { useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import type { TypExperience } from "@/lib/types/index";

interface timelineItemProps {
  key: string;
  data: TypExperience;
}

const TimelineItem: FC<timelineItemProps> = ({
  data: { title, begin, end, company, location, about, tasks },
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <li
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "none" : "translateY(20px)",
        transition: "all 0.5s cubic-bezier(0.17,0.55,0.55,1) 0.5s",
      }}
      className="rows
        mb-8
        ms-1
        me-1
        last:mb-0 
        col-[2]
        [grid-row:span_2]
        grid-rows-[min-content_min-content_min-content]

        md:odd:col-[1] md
        md:even:col-[3]
        md:[&:nth-child(2)]:row-[2/4]

        [&>.company]:odd:before:bg-gradient-to-l
        
        [&>.company]:md:odd:rounded-e-3xl
        [&>.company]:md:odd:rounded-s-none

        [&>.company]:md:odd:before:[clip-path:polygon(0%_0%,100%_0%,100%_100%)]
        [&>.company]:md:odd:before:left-0

        [&>.company]:md:odd:after:translate-x-1/2
        [&>.company]:md:odd:after:-translate-y-1/2
        [&>.company]:md:odd:after:left-[calc(100%-0.625rem)]
        
        [&>.title]:md:odd:ps-4
        [&>.title]:md:even:pe-4
        [&>.desc]:md:odd:ps-4
        [&>.desc]:md:even:pe-4

        [&>.date]:md:odd:ps-4
        [&>.date]:md:even:pe-4
        [&>.date]:md:even:text-end
        [&>.date]:md:even:flex-row-reverse

        [&>.about]:md:odd:ps-4
        [&>.about]:md:even:pe-4

      "
    >
      <div
        className="company
          h-12
          -ms-3 -me-4
          text-center
          bg-slate-500

          text-white
          text-xl
          font-bold

          grid
          place-content-center
          relative

          rounded-s-3xl

          before:content-['']
          before:w-6
          before:aspect-square
          before:bg-slate-500
          before:bg-gradient-to-r 
          before:from-[rgba(255,255,255,0.3)] before:to-transparent
          before:absolute
          before:top-full
          before:[clip-path:polygon(0%_0%,100%_0%,0%_100%)]
          before:right-0

          after:content-['']
          after:absolute
          after:w-8
          after:aspect-square
          after:bg-stone-200
          after:border-[0.3rem]
          after:border-red-400
          after:rounded-full
          after:top-1/2
          after:translate-x-1/2
          after:-translate-y-1/2
          after:right-[calc(100%+1.625rem)]
        "
      >
        {company}
      </div>
      <div
        className="date
          flex gap-2
          px-1
          font-bold
          text-base
          [padding-block-end:1rem]
        "
      >
        <span>
          {begin}-{end}
        </span>
        <span>
          <i className="uppercase text-xs">{location}</i>
        </span>
      </div>
      {!!about && (
        <div
          className="about
            text-sm px-1
            -mt-3
            mb-3
            italic text-gray-500
          "
        >
          {about}
        </div>
      )}
      <div
        className="
          title
          relative
          [padding-block-start:-1.5rem]
          ps-1
          pe-1
          font-medium
          text-xl
        "
      >
        {title}
      </div>
      <div
        className="desc
          relative
          ps-1 pe-1
          font-light
          [padding-block-end:1.5rem]
        "
      >
        <ul className="description">
          {tasks.map((task, index) => (
            <li className="tasks" key={index}>
              <FontAwesomeIcon
                className="-ms-4 pe-1"
                icon={faChevronRight}
                size="xs"
              />{" "}
              {task}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};
export default TimelineItem;

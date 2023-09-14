import type { FC } from "react";

interface ContainerShapeProps {
  position: "top" | "bottom";
  distanceCloser: boolean;
}

const ContainerShape: FC<ContainerShapeProps> = ({
  position,
  distanceCloser,
}) => (
  <svg
    className={`absolute left-0 z-10 
    ${distanceCloser ? "h-10 w-10" : "h-5 w-5"}
    ${
      position === "bottom"
        ? `${distanceCloser ? "-bottom-10" : "-bottom-5"}`
        : `${distanceCloser ? "-top-10" : "-top-5"} -rotate-90`
    }
  `}
  >
    <path className="fill-red-400" d="M 0 0 L 20 0 Q 0 0 0 20 Z" />
  </svg>
);
export default ContainerShape;

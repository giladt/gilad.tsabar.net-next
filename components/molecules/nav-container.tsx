import type { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContainerShape from "../atoms/nav-container-button";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface navContainerProps {
  isOpen: boolean;
  mouseInteraction: {
    distance: boolean;
    distanceCloser: boolean;
    iconTop: string;
  };
  handleNavToggle: (e: any) => void;
}

const NavContainer: FC<navContainerProps> = ({
  isOpen,
  mouseInteraction,
  handleNavToggle,
}: navContainerProps) => {
  const nav_icon_classes = `
    absolute flex justify-center items-center
    border-r-red-300 bg-red-400 cursor-pointer
    -translate-y-[50%] transition-all
    shadow-[5px_0_5px_rgba(0,0,0,0.25)] hover:shadow-none
    h-10 w-10 -right-10 rounded-r-lg
    top-[50%] [transition:all_.5s,top_.5s]
  `;
  const nav_icon_distance_classes = mouseInteraction.distance
    ? "[transition:all_.2s,top_0s]"
    : "";
  const nav_icon_distanceCloser_classes = mouseInteraction.distanceCloser
    ? "h-[60px] w-[60px] -right-[60px] rounded-r-[30px]}"
    : "";
  return (
    <div
      id="nav_icon"
      className={`
        ${nav_icon_classes} 
        ${nav_icon_distance_classes} 
        ${nav_icon_distanceCloser_classes}
      `}
      style={{ top: mouseInteraction.iconTop }}
      onClick={handleNavToggle}
    >
      <ContainerShape
        position="top"
        distanceCloser={mouseInteraction.distanceCloser}
      />
      <span
        className={`
          pointer-events-none text-[0px] text-white
          rotate-90 transition-all duration-200
          ${mouseInteraction.distanceCloser ? "text-[10px]" : ""}
        `}
      >
        MENU
      </span>
      <FontAwesomeIcon
        icon={faAngleRight}
        className={`text-white 
        transform duration-200 ease-linear
        ${mouseInteraction.distanceCloser ? "text-[1.5rem]" : "text-base"}
        ${isOpen ? "rotate-180" : ""}
      `}
      />
      <ContainerShape
        position="bottom"
        distanceCloser={mouseInteraction.distanceCloser}
      />
    </div>
  );
};

export default NavContainer;

import NavLink from "@/components/atoms/navLink";
import NavContainer from "@/components/molecules/navContainer";
import {
  type FC,
  type ReactElement,
  useEffect,
  useState,
  useContext,
  useMemo,
} from "react";

import {
  faHome,
  faSignHanging,
  faToolbox,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import { WindowContext } from "@/contexts/windowContext";
import { motion, useMotionValue } from "framer-motion";

interface linkProps {
  href: string;
  icon: any;
  text: string;
}

interface navProps {
  currentUrl: string;
}

const sections = [
  { href: "/", icon: faHome, text: "Home" },
  { href: "/about", icon: faSignHanging, text: "About Me" },
  { href: "/projects", icon: faToolbox, text: "Projects" },
  { href: "/contact", icon: faPeopleGroup, text: "Contact Me" },
];

const Nav: FC<navProps> = ({ currentUrl }: navProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mouseInteraction, setMouseInteraction] = useState({
    distance: false,
    distanceCloser: false,
    iconTop: "50%",
  });

  /**
   ** RESET NAV ICON
   */
  function resetNavIcon() {
    setMouseInteraction({
      distance: false,
      distanceCloser: false,
      iconTop: "50%",
    });
  }

  useEffect(() => {
    /**
     ** CLOSE SIDEBAR WHILE CLICKING OUTSIDE
     */
    function onClickOutside(event: globalThis.MouseEvent): void {
      event.stopPropagation();
      if (!isOpen) return;
      if (!(event.target as Element).closest("#nav")) {
        setIsOpen(false);
        resetNavIcon();
      }
    }

    // Mouse leave window
    function onMouseLeave(event: globalThis.MouseEvent): void {
      setIsOpen(false);
      resetNavIcon();
    }

    window.addEventListener("mousedown", onClickOutside);
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("click", onClickOutside);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isOpen]);

  const { clientWidth, clientHeight, clientX, clientY } =
    useContext(WindowContext);

  /**
   * Handle Mouse Interaction
   */
  useMemo(() => {
    const mouseY = Math.round((clientY * 100) / clientHeight);
    const mouseX = Math.round((clientX * 100) / clientWidth);

    // Check mouse distance to nav
    const outOfBoundary = mouseY >= 90 || mouseY <= 10;
    if (outOfBoundary || isOpen) {
      resetNavIcon();
    } else {
      const isClosedAndNear = !isOpen && mouseX <= 20;
      // Detect mouse position
      setMouseInteraction({
        iconTop: isClosedAndNear ? `${mouseY}%` : "50%",
        distance: isClosedAndNear,
        distanceCloser: mouseX <= 10,
      });
    }
  }, [clientX, clientY, clientHeight, clientWidth, isOpen]);

  return (
    <motion.nav
      id="nav"
      className={`
    fixed flex flex-col justify-center items-center
    left-0 top-0 bottom-0 h-full w-[250px] bg-red-400
    -translate-x-[100%] transition duration-200 ease-linear
    z-50

    ${isOpen ? "translate-x-0 shadow-md" : ""}
  `}
    >
      <NavContainer
        isOpen={isOpen}
        mouseInteraction={mouseInteraction}
        handleNavToggle={() => setIsOpen(!isOpen)}
      />

      <ul
        className={`list-none scrollbar-none
      flex flex-col w-full py-4 px-0 overflow-auto
    `}
      >
        {sections.map(
          (link: linkProps, index: number): ReactElement<HTMLLIElement> => (
            <li
              key={`nav-link-${index.toString()}`}
              className="w-full min-h-[3rem] mb-6 last:mb-0"
            >
              <NavLink
                href={link.href}
                icon={link.icon}
                active={currentUrl === link.href}
                setIsOpen={() => setIsOpen(!isOpen)}
              >
                {link.text}
              </NavLink>
            </li>
          )
        )}
      </ul>
    </motion.nav>
  );
};

export default Nav;

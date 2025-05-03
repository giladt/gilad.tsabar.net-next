import Link from "next/link";
import { Dispatch, SetStateAction, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

interface NavLinkProps {
  href: string;
  icon: IconProp;
  children: ReactNode;
  active: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const NavLink = ({ href, icon, children, active, setIsOpen }: NavLinkProps) => {
  const closeNav = () => {
    setIsOpen(false);
  };

  return (
    <Link
      href={href}
      onClick={closeNav}
      className="
        flex flex-col justify-center items-center
        gap-2 whitespace-nowrap
        w-full h-full text-[#8c0009] drop-shadow-sm 
        uppercase hover:text-white
      "
      style={active ? { color: "white" } : {}}
    >
      <FontAwesomeIcon className="block text-current" icon={icon} size="2xl" />
      {children}
    </Link>
  );
};

export default NavLink;

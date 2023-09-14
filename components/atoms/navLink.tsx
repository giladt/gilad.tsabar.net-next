import Link from "next/link";
import { Dispatch, SetStateAction, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface navLinkProps {
  href: string;
  icon: any;
  children: ReactNode;
  active: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const NavLink = ({ href, icon, children, active, setIsOpen }: navLinkProps) => {
  return (
    <Link
      href={href}
      onClick={() => setIsOpen(false)}
      className={`
        flex flex-col justify-center items-center
        w-full h-full text-[#8c0009] drop-shadow-sm 
        uppercase hover:text-white
      `}
      style={active ? { color: "white" } : {}}
    >
      <FontAwesomeIcon
        className="block text-[1.5rem] mb-2 text-current"
        icon={icon}
      />
      {children}
    </Link>
  );
};

export default NavLink;

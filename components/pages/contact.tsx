import type { FC } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  PageSection,
  PageSectionParagraph,
  PageSectionTitle,
} from "@/components/atoms/pageSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

interface ContactMePageProps {}

const ContactMePage: FC<ContactMePageProps> = ({}) => {
  return (
    <PageSection
      id="contact"
      label="contact"
      className="bg-stone-200 text-black"
    >
      <PageSectionParagraph>
        <PageSectionTitle align="left">Contact Me</PageSectionTitle>
        <PageSectionTitle>Where To Find Me</PageSectionTitle>
        <div className="flex justify-center">
          Do you have an interesting project I can help with?
          <br />
          Feel free to reach out to me by using one of the following:
        </div>
        <ul className="flex flex-row flex-wrap justify-evenly gap-4">
          <motion.li
            whileHover={{
              scale: 1.25,
              transition: { ease: "circInOut", duration: 0.25 },
            }}
          >
            <Link
              className="flex items-center font-bold gap-2 overflow-hidden w-max text-slate-800"
              href="https://github.com/giladt"
              target="blank"
            >
              <FontAwesomeIcon icon={faGithub} size="4x" />
            </Link>
          </motion.li>
          <motion.li
            whileHover={{
              scale: 1.25,
              transition: { ease: "circInOut", duration: 0.25 },
            }}
          >
            <Link
              className="flex items-center font-bold gap-2 overflow-hidden w-max text-sky-600"
              href="https://www.linkedin.com/in/gilad-tsabar"
              target="blank"
            >
              <FontAwesomeIcon icon={faLinkedin} size="4x" />
            </Link>
          </motion.li>
          <motion.li
            whileHover={{
              scale: 1.25,
              transition: { ease: "circInOut", duration: 0.25 },
            }}
          >
            <Link
              className="flex items-center font-bold gap-2 overflow-hidden w-max text-red-400"
              href="mailto:gilad@tsabar.net"
              target="blank"
            >
              <FontAwesomeIcon icon={faEnvelope} size="4x" />
            </Link>
          </motion.li>
        </ul>
        <div className="flex justify-center">
          ...alternatively, you can also send me a message directly from this
          page:
        </div>
        <form
          action=""
          className="flex flex-col gap-4
          w-full py-2 
          rounded-lg
        "
        >
          <input
            type="text"
            title="Name"
            placeholder="Name"
            required
            className="bg-black/10 
            border border-slate-900 rounded-lg 
            text-slate-900 placeholder:text-slate-700
            hover:bg-slate-200 h-10 p-2 shadow-lg"
          />
          <input
            type="email"
            title="Email"
            placeholder="Email"
            required
            className="bg-black/10 
            border border-slate-900 rounded-lg 
            text-slate-900 placeholder:text-slate-700
            hover:bg-slate-200 h-10 p-2 shadow-lg"
          />
          <textarea
            rows={10}
            placeholder="Type here your message"
            title="Message"
            required
            className="bg-black/10 
            border border-slate-900 rounded-lg 
            text-slate-900 placeholder:text-slate-700
            hover:bg-slate-200 p-2 shadow-lg"
          />
          <button
            type="submit"
            className="bg-slate-900 rounded-lg text-white 
            hover:bg-slate-500 h-10"
          >
            Send
          </button>
        </form>
      </PageSectionParagraph>
    </PageSection>
  );
};

export default ContactMePage;

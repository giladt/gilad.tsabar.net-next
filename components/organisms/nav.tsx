import {
  type FC,
  type ReactElement,
  useEffect,
  useState,
  useContext,
  useMemo,
} from 'react';

import {
  faHome,
  faSignHanging,
  faToolbox,
  faPeopleGroup,
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

import { WindowContext } from '@/contexts/windowContext';
import { useI18n } from '@/contexts/i18nContext';
import NavLink from '@/components/atoms/nav-link';
import NavContainer from '@/components/molecules/nav-container';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

interface TypIconLink {
  href: string;
  icon: IconProp;
  text: string;
}

interface NavProps {
  currentUrl: string;
}

const Nav: FC<NavProps> = ({ currentUrl }: NavProps) => {
  const { t, locale, switchLocale } = useI18n();

  const sections: TypIconLink[] = useMemo(
    () => [
      { href: '/', icon: faHome, text: t('nav.home') },
      { href: '/about', icon: faSignHanging, text: t('nav.about') },
      { href: '/projects', icon: faToolbox, text: t('nav.projects') },
      { href: '/contact', icon: faPeopleGroup, text: t('nav.contact') },
    ],
    [t],
  );

  const menuButtonDefaultState = useMemo(
    () => ({
      distance: false,
      distanceCloser: false,
      iconTop: '50%',
    }),
    [],
  );

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    /**
     * Closes the sidebar while clicking outside
     */
    function onClickOutside(event: globalThis.MouseEvent): void {
      event.stopPropagation();
      if (!isOpen) {
        return void 0;
      }

      if (!(event.target as Element).closest('#nav')) {
        setIsOpen(false);
      }
    }

    window.onmousedown ??= onClickOutside;

    return () => {
      window.onmousedown = null;
    };
  }, [isOpen]);

  const { clientWidth, clientHeight, clientX, clientY, clientLeave } =
    useContext(WindowContext);

  /**
   * Closes the sidebar while mouse leaves the document
   */
  useEffect(() => {
    if (clientLeave) {
      setIsOpen(false);
    }
  }, [clientLeave]);

  /**
   * Handle Mouse Interaction
   */
  const handleMouseInteraction = () => {
    const mouseY = Math.round((clientY * 100) / clientHeight);
    const mouseX = Math.round((clientX * 100) / clientWidth);
    const Y_OUT_OF_BOUNDARY_BOTTOM = 90;
    const Y_OUT_OF_BOUNDARY_TOP = 10;
    const X_OUT_OF_BOUNDARY_LEFT = 20;

    /**
     * Check mouse distance to nav
     */
    const outOfBoundary =
      mouseY >= Y_OUT_OF_BOUNDARY_BOTTOM || mouseY <= Y_OUT_OF_BOUNDARY_TOP;
    if (outOfBoundary || isOpen) {
      return menuButtonDefaultState;
    } else {
      const isClosedAndNear = !isOpen && mouseX <= X_OUT_OF_BOUNDARY_LEFT;

      /**
       * Detect mouse position
       */
      return {
        iconTop: isClosedAndNear
          ? `${mouseY}%`
          : menuButtonDefaultState.iconTop,
        distance: isClosedAndNear,
        distanceCloser: mouseX <= 10,
      };
    }
  };

  const mouseInteraction = useMemo(handleMouseInteraction, [
    clientX,
    clientY,
    clientHeight,
    clientWidth,
    isOpen,
    menuButtonDefaultState,
  ]);

  return (
    <motion.nav
      id="nav"
      className={`
        fixed flex flex-col justify-center items-center
        left-0 top-0 bottom-0 h-full w-62.5 bg-red-400
        -translate-x-full transition duration-200 ease-linear
        z-50

        ${isOpen ? 'translate-x-0 shadow-md' : ''}
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
          (link: TypIconLink, index: number): ReactElement<HTMLLIElement> => (
            <li
              key={`nav-link-${index.toString()}`}
              className="w-full min-h-12 mb-6 last:mb-0"
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
          ),
        )}
      </ul>

      <div className="w-full px-4 pb-4 bottom-0 absolute">
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-white/80 mb-2">
          {t('nav.languageLabel')}
        </p>
        <div className="flex gap-2 w-full justify-center">
          <button
            type="button"
            onClick={() => switchLocale('en')}
            className={`rounded-md px-3 py-1 text-xs font-bold transition cursor-pointer ${
              locale === 'en'
                ? 'bg-white text-red-500'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {t('nav.languageEnglish')}
          </button>
          <button
            type="button"
            onClick={() => switchLocale('de')}
            className={`rounded-md px-3 py-1 text-xs font-bold transition cursor-pointer ${
              locale === 'de'
                ? 'bg-white text-red-500'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {t('nav.languageGerman')}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Nav;

import { type FC, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContainerShape from '../atoms/nav-container-button';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const DEFAULT_ICON_TOP = 50;
const FOLLOW_EASING = 0.08;
const UPDATE_THRESHOLD = 0.2;

type MouseInteraction = {
  distance: boolean;
  distanceCloser: boolean;
  iconTop: number;
};

interface navContainerProps {
  isOpen: boolean;
  handleNavToggle: (e: any) => void;
}

const NavContainer: FC<navContainerProps> = ({
  isOpen,
  handleNavToggle,
}: navContainerProps) => {
  const defaultMouseInteraction: MouseInteraction = {
    distance: false,
    distanceCloser: false,
    iconTop: DEFAULT_ICON_TOP,
  };

  const [mouseInteraction, setMouseInteraction] = useState<MouseInteraction>(
    defaultMouseInteraction,
  );

  const animationFrameRef = useRef<number | null>(null);
  const targetTopRef = useRef<number>(DEFAULT_ICON_TOP);
  const animatedTopRef = useRef<number>(DEFAULT_ICON_TOP);
  const isAnimatingRef = useRef(false);

  const stopIconAnimation = () => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    isAnimatingRef.current = false;
  };

  const startIconAnimation = () => {
    if (isAnimatingRef.current) {
      return;
    }

    isAnimatingRef.current = true;

    const animateIcon = () => {
      const current = animatedTopRef.current;
      const target = targetTopRef.current;
      const next = current + (target - current) * FOLLOW_EASING;

      animatedTopRef.current = next;

      setMouseInteraction((prev) => {
        if (Math.abs(prev.iconTop - next) < UPDATE_THRESHOLD) {
          return prev;
        }
        return { ...prev, iconTop: next };
      });

      if (Math.abs(target - next) < 0.05) {
        animatedTopRef.current = target;
        setMouseInteraction((prev) => ({ ...prev, iconTop: target }));
        stopIconAnimation();
        return;
      }

      animationFrameRef.current = window.requestAnimationFrame(animateIcon);
    };

    animationFrameRef.current = window.requestAnimationFrame(animateIcon);
  };

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (isOpen) {
        return;
      }

      const width = Math.max(window.innerWidth, 1);
      const height = Math.max(window.innerHeight, 1);
      const mouseX = Math.round((event.clientX * 100) / width);
      const mouseY = Math.round((event.clientY * 100) / height);

      const outOfBoundary = mouseY >= 90 || mouseY <= 10;
      const isClosedAndNear = !outOfBoundary && mouseX <= 20;

      targetTopRef.current = isClosedAndNear ? mouseY : DEFAULT_ICON_TOP;

      setMouseInteraction((prev) => ({
        ...prev,
        distance: isClosedAndNear,
        distanceCloser: isClosedAndNear && mouseX <= 10,
      }));

      startIconAnimation();
    };

    const onMouseLeave = () => {
      targetTopRef.current = DEFAULT_ICON_TOP;
      setMouseInteraction((prev) => ({
        ...prev,
        distance: false,
        distanceCloser: false,
      }));
      startIconAnimation();
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      stopIconAnimation();
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      targetTopRef.current = DEFAULT_ICON_TOP;
      animatedTopRef.current = DEFAULT_ICON_TOP;
      stopIconAnimation();
      setMouseInteraction(defaultMouseInteraction);
    }
  }, [isOpen]);

  const nav_icon_classes = `
    absolute flex justify-center items-center
    border-r-red-300 bg-red-400 cursor-pointer
    -translate-y-[50%]
    shadow-[5px_0_5px_rgba(0,0,0,0.25)] hover:shadow-none
    h-10 w-10 -right-10 rounded-r-lg
    top-[50%] duration-200 ease-linear delay-50
    transition-[height,width,right,border-radius,box-shadow]
  `;
  const nav_icon_distance_classes = mouseInteraction.distance
    ? '[transition-duration:.24s]'
    : '';
  const nav_icon_distanceCloser_classes = mouseInteraction.distanceCloser
    ? 'h-[60px] w-[60px] -right-[60px] rounded-r-[30px]'
    : '';
  return (
    <div
      id="nav_icon"
      className={`
        ${nav_icon_classes} 
        ${nav_icon_distance_classes} 
        ${nav_icon_distanceCloser_classes}
      `}
      style={{ top: `${mouseInteraction.iconTop}%` }}
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
          ${mouseInteraction.distanceCloser ? 'text-[10px]' : ''}
        `}
      >
        MENU
      </span>
      <FontAwesomeIcon
        icon={faAngleRight}
        className={`text-white 
        transform duration-200 ease-linear
        ${mouseInteraction.distanceCloser ? 'text-[1.5rem]' : 'text-base'}
        ${isOpen ? 'rotate-180' : ''}
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

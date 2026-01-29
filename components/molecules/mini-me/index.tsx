import React, { useContext, useEffect, useMemo, useRef } from "react";
import {
  motion,
  MotionStyle,
  useInView,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { WindowContext } from "@/contexts/windowContext";

interface MiniMeProps {
  className?: string;
}

export type Ref = HTMLHeadingElement;

const MiniMe = ({ className = "" }: MiniMeProps) => {
  const { clientWidth, clientHeight, clientX, clientY } =
    useContext(WindowContext);

  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: false });

  const x = useMotionValue(clientWidth);
  const y = useMotionValue(clientHeight);

  const positionRatio = useMemo(() => {
    if (ref === null || !isInView) { 
      return null; 
    }
    const currEl: HTMLElement | null = ref.current;

    const fixedOffset = 200;
    const posX = (currEl?.offsetLeft ?? 0) + fixedOffset;
    const posY = (currEl?.offsetTop ?? 0) + fixedOffset;

    return ({
      horizontal: Math.round((posX / clientWidth) * 100) / 100,
      vertical: Math.round((posY / clientHeight) * 100) / 100,
    });
  }, [ref, isInView, clientWidth, clientHeight]);

  useEffect(() => {
    x.set(clientX);
    y.set(clientY);
  }, [x, y, clientX, clientY]);

  const getPositionRatio = (
    range: [number, number],
    axis: "horizontal" | "vertical"
  ) => {
    const ratio =
      axis === "horizontal"
        ? positionRatio?.horizontal ?? 0.5
        : positionRatio?.vertical ?? 0.5;
    const span = (range[1] - range[0]) * ratio;
    const midPoint = (range[0] + range[1]) / 2;
    return [
      midPoint - Math.round(span * ratio),
      midPoint + Math.round(span * (1 - ratio)),
    ];
  };

  const pos: Record<string, {left: number, right: number}> = {
    xEye: {left: -15, right: 15},
    yEye: {left: -10, right: 10},
    xEyebrow: {left: -5, right: 5},
    yEyebrow: {left: -5, right: 5},
    xPupil: {left: -20, right: 22},
    yPupil: {left: -27, right: 7},
    xFace: {left: 0, right: 15},
    yFace: {left: -5, right: 5},
    rMouth: {left: 0, right: -10},
  }
  const xEye = useTransform(
    x,
    [0, clientWidth],
    getPositionRatio([pos.xEye.left, pos.xEye.right], "horizontal")
  );
  const yEye = useTransform(
    y,
    [0, clientHeight],
    getPositionRatio([pos.yEye.left, pos.yEye.right], "vertical")
  );
  const xEyebrow = useTransform(
    x,
    [0, clientWidth],
    getPositionRatio([pos.xEyebrow.left, pos.xEyebrow.right], "horizontal")
  );
  const yEyebrow = useTransform(
    y,
    [0, clientHeight],
    getPositionRatio([pos.yEyebrow.left, pos.yEyebrow.right], "vertical")
  );
  const xPupil = useTransform(
    x,
    [0, clientWidth],
    getPositionRatio([pos.xPupil.left,pos.xPupil.right], "horizontal")
  );
  const yPupil = useTransform(
    y,
    [0, clientHeight],
    getPositionRatio([pos.yPupil.left,pos.yPupil.right], "vertical")
  );
  const xFace = useTransform(
    x,
    [0, clientWidth],
    getPositionRatio([pos.xFace.left,pos.xFace.right], "horizontal")
  );
  const yFace = useTransform(
    y,
    [0, clientHeight],
    getPositionRatio([pos.yFace.left,pos.yFace.right], "vertical")
  );
  const rMouth = useTransform(
    x,
    [0, clientWidth],
    getPositionRatio([pos.rMouth.left,pos.rMouth.right], "horizontal")
  );

  const styleBody: MotionStyle = {
    position: "relative",
    width: 400,
    height: 400,
    bottom: -125,
    left: 0,
  };

  const styleFace: MotionStyle = {
    position: "relative",
    top: -200,
    left: 100,
    width: 175,
    height: 240,
    backgroundColor: "#efe3d1",
    borderRadius: "180px 180px 180px 180px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 70,
    x: xFace,
    y: yFace,
    zIndex: 1,
  };

  const styleEye: MotionStyle = {
    position: "absolute",
    width: 22.5,
    height: 27.5,
    backgroundColor: "cornflowerblue",
    borderRadius: 25,
    left: 0,
    x: xEye,
    y: yEye,
  };

  const styleEyebrow: MotionStyle = {
    position: "absolute",
    top: -50,
    left: -10,
    width: 40,
    height: 10,
    x: xEyebrow,
    y: yEyebrow,
  };

  const styleEyePupil: MotionStyle = {
    position: "absolute",
    width: 10,
    height: 10,
    backgroundColor: "black",
    borderRadius: 10,
    zIndex: 1,
    left: 5,
    top: 5,
    x: xPupil,
    y: yPupil,
  };

  const styleNose: MotionStyle = {
    position: "absolute",
    top: 150,
    left: 75,
    width: 20,
    x: xEye,
    y: yEye,
  };

  const styleMouth: MotionStyle = {
    position: "absolute",
    top: 175,
    left: 55,
    width: 60,
    rotateZ: rMouth,
    x: xEye,
    y: yEye,
  };

  const styleEars: MotionStyle = {
    position: "absolute",
    zIndex: 1,
    top: 95,
    width: 215,
    height: 70,
    x: 0,
    y: 0,
  };

  return (
    <AnimatePresence initial={true} mode="wait">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0 } }}
        transition={{
          type: "spring",
          duration: 1,
        }}
        className={`${className} 
          w-[400px] h-[450px] m-4
          flex place-items-center place-content-center 
          bg-[radial-gradient(circle_closest-side_at_200px_250px,rgba(255,255,255,15%)_0%,rgba(255,255,255,15%)_90%,rgba(0,0,0,5%)_98%,rgba(255,255,255,100%)_99%,rgba(255,255,255,100%)_100%,transparent)]
          rounded-b-full
          overflow-hidden
        `}
      >
        <motion.div
          initial={{ y: 500 }}
          animate={{ y: -185, scale: 1.35 }}
          exit={{ opacity: 0, transition: { duration: 0 } }}
          transition={{
            delay: 1,
            type: "spring",
            duration: 1,
          }}
          className="opacity-100 w-[400px] h-[420px]"
        >
          <motion.svg
            style={styleBody}
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g className="body">
              <path
                className="neck"
                d="M 288.951 428.079 L 288.951 372.431 C 289.881 344.234 259.938 325.604 235.056 338.9 C 222.742 345.478 215.237 358.48 215.694 372.431 L 215.694 428.079 C 154.999 439.367 117.357 488.019 117.357 536.711 L 387.288 536.711 C 387.288 488.059 349.527 439.367 288.951 428.079 Z"
                fill="#ede3d1"
              />
              <path
                className="shoulder"
                d="M 214.283 424.184 C 150.686 431.632 116.228 394.154 109.952 545.293 C 159.733 574.719 319.454 615.874 258.146 501.597 L 214.283 424.184 Z"
                fill="#ada5a1"
              />
              <path
                className="shoulder"
                d="M 288.831 424.76 C 351.475 432.245 402.011 412.494 393.644 534.187 C 343.485 571.837 148.619 618.442 238.407 526.381 L 288.831 424.76 Z"
                fill="#ada5a1"
              />
              <path
                className="shadow-sm"
                d="M 214.915 350.633 L 289.571 349.151 L 288.831 420.098 C 288.831 420.098 247.096 442.118 215.655 420.098 L 214.915 350.633 Z"
                fill="#efceb9"
              />
            </g>
          </motion.svg>
          <motion.div style={styleFace}>
            <motion.svg
              style={styleEars}
              viewBox="0 0 75 15"
              width="72.001"
              height="15.0007"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 1.346 9.955 C 1.388 14.195 3.347 17.552 5.698 17.413 C 8.045 17.491 9.99 14.15 10.063 9.918 C 10.034 5.651 8.061 2.266 5.698 2.422 C 3.349 2.361 1.408 5.719 1.346 9.955 Z"
                fill="#ede3d1"
              />
              <path
                d="M 2.236 9.903 C 3.117 9.87 3.998 10.007 4.859 10.313 C 5.537 10.623 6.088 11.313 6.76 11.623 C 6.944 11.692 7.107 11.419 7.053 11.131 C 7.048 11.104 7.04 11.078 7.032 11.053 C 6.304 8.673 3.553 9.193 2.229 9.383 C 2.101 9.383 2.022 9.6 2.086 9.773 C 2.115 9.853 2.17 9.903 2.229 9.903 L 2.236 9.903 Z"
                fill="#b5aa9a"
              />
              <path
                d="M 73.347 9.936 C 73.302 14.15 71.078 17.503 68.389 17.415 C 65.677 17.499 63.427 14.146 63.347 9.899 C 63.395 5.668 65.635 2.311 68.335 2.419 C 71.035 2.362 73.266 5.707 73.347 9.936 Z"
                fill="#ede3d1"
              />
              <path
                d="M 71.567 8.785 C 70.173 8.609 67.298 8.117 66.528 10.335 C 66.43 10.577 66.555 10.878 66.754 10.876 C 66.777 10.876 66.799 10.872 66.821 10.864 C 67.531 10.623 68.095 9.936 68.812 9.648 C 69.716 9.369 70.641 9.241 71.567 9.268 C 71.7 9.268 71.783 9.066 71.716 8.906 C 71.686 8.832 71.63 8.785 71.567 8.785 Z"
                fill="#b5aa9a"
              />
            </motion.svg>
            <motion.div
              style={{
                position: "relative",
                display: "flex",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              <motion.div
                style={styleEye}
                animate={{
                  scaleY: [1, 0, 1],
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeIn",
                  times: [0.2, 0.6, 0.2],
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
              <motion.div
                style={styleEyePupil}
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 1,
                  ease: "easeIn",
                  times: [0.1, 0.8, 0.1],
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
              <motion.svg viewBox="0 0 40 10" style={styleEyebrow}>
                <motion.path
                  d="M 5 3 C 18 0 22 0 35 5"
                  stroke="#b5aa9a"
                  strokeWidth="3"
                  fill="transparent"
                />
              </motion.svg>
            </motion.div>

            <motion.div
              style={{
                position: "relative",
                display: "flex",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              <motion.div
                style={styleEye}
                animate={{
                  scaleY: [1, 0, 1],
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeIn",
                  times: [0.2, 0.6, 0.2],
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
              <motion.div
                style={styleEyePupil}
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 1,
                  ease: "easeIn",
                  times: [0.1, 0.8, 0.1],
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
              <motion.svg viewBox="0 0 40 10" style={styleEyebrow}>
                <motion.path
                  d="M 5 5 C 18 0 22 0 35 3"
                  stroke="#b5aa9a"
                  strokeWidth="3"
                  fill="transparent"
                />
              </motion.svg>
            </motion.div>
            <motion.svg viewBox="0 0 40 10" style={styleNose}>
              <motion.path
                d="M 5 3 C 20 10 25 10 35 5"
                stroke="#e0d5c1"
                strokeWidth="3"
                fill="transparent"
              />
            </motion.svg>
            <motion.svg viewBox="0 0 40 10" style={styleMouth}>
              <motion.path
                d="M 0 0 C 15 10 35 10 40 3"
                stroke="#b5aa9a"
                strokeWidth="3"
                fill="transparent"
              />
            </motion.svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MiniMe;

import React, {
  useCallback,
  useEffect,
  useState,
  ReactNode,
  FC,
  createContext,
} from "react";
export type WindowContextProps = {
  clientHeight: number;
  clientWidth: number;
  clientY: number;
  clientX: number;
};
export const WindowContext = createContext<WindowContextProps>({
  clientHeight: 0,
  clientWidth: 0,
  clientY: 0,
  clientX: 0,
});
export const WindowContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const getVh = useCallback(() => {
    if (typeof document === "undefined") return 0;
    return Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
  }, []);
  const getVw = useCallback(() => {
    if (typeof document === "undefined") return 0;
    return Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
  }, []);
  const getVy = useCallback((event?: MouseEvent) => {
    if (typeof event === "undefined") return 0;
    return event.clientY;
  }, []);
  const getVx = useCallback((event?: MouseEvent) => {
    if (typeof event === "undefined") return 0;
    return event.clientX;
  }, []);

  const [clientHeight, setVh] = useState<number>(getVh());
  const [clientWidth, setVw] = useState<number>(getVw());
  const [clientY, setVy] = useState<number>(getVy());
  const [clientX, setVx] = useState<number>(getVx());
  useEffect(() => {
    const handleResize = () => {
      setVh(getVh());
      setVw(getVw());
    };
    const handleMove = (event: MouseEvent) => {
      setVy(getVy(event));
      setVx(getVx(event));
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMove);
    };
  }, [getVh, getVw]);
  return (
    <WindowContext.Provider
      value={{ clientHeight, clientWidth, clientX, clientY }}
    >
      {children}
    </WindowContext.Provider>
  );
};

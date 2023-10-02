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
  clientLeave: boolean;
};
export const WindowContext = createContext<WindowContextProps>({
  clientHeight: 0,
  clientWidth: 0,
  clientY: 0,
  clientX: 0,
  clientLeave: false,
});
export const WindowContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const getClientHeight = useCallback(() => {
    if (typeof document === "undefined") return 0;
    return Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
  }, []);

  const getClientWidth = useCallback(() => {
    if (typeof document === "undefined") return 0;
    return Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
  }, []);

  const getClientY = useCallback((event?: MouseEvent) => {
    if (typeof event === "undefined") return 0;
    return event.clientY;
  }, []);

  const getClientX = useCallback((event?: MouseEvent) => {
    if (typeof event === "undefined") return 0;
    return event.clientX;
  }, []);

  const getClientLeave = useCallback((event?: MouseEvent) => {
    if (typeof event === "undefined") return false;
    return event.type === "mouseleave";
  }, []);

  const [clientHeight, setClientHeight] = useState<number>(getClientHeight());
  const [clientWidth, setClientWidth] = useState<number>(getClientWidth());
  const [clientY, setClientY] = useState<number>(getClientY());
  const [clientX, setClientX] = useState<number>(getClientX());
  const [clientLeave, setClientLeave] = useState<boolean>(getClientLeave());

  useEffect(() => {
    const handleResize = () => {
      setClientHeight(getClientHeight());
      setClientWidth(getClientWidth());
    };
    const handleMove = (event: MouseEvent) => {
      setClientY(getClientY(event));
      setClientX(getClientX(event));
    };
    const handleLeave = (event: MouseEvent) => {
      setClientLeave(getClientLeave(event));
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleResize);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleLeave);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleLeave);
    };
  }, [getClientHeight, getClientWidth, getClientLeave]);

  return (
    <WindowContext.Provider
      value={{ clientHeight, clientWidth, clientX, clientY, clientLeave }}
    >
      {children}
    </WindowContext.Provider>
  );
};

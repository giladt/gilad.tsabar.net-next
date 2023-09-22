import Image from "next/image";
import { ReactNode, ReactElement, FC } from "react";

interface PillProps {
  src: string;
  size: number;
  alt?: string;
  rightIcon?: boolean;
  children: ReactNode;
}

const Pill: FC<PillProps> = ({
  src,
  size,
  alt = "",
  rightIcon = false,
  children,
}: PillProps): ReactElement<HTMLSpanElement> => (
  <span
    className={`inline-flex gap-2 justify-center items-center ${
      rightIcon ? "flex-row-reverse" : "flex-row"
    }`}
  >
    <Image
      src={src}
      width={size}
      height={size}
      alt={alt || (children as string)}
    />
    {children}
  </span>
);
export default Pill;

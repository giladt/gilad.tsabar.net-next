import { useState, useEffect, type FC, type ReactNode } from "react";
import Image from "next/image";

interface ProjectImageProps {
  src: string;
  alt: string;
  priority: boolean | undefined;
}
export const ProjectImage: FC<ProjectImageProps> = ({
  src,
  alt,
  priority,
}: ProjectImageProps): ReactNode => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if (!mounted && typeof window !== "undefined") setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div
        className={`flex flex-col justify-center items-center gap-2
        w-full h-[300px] text-base
        rounded-lg shadow-lg
      `}
      >
        <div>Loading...</div>
        <div>{alt}</div>
      </div>
    );

  return (
    <Image
      src={src}
      width={500}
      height={500}
      alt={alt}
      priority={priority || false}
      className={`w-full flex rounded-lg shadow-lg`}
    />
  );
};

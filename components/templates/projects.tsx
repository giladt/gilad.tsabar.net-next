import type { FC } from "react";
import Project from "@/components/organisms/project";
import { PageSection } from "@/components/atoms/pageSection";
import { v4 as uuidv4 } from "uuid";

interface ProjectProps {
  title: string;
  description: string;
  release: string;
  liveUrl: string;
  repoUrl: string;
  image: string;
  stack: { text: string; src: string }[];
}

interface ProjectsProps {
  projects: ProjectProps[];
}

const ProjectsPage: FC<ProjectsProps> = ({ projects }: ProjectsProps) => {
  return (
    <>
      <PageSection.Container
        label="projects"
        className="bg-stone-200 text-black"
      >
        <PageSection.Title align="left">Projects</PageSection.Title>
        <PageSection.Tiles>
          {projects.map((project, index) => (
            <Project key={uuidv4()} priority={index <= 4} {...project}>
              {project.description}
            </Project>
          ))}
        </PageSection.Tiles>
      </PageSection.Container>
    </>
  );
};
export default ProjectsPage;

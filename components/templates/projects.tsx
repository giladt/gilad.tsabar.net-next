import type { FC } from "react";
import { v4 as uuidv4 } from "uuid";

import Project from "@/components/organisms/project";
import { PageSection } from "@/components/atoms/page-section";
import { TypProject } from "@/lib/types";

interface ProjectsPageProps {
  projects: TypProject[];
}

const ProjectsPage: FC<ProjectsPageProps> = ({
  projects,
}: ProjectsPageProps) => {
  return (
    <PageSection.Container label="projects" className="bg-stone-200 text-black">
      <PageSection.Title align="left">Projects</PageSection.Title>
      <PageSection.Tiles>
        {projects.map((project, index) => (
          <Project key={uuidv4()} priority={index <= 4} {...project}>
            {project.description}
          </Project>
        ))}
      </PageSection.Tiles>
    </PageSection.Container>
  );
};

export default ProjectsPage;

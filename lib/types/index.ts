
/**
 * Project Interface
 * 
 * Provides project information
*/
export interface TypProject {
  /** title Project name/title as string */
  title: string;

  /** description Project description as string */
  description: string;

  /** release Date of project release as string */
  release: string;

  /** liveUrl Link to a working deployment as string */
  liveUrl: string;

  /** repoUrl Link to project's repository as string */
  repoUrl: string;

  /** image Local location of the projects image file */
  image: string;

  /** Array of tech stack IconPillProps. */
  stack: TypIconPill[];
}

/**
 * IconPillProps
 * 
 * For use to show a list of texts with icon.
 */
export interface TypIconPill {
  /** @text description text as string */
  text: string;
  /** @src local location of icon file as string */
  src: string;
}

export interface TypExperience {
  title: string;
  begin: string;
  end: string;
  company: string;
  about?: string;
  location: string;
  tasks: string[];
}


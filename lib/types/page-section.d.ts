
export interface TypPageSection {
  label: string;
  className?: string;
  children: ReactNode;
}

export interface TypPageSectionParagraph {
  children: ReactNode;
}

export interface TypPageSectionTitle {
  small?: boolean;
  align?: "left" | "center" | "right";
  children: ReactNode;
}

export interface TypPageSectionTiles {
  children: ReactNode;
}

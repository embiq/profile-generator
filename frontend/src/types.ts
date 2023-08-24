export interface Profile {
  id: number;
  name: string;
  jobTitles: JobTitle[];
  advantages: string[];
  courses: Course[];
  educations: Education[];
  experience: ExperienceItem[];
  languages: Language[];
  skills: Skill[];
  technologies: MainTechnologyItem[];
  hourlyRate: string;
  availability: string;
}

export interface CreateProfile extends Omit<Profile, "id" | "hourlyRate" | "availability"> {}

export interface ExperienceItem {
  duration: number;
  project: Project;
  tasks: Task[];
  technologies: Technology[];
  displayPriority: number;
}

export interface Project {
  name: string;
  description: string;
  specialistNumber: number;
  marketBranch?: string;
}

export interface Course {
  name: string;
  description?: string;
}

export interface Education {
  name: string;
  description: string;
  endDate: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface JobTitle {
  title: string;
}

export interface Skill {
  name: string;
}

export interface Task {
  description: string;
  subTask: SubTask[];
}

export interface SubTask {
  description: string;
}

export interface MainTechnologyItem {
  showSkillLevel?: boolean;
  name?: string;
  level?: number;
  isLegend?: boolean;
}

export interface Technology {
  name: string;
}

export interface EditableProfileFields {
  profileType: ProfileType;
  jobTitles: string;
  name: string;
  rate: string;
  availability: string;
  advantages: string;
  mainTechnologies: MainTechnologyItem[];
  showSkillLevel: boolean;
  skills: string;
  courses: string;
  education: Education[];
  languages: Language[];
  experience: EditableExperienceField[];
}

export interface EditableExperienceField {
  duration: number;
  name: string;
  description: string;
  tasks: string;
  marketBranch?: string;
  toolsAndTechnologies: Technology[];
  displayPriority: number;
  projectId: string;
}

export interface SelectorData {
  id: number;
  name: string;
}

export type ProfileType = "SHORT";

export const profileTypes: ProfileType[] = ["SHORT"];
export type EditableProfileFieldsArray = "mainTechnologies" | "education" | "experience" | "languages";

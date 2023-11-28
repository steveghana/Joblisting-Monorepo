export type IJobs = {
  rolename: string;
  task: string[];
  description: string[];
  id: string;
  location: {
    continent: string;
    country: string[];
  };

  jobtype: "Full-time" | "Part-time";
  roleType: string;
  whenToStart: string;
  projectTitle: string;
  employmentType: string;
  selectedSkills: string[];
  jobType: string;
  salary: string;
  roleCategory: string;
  roleName: string;
  tasks: string[]; // Array of tasks
  postedDate: Date;
};

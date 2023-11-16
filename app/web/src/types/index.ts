export type IJobs = {
  rolename: string;
  task: string[];
  description: string[];
  salary: string;
  roleCategory: "Engineering" | "Marketing";
  id: string;
  location: {
    continent: string;
    country: string[];
  };
  joblocation: "Remote" | "Onsite" | "Hybrid";
  jobtype: "Full-time" | "Part-time";
  postedDate: Date;
};

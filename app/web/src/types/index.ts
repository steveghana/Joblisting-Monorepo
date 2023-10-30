export type IJobs = {
  rolename: string;
  description: string[];
  location: string;
  joblocation: "Remote" | "Onsite" | "Hybrid";
  jobtype: "Full-time" | "Part-time";
  postedDate: Date;
};
export type Iclient = {
  name: string;
  role: string;
};
export interface IRoleData {
  name: string;
  subName: string;
  description: string;
  jobs: IJobs[];
  founders: Iclient;
}

import { IRoleData } from "./roles";
import { IUser, Iuser } from "./user";

export type IDev = {
  id?: string;
  firstName: string;
  clientName: string;
  user?: Iuser;
  interviewId?: string;
  companyName: string;
  role?: string;
  lastName: string;
  roles: IRoleData[];
  email: string;
  jobTitle: string;
  salary: number;
  startedAt: string;
  experience?: number;
  projectName: string;
  avatar: string;
  workStatus: "Active" | "Not Active";
  rolestatus: "InHouse" | "Pending" | "External" | "Accepted" | "Interviewing";
};

export type IDev = {
  id?: string;
  firstName: string;
  clientName: string;
  interviewId?: string;
  companyName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  salary: number;
  startDate: string;
  experience?: number;
  projectName: string;
  avatar: string;
  workStatus: "Active" | "Not Active";
  rolestatus: "InHouse" | "Pending" | "External" | "Accepted" | "Interviewing";
};

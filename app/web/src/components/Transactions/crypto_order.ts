export type DevStatus = "Active" | "Not Active";
export type DevInterveiwStatus = "completed" | "pending" | "failed";

export interface DevDetails {
  id: string;
  devDetails: string;
  role: string;
  date: number;
  status: DevStatus;
  interviewStatus: DevInterveiwStatus;
  skills: string[];
  experience: number;
}

import { IDev } from "./devs";
import { IRoleData } from "./roles";

export interface Iinterviews {
  id?: string;

  // role: IRoleData;

  interviewer: IDev;
  interviewType: string;
  candidate: IDev;
  candidateId: string;
  interviewerId: string;
  meetingLink: string;

  interviewDate?: Date | null;
  scheduled_date: Date;
  createdAt?: Date;
  updatedAt?: Date;

  status: "Scheduled" | "Completed" | "Canceled"; //
}

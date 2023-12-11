import { IDev } from "./devs";
import { IRoleData } from "./roles";

export interface Iinterviews {
  id?: string;

  // role: IRoleData;

  interviewer: IDev;
  interviewType: string;
  candidate: IDev;
  candidateId: string;
  eventType: string;
  eventOption: string;
  description: string;
  eventLInk: string;
  starttime: string;
  endtime: string;
  startDate: Date;
  endDate: Date;
  guests: string[];
  createdAt?: Date;
  updatedAt?: Date;

  status: "Scheduled" | "Completed" | "Canceled"; //
}
export interface InterviewFormValue {
  // candidate: "",
  eventType: string;
  eventOption: string;
  description: string;
  eventLInk: string;
  starttime: string;
  endtime: string;
  startDate: Date;
  endDate: Date;
  candidate: string;
  guests: string[];
}

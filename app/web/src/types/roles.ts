import { userRole } from "../lib/roles";

export type IRole = "admin" | "developer" | "hr";
export type IProfession = "Ceo" | "Marketing" | "Recruitment" | "Developer";

export type UserRoleSelection = IRole[]; // UserRole is defined as in the previous answer

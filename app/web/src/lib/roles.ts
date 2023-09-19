// rolesToPages.js
const rolesToPages = {
  admin: ["admin-page", "ceo-page", "hr-page", "home"],
  developer: ["developer-page", "ceo-page"],
  hr: ["hr-page"],
};
export const userRole = ["admin", "developer", "hr"] as const;

export default rolesToPages;

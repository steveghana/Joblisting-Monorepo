const secondsToMs = (s: number) => s * 1000;
const minutesToMs = (m: number) => secondsToMs(m * 60);
const hoursToMs = (h: number) => minutesToMs(h * 60);
const daysToMs = (d: number) => hoursToMs(d * 24);

const config = {
  restApiPort: 5000,
  databasePort: 5432,

  BusinessURL: 'https://business.q-int.com',

  logSql: true,

  authentication: {
    passwordHashIterations: Math.pow(2, 17), // We hash using PBKDF2 with SHA512. In this case OWASP recommends at least 120,000 iterations https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#pbkdf2
    authTokenIdleTTL: hoursToMs(1), // OWASP recommends 15-30 minutes for low risk apps https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#session-expiration
    authTokenAbsoluteTTL: hoursToMs(12), // OWASP recommends 4-8 hours https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#session-expiration
    credentialTokenTTL: daysToMs(30)
  },
  development: {
    useHttps: false,
    accessibleExternally: false
  }
};
export default config;
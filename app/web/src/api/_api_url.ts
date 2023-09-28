import config from "./config";

const isProduction = process.env.NODE_ENV === "production";

function getDevelopmentHost() {
  return config.development.accessibleExternally
    ? process.env.LOCAL_ADDRESS
    : "localhost";
  // return config.development.accessibleExternally ? process.env.LOCAL_ADDRESS : 'q-back.up.railway.app';
}

function getHost() {
  return isProduction ? "api.q-int.com" : getDevelopmentHost();
  // return isProduction ? 'q-back.up.railway.app' : getDevelopmentHost();
}

function shouldUseHttps() {
  return isProduction || (!isProduction && config.development.useHttps);
}

function getApiUrl(): string {
  const protocol = shouldUseHttps() ? "https" : "http";
  const portPart = isProduction ? "" : `:${config.restApiPort}`;
  const apiUrl = `${protocol}://${getHost()}${portPart}`;
  return apiUrl;
}

function getApiWsUrl(): string {
  const protocol = shouldUseHttps() ? "wss" : "ws";
  const portPart = isProduction ? "" : `:${config.restApiPort}`;
  return protocol + "://" + getHost() + portPart;
}

export default {
  getApiUrl,
  getApiWsUrl,
};
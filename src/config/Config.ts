const env = process.env;

export const Config = {
  DEBUG: env.NODE_ENV ? env.NODE_ENV === "development" : true,
  API_BASE_URL: env.REACT_APP_API_BASE_URL || "http://localhost:5000/",
};

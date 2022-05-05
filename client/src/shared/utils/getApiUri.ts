const getApiUri = () => {
  return process.env.REACT_APP_BACKEND_URI || "http://localhost:5000/api";
};

export default getApiUri;

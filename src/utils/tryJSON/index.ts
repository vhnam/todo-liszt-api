const tryJSON = (value: any) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export default tryJSON;

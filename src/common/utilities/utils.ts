export const jsonAcceptable = (value: any) => {
  try {
    const j = JSON.stringify(value);
    const p = JSON.parse(j);

    return true;
  } catch (err: any) {
    return false;
  }
};

export const isJson = (string: any) => {
  try {
    JSON.parse(string);
    return true;
  } catch (error) {
    return false;
  }
};

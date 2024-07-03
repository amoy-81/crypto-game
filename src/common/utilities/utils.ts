export const jsonAcceptable = (value: any) => {
  try {
    const j = JSON.stringify(value);
    const p = JSON.parse(j);

    return true;
  } catch (err: any) {
    return false;
  }
};

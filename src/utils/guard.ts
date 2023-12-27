export const exhaustiveGuard = (_value: never): void => {
  throw new Error(
    `Error! Reached forbidden guard function with unexpected value: ${JSON.stringify(_value)}`
  );
};

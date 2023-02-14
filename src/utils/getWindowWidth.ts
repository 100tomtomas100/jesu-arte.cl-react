const getWindowWidth = (): number => {
  const { innerWidth: width }: {innerWidth: number} = window;
  return width;
};

export default getWindowWidth;

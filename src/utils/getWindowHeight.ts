const getWindowHeight = (): number => {
  const { innerHeight: height }: { innerHeight: number } = window;
  return height;
};

export default getWindowHeight;

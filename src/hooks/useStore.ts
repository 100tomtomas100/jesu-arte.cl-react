import { create } from "zustand";

interface GalStoreProps {
  imgPrevCurrNext: { [key: string]: number };
  setImgPrevCurrNext: (input: { [key: string]: number }) => void;
  largeGalOn: boolean;
  setLargeGalOn: (input: boolean) => void;
  splitImg: Splitting.Result | null;
  setSplitImg: (input: Splitting.Result | null) => void;
  largeGalAnimRunning: boolean;
  setLargeGalAnimRunning: (input: boolean) => void;
  loadedImages: { [key: string]: boolean };
  setLoadedImages: (input: { [key: string]: boolean }) => void;
}

const useGalStore = create<GalStoreProps>((set) => ({
  imgPrevCurrNext: {},
  setImgPrevCurrNext: (input) => set(() => ({ imgPrevCurrNext: input })),
  largeGalOn: false,
  setLargeGalOn: (input) => set(() => ({ largeGalOn: input })),
  splitImg: null,
  setSplitImg: (input) => set(() => ({ splitImg: input })),
  largeGalAnimRunning: false,
  setLargeGalAnimRunning: (input) =>
    set(() => ({ largeGalAnimRunning: input })),
  loadedImages: {},
  setLoadedImages: (input) => set(() => ({ loadedImages: input })),
}));

export default useGalStore;

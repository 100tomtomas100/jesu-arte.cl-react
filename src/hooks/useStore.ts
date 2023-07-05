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


interface BlogStoreProps{
  postsToLoad: number
  setPostsToLoad: () => void
  postData: {[key:string]:any}
  setPostData: (input: {[key:string]: any}) => void
}

export const useBlogStore = create<BlogStoreProps>((set) => ({
  postsToLoad: 2,
  setPostsToLoad: () => set((state) => ({postsToLoad: state.postsToLoad + 2})),
  postData: {},
  setPostData: (input) => set(() => ({postData: input})),
}))

interface BuyProps {
  shoppingCart: { [key: string]: any };
  counter: number;
  setShoppingCart: (input: { [key: string]: any }, fromLocal?: boolean) => void;
  formOpen: boolean;
  setFormOpen: (input: boolean) => void
}

export const useBuyStore = create<BuyProps>((set) => ({
  shoppingCart: {},
  counter: 0,
  setShoppingCart: (input, fromLocal) =>
    set((state) => ({
      shoppingCart: fromLocal ? input : { ...state.shoppingCart, [state.counter]: input },
      counter: fromLocal? 1 + Number(Object.keys(input)[Object.keys(input).length-1]) :state.counter + 1,
    })),
  formOpen: false,
  setFormOpen: (input) => set(() => ({formOpen: input}))
}));

export default useGalStore;

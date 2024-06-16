import { create } from "zustand";
import { getItem, setItem } from "../constant/stoage.utils";

interface GlobalState {
  loading: boolean;
}

export interface GlobalStore extends GlobalState {
  setLoading: (flag: boolean) => void;
}

const initialState: Pick<GlobalStore, keyof GlobalState> = {
  loading: getItem("loading") ?? false,
};

const useGlobalStore = create<GlobalStore>()((set) => ({
  ...initialState,
  setLoading: (flag: boolean) => {
    set((state) => {
      if (window) {
        setItem("loading", flag);
      }
      return { ...state, loading: flag };
    });
  },
}));

export default useGlobalStore;

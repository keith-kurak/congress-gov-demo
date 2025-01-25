import { useAtom } from "jotai";
import { atomWithStorage, createJSONStorage, RESET } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = createJSONStorage(() => AsyncStorage);
const ratingsAtom = atomWithStorage<any>("ratings", {}, storage);

export function useRateMyCongressperson(memberId: string) {
  const [ratings, setRatings] = useAtom(ratingsAtom);

  const rate = async (rating: number) => {
    await setRatings(async (prev: any) => {
      const updatedRatings = { ...await prev, [memberId]: rating };
      return updatedRatings;
    });
  };

  const reset = async () => {
    setRatings(RESET);
  };

  return { rate, reset, rating: ratings?.[memberId] };
}
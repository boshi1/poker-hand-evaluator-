import {
  CardsText,
  CardDuplicate,
  CardSusitsArr,
  DubicatCoun,
  Cardsuits,
  deck,
} from "./typeofhand.interface";
import { SignToNumber } from "./typeofhand.constant";

export const GetDuplicatesPosition = (arr: Array<CardsText>): CardDuplicate => {
  const duplicates = {} as CardDuplicate;
  for (let i = 0; i < arr.length; i++) {
    const key = arr[i];
    if (key in duplicates) {
      duplicates[key].push(i);
    } else if (arr.lastIndexOf(key) !== i) {
      duplicates[key] = [i];
    }
  }
  return duplicates;
};

export const GetNumberOfDuplicates = (
  arr: CardSusitsArr
): Array<DubicatCoun> => {
  const counts = {} as any;
  arr.forEach((x) => (counts[x] = (counts[x] || 0) + 1));
  const Maps: Array<DubicatCoun> = Object.keys(counts).map((value: any) => {
    return { type: value as Cardsuits, count: parseInt(counts[value]) };
  });
  Maps.sort((a, b) => a.count - b.count);
  return Maps;
};

export const GetCardSum = (arr: Array<deck>): number => {
  let Sum = 0;
  arr.map((data) => {
    Sum += SignToNumber[data.split("")[0]];
  });

  return Sum;
};

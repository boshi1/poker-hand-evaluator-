import {
  CardDuplicate,
  StraightType,
  HandVariant,
  CardType,
  CardsText,
  deck,
  DubicatCoun,
  Cards,
  Cardsuits,
} from "./typeofhand.interface";
import { CardDeck, CardToSign } from "./typeofhand.constant";

import {
  GetNumberOfDuplicates,
  GetDuplicatesPosition,
  GetCardSum,
} from "./utils";
const HigestStraight = (arr: Array<Cards>): CardType => {
  const uniq: Array<Cards> = [...new Set(arr)];
  if (uniq.length >= 5) {
    const arrOfarr =
      uniq.length == 7
        ? [arr.slice(0, 5), arr.slice(1, 6), arr.slice(2, 7)]
        : uniq.length == 6
        ? [arr.slice(0, 5), arr.slice(1, 6)]
        : [uniq];
    const data = arrOfarr.filter((data) => {
      return data.every(
        (elt, idx, arr) =>
          !idx || elt === arr[idx - 1] || elt === arr[idx - 1] - 1
      );
    });

    return {
      type: data.length >= 1,
      cards: data.length > 0 ? data[0] : [],
      rank: 6,
      name: "Straight",
    };
  } else {
    return { type: false, rank: 20, cards: [], name: "Straight" };
  }
};
const IsRoyalFl = (
  Cards: Array<Cards>,
  ND: Array<DubicatCoun>,
  Hand: Array<deck>
): StraightType => {
  if (
    ND[0].count == 5 &&
    Cards.includes(14) &&
    Cards.includes(13) &&
    Cards.includes(12) &&
    Cards.includes(11) &&
    Cards.includes(10)
  ) {
    let Exit = true;
    const arr = [14, 13, 12, 11, 10].map((data) => {
      if (!Hand.includes(`${CardToSign[data]}${ND[0].type}` as deck)) {
        Exit = false;
      }
      return (CardToSign[data] + ND[0].type) as deck;
    });
    if (!Exit) {
      return { type: false, rank: 1, cards: [], name: "straight_royal" };
    }
    return { type: true, rank: 1, cards: arr, name: "straight_royal" };
  } else {
    return { type: false, rank: 1, cards: [], name: "straight_royal" };
  }
};
const IsStraightFlush = (
  Vals: CardType,
  ND: Array<DubicatCoun>,
  Hand: Array<deck>
): StraightType => {
  if (ND[0].count == 5 && Vals.type) {
    let Exit = true;
    const arr = Vals.cards.map((data) => {
      if (!Hand.includes(`${CardToSign[data]}${ND[0].type}` as deck)) {
        Exit = false;
      }
      return (CardToSign[data] + ND[0].type) as deck;
    });
    if (!Exit) {
      return { type: false, rank: 2, cards: [], name: "straight_royal" };
    }
    return { type: true, rank: 2, cards: arr, name: "straight_flush" };
  } else {
    return { type: false, rank: 2, cards: [], name: "straight_flush" };
  }
};
const IsFlush = (Hand: Array<deck>, ND: Array<DubicatCoun>): StraightType => {
  if (ND[0].count == 5) {
    let arr = Hand.filter((data) => data.includes(ND[0].type));
    arr = arr.map((data) => {
      return `${data.split("")[0]}${ND[0].type}` as deck;
    });
    return { type: true, rank: 4, cards: arr, name: "flush" };
  } else {
    return { type: false, rank: 4, cards: [], name: "flush" };
  }
};

const evalStraight = (
  Cards: Array<Cards>,
  SuitsInhand: Array<Cardsuits>,
  Hand: Array<deck>
): StraightType => {
  Cards = Cards.sort((a, b) => b - a);
  const ND: Array<DubicatCoun> = GetNumberOfDuplicates(SuitsInhand);
  let Vals: CardType = HigestStraight(Cards);
  if (Cards.includes(14) && Cards.includes(2) && Vals.type === false) {
    Cards.splice(0, 1);
    Cards.splice(Cards.length - 1, 0, 1);
    Vals = HigestStraight(Cards);
  }

  const isRoyal = IsRoyalFl(Cards, ND, Hand);
  if (isRoyal.type !== false) {
    return isRoyal;
  }
  const isStrighflu = IsStraightFlush(Vals, ND, Hand);
  if (isStrighflu.type !== false) {
    return isStrighflu;
  }
  const isfliush = IsFlush(Hand, ND);
  if (isfliush.type !== false) {
    return isfliush;
  }
  const StraightAnswer: StraightType = {
    type: Vals.type,
    name: Vals.name,
    rank: Vals.rank,
    cards: Vals.cards.map((data) => {
      return Hand[Cards.indexOf(data)];
    }),
  };
  return StraightAnswer;
};
function CheckIfStraight(Item: Array<string>): StraightType {
  const Firsts: Array<number> = [];
  const Letters: Array<string> = [];

  Item.map((data: string) => {
    const Number: string = data.split("")[0];
    let AsNumber = 0;
    switch (Number) {
      case "T":
        AsNumber = 10;
        break;
      case "J":
        AsNumber = 11;
        break;
      case "Q":
        AsNumber = 12;
        break;
      case "K":
        AsNumber = 13;
        break;
      case "A":
        AsNumber = 14;
        break;

      default:
        AsNumber = parseInt(Number);
        break;
    }
    Firsts.push(AsNumber);
    Letters.push(data.split("")[1]);
  });
  return evalStraight(
    Firsts as Array<Cards>,
    Letters as Array<Cardsuits>,
    Item as Array<deck>
  );
}
const getDuplicates = (
  Firsts: Array<CardsText>,
  FullArray: Array<string>
): StraightType => {
  const duplicates: CardDuplicate = GetDuplicatesPosition(Firsts);
  if (duplicates === undefined) {
    return { type: false, rank: 20, cards: [] };
  }
  const ArryOfCard: Array<{
    rank: number;
    subrank: number;
    arr: Array<number>;
    name: string;
  }> = [];
  Object.keys(duplicates).map((key) => {
    if (duplicates[key].length > 3) {
      ArryOfCard.push({
        rank: 3,
        subrank: 1,
        arr: duplicates[key],
        name: "four pairs",
      });
    } else if (
      duplicates[key].length > 2 &&
      Object.keys(duplicates).length > 1
    ) {
      ArryOfCard.push({
        rank: 4,
        subrank: 2,
        arr: duplicates[key],
        name: "Full house",
      });
    } else if (duplicates[key].length > 2) {
      ArryOfCard.push({
        rank: 7,
        subrank: 3,
        arr: duplicates[key],
        name: "three of a kind",
      });
    } else if (
      duplicates[key].length == 2 &&
      Object.keys(duplicates).length > 1
    ) {
      ArryOfCard.push({
        rank: 8,
        subrank: 4,
        arr: duplicates[key],
        name: "two pairs",
      });
    } else if (
      duplicates[key].length == 2 &&
      Object.keys(duplicates).length == 1
    ) {
      ArryOfCard.push({
        rank: 9,
        subrank: 5,
        arr: duplicates[key],
        name: "one pairs",
      });
    }
  });
  ArryOfCard.sort(
    (a: { subrank: number }, b: { subrank: number }) => a.subrank - b.subrank
  );
  if (ArryOfCard.length > 0) {
    return {
      type: true,
      name: ArryOfCard[0].name,
      rank: ArryOfCard[0].subrank,
      cards: ArryOfCard[0].arr.map((data: number) => {
        return FullArray[data] as deck;
      }) as Array<deck>,
    };
  } else {
    return { type: false, rank: 11, name: "", cards: [] as Array<deck> };
  }
};
function CheckIfPairs(Item: Array<string>): StraightType {
  const Firsts: Array<CardsText> = [];
  const Letters: Array<string> = [];

  Item.map((data: string) => {
    const Number: string = data.split("")[0];
    Firsts.push(Number as CardsText);
    Letters.push(data.split("")[1]);
  });

  return getDuplicates(Firsts, Item);
}
const GetCardThing = (cardDeck: Array<deck>, GetSum = false): HandVariant => {
  const CardArr: Array<StraightType> = [];
  const SqCheck: StraightType = CheckIfStraight(cardDeck);
  const TypeChecl: StraightType = CheckIfPairs(cardDeck);

  if (SqCheck.type) {
    CardArr.push(SqCheck);
  }

  if (TypeChecl.type) {
    CardArr.push(TypeChecl);
  }

  if (CardArr.length > 0) {
    CardArr.sort((a: { rank: number }, b: { rank: number }) => b.rank - a.rank);

    return {
      type: true,
      name: CardArr[0].name,
      rank: CardArr[0].rank,
      sum: GetSum ? GetCardSum(cardDeck) : 0,
      Variants: CardArr,
      cards: CardArr[0].cards,
    };
  } else {
    return { type: false, sum: 0, name: "No-match", Variants: [], cards: [] };
  }
};
//GetCardThing(CardDeck);
export { GetCardThing };

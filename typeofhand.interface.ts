type Cardsuits = "a" | "h" | "d" | "c";
type Cards = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
type deck =
  | "2c"
  | "2d"
  | "2h"
  | "2s"
  | "3c"
  | "3d"
  | "3h"
  | "3s"
  | "4c"
  | "4d"
  | "4h"
  | "4s"
  | "5c"
  | "5d"
  | "5h"
  | "5s"
  | "6c"
  | "6d"
  | "6h"
  | "6s"
  | "7c"
  | "7d"
  | "7h"
  | "7s"
  | "8c"
  | "8d"
  | "8h"
  | "8s"
  | "9c"
  | "9d"
  | "9h"
  | "9s"
  | "Tc"
  | "Td"
  | "Th"
  | "Ts"
  | "Jc"
  | "Jd"
  | "Jh"
  | "Js"
  | "Qc"
  | "Qd"
  | "Qh"
  | "Qs"
  | "Kc"
  | "Kd"
  | "Kh"
  | "Ks"
  | "Ac"
  | "Ad"
  | "Ah"
  | "As";
type CardsText =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "T"
  | "J"
  | "Q"
  | "K"
  | "A";
interface CardType {
  type: boolean;
  name?: string;
  rank: number;
  cards: Array<Cards>;
}
interface StraightType {
  type: boolean;
  name?: string;
  rank: number;
  cards: Array<deck>;
}

interface HandVariant {
  type: boolean;
  name?: string;
  sum: number;
  rank?: number;
  Variants?: Array<StraightType>;
  cards: Array<deck>;
}
type CardSusitsArr = Array<Cardsuits>;

interface DubicatCoun {
  type: Cardsuits;
  count: number;
}
type CardDuplicate = {
  [id: string]: Array<number>;
};
export {
  CardDuplicate,
  CardSusitsArr,
  DubicatCoun,
  StraightType,
  CardType,
  CardsText,
  deck,
  HandVariant,
  Cards,
  Cardsuits,
};

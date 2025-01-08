export const LOTTO_PRICE = 1000;

export const LOTTO_INFO = {
  count: 6,
  start: 1,
  end: 45,
  possibleSecondRankMatch: 5,
};

type LottoResult = {
  match: number;
  prize: number;
};

type LottoResultMap = {
  [key: number]: LottoResult;
};

export const LOTTO_RESULT: LottoResultMap = {
  5: {
    match: 3,
    prize: 5000,
  },
  4: {
    match: 4,
    prize: 50000,
  },
  3: {
    match: 5,
    prize: 1500000,
  },
  2: {
    match: 5,
    prize: 30000000,
  },
  1: {
    match: 6,
    prize: 200000000,
  },
};

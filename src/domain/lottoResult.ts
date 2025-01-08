import { LOTTO_INFO, LOTTO_RESULT } from '../components/constants/lotto';
import { lotto, WinningLotto } from '../types/lotto';

type LottoResultCountMap = { [rank: number]: number };

export const calculateLottoResult = (lottos: lotto[], winningLotto: WinningLotto) => {
  // 결과를 저장할 맵(등수: 나온 개수) 초기화
  const resultCountMap: LottoResultCountMap = Object.keys(LOTTO_RESULT).reduce((map, rank) => {
    map[Number(rank)] = 0;
    return map;
  }, {} as LottoResultCountMap);

  const getMatchedNumberCount = (lotto: lotto) => {
    return lotto.filter((num) => winningLotto.basic.includes(num)).length;
  };

  lottos.forEach((lotto) => {
    const count = getMatchedNumberCount(lotto);

    // 2등, 3등 계산
    if (count === LOTTO_INFO.possibleSecondRankMatch) {
      if (lotto.includes(winningLotto.bonus)) {
        resultCountMap[2]++; // 2등
      } else {
        resultCountMap[3]++; // 3등
      }
      return;
    }

    // 그 외의 등수 검사
    Object.entries(LOTTO_RESULT).forEach(([rank, value]) => {
      if (value.match === count) {
        resultCountMap[Number(rank)]++;
      }
    });
  });

  return {
    resultCountMap,
    ranks: Object.keys(resultCountMap).map(Number),
  };
};

export const calculateTotalPrize = (resultCountMap: LottoResultCountMap): number => {
  return Object.keys(resultCountMap).reduce((sum, rank) => {
    const count = resultCountMap[Number(rank)];
    return sum + LOTTO_RESULT[Number(rank)].prize * count;
  }, 0);
};
export const calculateProfitRate = (money: number, totalPrize: number): number => {
  if (money === 0) return 0;

  const rate = (totalPrize / money) * 100;
  return Math.round(rate * 100) / 100;
};

import { lotto, WinningLotto } from '../../../types/lotto';
import { Portal, Button } from '../../common';
import { LOTTO_RESULT, LOTTO_INFO } from '../../constants/lotto';
import * as S from './styles';

interface ResultModalProps {
  money: number;
  lottos: lotto[];
  winningLotto: WinningLotto | null;
  closeModal: () => void;
  resetLottoGame: () => void;
}

const ResultModal = ({ money, lottos, winningLotto, resetLottoGame, closeModal }: ResultModalProps) => {
  if (!winningLotto) return;

  const resultCountMap = new Map<number, number>(); // { 등수: 개수 }
  Object.keys(LOTTO_RESULT).forEach((rank) => resultCountMap.set(Number(rank), 0));

  const getMatchedNumberCount = (lotto: lotto) => {
    return lotto.filter((num) => winningLotto.basic.includes(num)).length;
  };

  lottos.forEach((lotto) => {
    const count = getMatchedNumberCount(lotto);

    if (count === LOTTO_INFO.possibleSecondRankMatch) {
      if (lotto.includes(winningLotto.bonus)) {
        resultCountMap.set(2, (resultCountMap.get(2) || 0) + 1);
        return;
      }

      resultCountMap.set(3, (resultCountMap.get(3) || 0) + 1);
      return;
    }

    // 나머지 등수 처리
    Object.entries(LOTTO_RESULT).forEach(([key, value]) => {
      const rank = LOTTO_INFO.count - Number(key);

      if (value.match === count) {
        resultCountMap.set(rank, (resultCountMap.get(rank) || 0) + 1);
      }
    });
  });

  const ranks = [...resultCountMap.keys()];
  const reversedMatchedCounts = [...resultCountMap.values()].reverse();

  const totalPrize = ranks.reduce((sum, rank) => {
    return sum + LOTTO_RESULT[LOTTO_INFO.count - rank].prize * (resultCountMap.get(rank) || 0);
  }, 0);

  const getProfitRate = () => {
    const profitRate = (totalPrize / money) * 100;
    return Math.round(profitRate * 100) / 100;
  };

  return (
    <Portal>
      <S.ModalBackground>
        <S.ResultModal>
          <S.Header>
            <button
              type="button"
              onClick={closeModal}
              style={{
                cursor: 'pointer',
                marginRight: '28px',
                backgroundColor: 'transparent',
                border: 'none',
              }}
            >
              ✖
            </button>
          </S.Header>
          <S.Title>당첨 통계</S.Title>

          <S.ResultTable>
            <thead>
              <tr>
                <th>일치 개수</th>
                <th>당첨금</th>
                <th>당첨 개수</th>
              </tr>
            </thead>
            <tbody>
              {ranks.map((rank, index) => (
                <tr key={rank}>
                  <td>{LOTTO_RESULT[rank].match}개</td>
                  <td>{LOTTO_RESULT[rank].prize.toLocaleString()}원</td>
                  <td>{reversedMatchedCounts[index]}개</td>
                </tr>
              ))}
            </tbody>
          </S.ResultTable>

          <S.RateLabel>당신의 총 수익률은 {getProfitRate()}% 입니다.</S.RateLabel>
          <Button
            onClick={() => {
              resetLottoGame();
              closeModal();
            }}
            $style={{ fontWeight: 'bold', width: '90%', height: '45px', margin: '0 auto', borderRadius: '3px' }}
          >
            다시 시작하기
          </Button>
        </S.ResultModal>
      </S.ModalBackground>
    </Portal>
  );
};

export default ResultModal;

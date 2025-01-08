import { lotto, WinningLotto } from '../../../types/lotto';
import { Portal, Button } from '../../common';
import { LOTTO_RESULT } from '../../constants/lotto';
import * as S from './styles';
import { calculateLottoResult, calculateProfitRate, calculateTotalPrize } from '../../../domain/lottoResult';

interface ResultModalProps {
  money: number;
  lottos: lotto[];
  winningLotto: WinningLotto;
  closeModal: () => void;
  resetLottoGame: () => void;
}

type MatchedLottoLabel = { [rank: number]: string };

const ResultModal = ({ money, lottos, winningLotto, resetLottoGame, closeModal }: ResultModalProps) => {
  const { resultCountMap, ranks } = calculateLottoResult(lottos, winningLotto);
  const totalPrize = calculateTotalPrize(resultCountMap);
  const profitRate = calculateProfitRate(money, totalPrize);

  const MATCHED_LOTTO_LABEL: MatchedLottoLabel = Object.entries(LOTTO_RESULT).reduce((labels, [rank, result]) => {
    if (Number(rank) === 2) {
      labels[Number(rank)] = '5개+보너스볼';
    } else {
      labels[Number(rank)] = `${result.match}개`;
    }
    return labels;
  }, {} as MatchedLottoLabel);

  const handleRestartClick = () => {
    resetLottoGame();
    closeModal();
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
              {ranks.reverse().map((rank: number) => (
                <tr key={rank}>
                  <td>{MATCHED_LOTTO_LABEL[rank]}</td>
                  <td>{LOTTO_RESULT[rank].prize.toLocaleString()}원</td>
                  <td>{resultCountMap[rank]}개</td>
                </tr>
              ))}
            </tbody>
          </S.ResultTable>

          <S.RateLabel>당신의 총 수익률은 {profitRate}% 입니다.</S.RateLabel>

          <Button
            onClick={handleRestartClick}
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

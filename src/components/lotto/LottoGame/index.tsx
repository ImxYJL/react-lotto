import * as S from './styles';
import { LottoStore, LottoDisplay, WinningLottoPanel, ResultModal } from '../index';

import useModal from '../../../hooks/useModalState';
import { LOTTO_PRICE } from '../../constants/lotto';
import useLottos from '../../../hooks/useLottos';
import useWinningLotto from '../../../hooks/useWinningLotto';
import useMoney from '../../../hooks/useMoney';

const LottoGame = () => {
  const { money, initMoney, setValidateMoney } = useMoney();
  const lottoCount = money / LOTTO_PRICE;

  const { lottos } = useLottos({ lottoCount });

  const { winningLotto, initWinningLotto, setValidWinningLotto } = useWinningLotto();

  const { isModalOpen, openModal, closeModal } = useModal();

  const isLottoGenerated = money > 0 && lottos.length === lottoCount;

  const handleWinningLottoSubmit = (isValid: boolean) => {
    if (isValid) openModal();
  };

  const resetLottoGame = () => {
    initMoney();
    initWinningLotto();
  };

  return (
    <S.LottoGame>
      <LottoStore money={money} setMoney={setValidateMoney} />
      {isLottoGenerated && (
        <>
          <LottoDisplay lottoCount={lottoCount} lottos={lottos} />
          <WinningLottoPanel onSubmit={handleWinningLottoSubmit} setWinningNumber={setValidWinningLotto} />
        </>
      )}

      {isModalOpen && (
        <ResultModal
          lottos={lottos}
          money={money}
          winningLotto={winningLotto}
          resetLottoGame={resetLottoGame}
          closeModal={closeModal}
        />
      )}
    </S.LottoGame>
  );
};

export default LottoGame;

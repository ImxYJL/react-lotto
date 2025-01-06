import * as S from './styles';
import { LottoStore, LottoDisplay, WinningLottoPanel } from '../index';
import { useState } from 'react';
import { LOTTO_PRICE, LOTTO_INFO } from '../../constants/lotto';
import useLottos from '../../../hooks/useLottos';
import { WinningLotto } from '../../../types/lotto';

const LottoGame = () => {
  const [money, setMoney] = useState(0);
  const lottoCount = money / LOTTO_PRICE;
  const { lottos = [] } = useLottos({ lottoCount });
  const [winningLotto, setWinningLotto] = useState<WinningLotto | null>(null);

  const setValidateMoney = (value: number) => {
    if (value % LOTTO_PRICE !== 0) {
      alert('금액은 1000원 단위여야 합니다.');
      return;
    }

    setMoney(value);
  };

  const setValidWinningLotto = (numbers: number[], bonusNumber: number) => {
    const totalNumber = [...numbers, bonusNumber];

    if (new Set(totalNumber).size !== totalNumber.length) {
      alert('로또 번호는 중복될 수 없습니다.');
      return;
    }

    if (!totalNumber.every((num) => num <= LOTTO_INFO.end && num >= LOTTO_INFO.start)) {
      alert('로또 번호는 1 ~ 45 사이의 숫자입니다.');
      return;
    }

    setWinningLotto({
      basic: [...numbers],
      bonus: bonusNumber,
    });
  };

  const resetLottoGame = () => {
    setMoney(0);
    setWinningLotto(null);
  };

  const isLottoGenerated = money > 0 && lottos.length === lottoCount;

  return (
    <S.LottoGame>
      <LottoStore money={money} setMoney={setValidateMoney} />
      {isLottoGenerated && (
        <>
          <LottoDisplay lottoCount={lottoCount} lottos={lottos} />
          <WinningLottoPanel
            money={money}
            lottos={lottos}
            validateWinningLotto={winningLotto}
            setWinningNumber={setValidWinningLotto}
            resetLottoGame={resetLottoGame}
          />
        </>
      )}
    </S.LottoGame>
  );
};

export default LottoGame;

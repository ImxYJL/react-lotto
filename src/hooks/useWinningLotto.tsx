import { useState } from 'react';
import { lotto, WinningLotto } from '../types/lotto';
import { LOTTO_INFO } from '../components/constants/lotto';

const useWinningLotto = () => {
  const [winningLotto, setWinningLotto] = useState<WinningLotto | null>(null);

  const validateWinningLotto = (numbers: lotto, bonusNumber: number): boolean => {
    const totalNumber = [...numbers, bonusNumber];

    const isUniqueNumber = new Set(totalNumber).size === totalNumber.length;
    if (!isUniqueNumber) {
      alert('로또 번호는 중복될 수 없습니다.');
      return false;
    }

    const isInLottoRange = totalNumber.every((num) => num <= LOTTO_INFO.end && num >= LOTTO_INFO.start);
    if (!isInLottoRange) {
      alert(`로또 번호는 ${LOTTO_INFO.start} ~ ${LOTTO_INFO.end} 사이의 숫자입니다.`);
      return false;
    }

    return true;
  };

  const setValidWinningLotto = (numbers: lotto, bonusNumber: number): boolean => {
    const isValid = validateWinningLotto(numbers, bonusNumber);

    if (isValid) {
      setWinningLotto({ basic: [...numbers], bonus: bonusNumber });
      return true;
    }

    return false;
  };

  const initWinningLotto = () => setWinningLotto(null);

  return { winningLotto, initWinningLotto, setValidWinningLotto };
};

export default useWinningLotto;

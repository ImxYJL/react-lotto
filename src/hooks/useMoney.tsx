import { useState } from 'react';
import { LOTTO_PRICE } from '../components/constants/lotto';

const useMoney = () => {
  const [money, setMoney] = useState(0);

  const validateMoney = () => {
    const isDivisibleByLottoPrice = money % LOTTO_PRICE === 0;

    if (!isDivisibleByLottoPrice) {
      alert(`금액은 ${LOTTO_PRICE}원 단위여야 합니다.`);
      return false;
    }
    return true;
  };

  const initMoney = () => {
    setMoney(0);
  };

  const setValidateMoney = (value: number): boolean => {
    const isValidMoney = validateMoney();
    if (isValidMoney) setMoney(value);

    return isValidMoney;
  };

  return { money, initMoney, setValidateMoney };
};

export default useMoney;

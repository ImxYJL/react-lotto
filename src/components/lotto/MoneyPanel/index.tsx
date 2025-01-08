import * as S from './styles';
import { Button, Input } from '../../common/index';
import { useEffect, useState } from 'react';
import { checkIsInteger } from '../../../utils/number';
import { checkIsEmptyInput } from '../../../utils/string';
interface MoneyPanelProps {
  money: number;
  setMoney: (value: number) => boolean;
}

const MoneyPanel = ({ money, setMoney }: MoneyPanelProps) => {
  const [moneyInput, setMoneyInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMoneyInput(e.target.value);
  };

  const validateInputValue = () => {
    if (checkIsEmptyInput(moneyInput)) {
      alert('금액을 입력해주세요.');
      return false;
    }

    if (!checkIsInteger(moneyInput)) {
      alert('숫자만 입력해주세요.');
      return false;
    }

    return true;
  };

  const getMoneyValidation = (): boolean => {
    const numericValue = Number(moneyInput);
    const isValidMoney = setMoney(numericValue);

    return isValidMoney;
  };

  const handlePurchaseClick = () => {
    if (!validateInputValue()) return;

    getMoneyValidation();
  };

  useEffect(() => {
    if (money === 0) setMoneyInput('');
  }, [money]);

  return (
    <S.MoneyPanel>
      <S.GuideMessage>구입할 금액을 입력해주세요.</S.GuideMessage>
      <S.InputContainer>
        <Input
          type="number"
          value={moneyInput}
          placeholder="금액"
          $style={{ width: '80%', height: 'auto' }}
          onChange={handleInputChange}
        />
        <Button onClick={handlePurchaseClick} $style={{ height: '100%;', borderRadius: '3px' }}>
          구입
        </Button>
      </S.InputContainer>
    </S.MoneyPanel>
  );
};

export default MoneyPanel;

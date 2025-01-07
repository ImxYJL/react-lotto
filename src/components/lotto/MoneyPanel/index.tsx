import * as S from './styles';
import { Button, Input } from '../../common/index';
import { useEffect, useState } from 'react';
import { checkIsInteger } from '../../../utils/number';
import { checkIsEmptyInput } from '../../../utils/string';
interface MoneyPanelProps {
  money: number;
  setMoney: (value: number) => void;
}

const MoneyPanel = ({ money, setMoney }: MoneyPanelProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handlePurchaseClick = () => {
    if (checkIsEmptyInput(inputValue)) {
      alert('금액을 입력해주세요.');
      return;
    }

    if (!checkIsInteger(inputValue)) {
      alert('숫자만 입력해주세요.');
      return;
    }

    const numericValue = Number(inputValue);
    setMoney(numericValue);
  };

  useEffect(() => {
    if (money === 0) setInputValue('');
  }, [money]);

  return (
    <S.MoneyPanel>
      <S.GuideMessage>구입할 금액을 입력해주세요.</S.GuideMessage>
      <S.InputContainer>
        <Input
          type="number"
          value={inputValue}
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

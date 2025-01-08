import * as S from './styles';
import { LOTTO_INFO } from '../../constants/lotto';
import { Button } from '../../common';
import { useState } from 'react';
import { InputContainer } from '../index';

import { checkIsEmptyInput } from '../../../utils/string';
import { checkIsInteger } from '../../../utils/number';
interface WinningLottoPanelProps {
  onSubmit: (isValid: boolean) => void;
  setWinningNumber: (numbers: number[], bonusNumber: number) => boolean;
}

const WinningLottoPanel = ({ onSubmit, setWinningNumber }: WinningLottoPanelProps) => {
  const [winningLottoInput, setWinningLotto] = useState<string[]>(Array(LOTTO_INFO.count).fill(''));
  const [bonusNumberInput, setBonusNumberInput] = useState('');

  const handleInputChange = (index: number, value: string) => {
    setWinningLotto((prev) => {
      return prev.map((num, idx) => (idx === index ? value : num));
    });
  };

  // 기본 input 검증
  const validateInput = () => {
    const isCompleteInput =
      winningLottoInput.every((num) => !checkIsEmptyInput(num)) && !checkIsEmptyInput(bonusNumberInput);

    if (!isCompleteInput) {
      alert('로또 번호 입력을 완료해주세요.');
      return false;
    }

    const isValidNumber = winningLottoInput.every((num) => checkIsInteger(num)) && checkIsInteger(bonusNumberInput);
    if (!isValidNumber) {
      alert('숫자만 입력해주세요.');
      return false;
    }

    return true;
  };

  // useWinningLotto의 함수로 도메인 관련 유효성 검증
  const getWinningLottoValidation = (): boolean => {
    const numericLottos = winningLottoInput.map(Number);
    const numericBonusNumber = Number(bonusNumberInput);

    const isValidWinningNumber = setWinningNumber(numericLottos, numericBonusNumber);
    return isValidWinningNumber;
  };

  const handleSubmit = () => {
    if (!validateInput()) return;

    const isModalOpenable = getWinningLottoValidation();
    onSubmit(isModalOpenable); 
  };

  return (
    <S.WinningLottoPanel>
      <S.GuideMessage>지난 주 당첨번호 {LOTTO_INFO.count}개와 보너스 번호 1개를 입력해주세요.</S.GuideMessage>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
        <InputContainer
          label="당첨 번호"
          count={LOTTO_INFO.count}
          values={winningLottoInput}
          onChange={handleInputChange}
        />
        <InputContainer
          label="보너스 번호"
          count={1}
          values={[bonusNumberInput]}
          onChange={(_, value) => setBonusNumberInput(value)}
          $inputStyle={{ justifyContent: 'flex-end' }}
        />
      </div>
      <Button onClick={handleSubmit} $style={{ width: '100%', margin: '0 auto', borderRadius: '3px' }}>
        결과 확인하기
      </Button>
    </S.WinningLottoPanel>
  );
};

export default WinningLottoPanel;

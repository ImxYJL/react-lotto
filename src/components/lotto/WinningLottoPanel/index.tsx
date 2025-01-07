import * as S from './styles';
import { LOTTO_INFO } from '../../constants/lotto';
import { Button } from '../../common';
import { useState } from 'react';
import { ResultModal, InputContainer } from '../index';
import { lotto, WinningLotto } from '../../../types/lotto';
import { checkIsEmptyInput } from '../../../utils/string';
import { checkIsInteger } from '../../../utils/number';
interface WinningLottoPanelProps {
  validateWinningLotto: WinningLotto | null;
  money: number;
  lottos: lotto[];
  setWinningNumber: (numbers: number[], bonusNumber: number) => void;
  resetLottoGame: () => void;
  isModalOpen: boolean;
  closeModal: () => void;
}

const WinningLottoPanel = ({
  money,
  lottos,
  validateWinningLotto,
  isModalOpen,
  resetLottoGame,
  setWinningNumber,
  closeModal,
}: WinningLottoPanelProps) => {
  const [winningLottoInput, setWinningLotto] = useState<string[]>(Array(LOTTO_INFO.count).fill(''));
  const [bonusNumberInput, setBonusNumberInput] = useState('');

  const handleWinningLottoInputChange = (index: number, value: string) => {
    setWinningLotto((prev) => {
      return prev.map((num, idx) => (idx === index ? value : num));
    });
  };

  const handleSubmit = () => {
    const isCompleteInput =
      winningLottoInput.every((num) => !checkIsEmptyInput(num)) && !checkIsEmptyInput(bonusNumberInput);

    if (!isCompleteInput) {
      alert('로또 번호 입력을 완료해주세요.');
      return;
    }

    const isValidNumber = winningLottoInput.every((num) => checkIsInteger(num)) && checkIsInteger(bonusNumberInput);
    if (!isValidNumber) {
      alert('숫자만 입력해주세요.');
      return;
    }

    const numericLottos = winningLottoInput.map(Number);
    const numericBonusNumber = Number(bonusNumberInput);

    setWinningNumber(numericLottos, numericBonusNumber);
  };

  return (
    <S.WinningLottoPanel>
      <S.GuideMessage>
        지난 주 당첨번호 {LOTTO_INFO.count}개와 보너스 번호 {1}개를 입력해주세요.
      </S.GuideMessage>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
        <InputContainer
          label="당첨 번호"
          count={LOTTO_INFO.count}
          values={winningLottoInput}
          onChange={handleWinningLottoInputChange}
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
      {isModalOpen && (
        <ResultModal
          lottos={lottos}
          money={money}
          winningLotto={validateWinningLotto}
          resetLottoGame={resetLottoGame}
          closeModal={closeModal}
        />
      )}
    </S.WinningLottoPanel>
  );
};

export default WinningLottoPanel;

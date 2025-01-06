import { useEffect, useState } from 'react';
import { LOTTO_INFO } from '../components/constants/lotto';
import { lotto } from '../types/lotto';

interface UseLottosProps {
  lottoCount: number;
}

const useLottos = ({ lottoCount }: UseLottosProps) => {
  const [lottos, setLottos] = useState<lotto[]>([]);

  const getLotto = () => {
    const numbers = Array.from({ length: LOTTO_INFO.end }, (_, i) => i + 1); // 1~45 배열 생성

    // Fisher-Yates 알고리즘으로 섞기
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // 0~i 범위의 랜덤 인덱스
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; // 두 숫자 위치 교환
    }

    return numbers.slice(0, LOTTO_INFO.count).sort((a, b) => a - b);
  };

  const getLottos = () => {
    const lottos = Array.from({ length: lottoCount }).map(() => getLotto());
    setLottos(lottos);
  };

  useEffect(() => {
    getLottos();
  }, [lottoCount]);

  return {
    lottos,
  };
};

export default useLottos;

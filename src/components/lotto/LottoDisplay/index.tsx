import { lotto } from '../../../types/lotto';
import * as S from './styles';
import { Lotto } from '../index';

interface LottoDisplayProps {
  lottoCount: number;
  lottos: lotto[];
}

const LottoDisplay = ({ lottoCount, lottos }: LottoDisplayProps) => {
  return (
    <S.LottoDisplay>
      <S.GuideMessage>총 {lottoCount}개를 구매하였습니다.</S.GuideMessage>
      <S.LottoContainer>
        {lottos.map((lotto, idx) => (
          <Lotto key={`lotto-${idx}`} lotto={lotto} />
        ))}
      </S.LottoContainer>
    </S.LottoDisplay>
  );
};

export default LottoDisplay;

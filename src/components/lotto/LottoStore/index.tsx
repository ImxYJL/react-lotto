import * as S from './styles';
import { MoneyPanel } from '../index';

interface LottoStoreProps {
  money: number;
  setMoney: (value: number) => boolean;
}

const LottoStore = ({ money, setMoney }: LottoStoreProps) => {
  return (
    <S.LottoStore>
      <S.StoreTitle>내 번호 당첨 확인</S.StoreTitle>
      <MoneyPanel money={money} setMoney={setMoney} />
    </S.LottoStore>
  );
};

export default LottoStore;

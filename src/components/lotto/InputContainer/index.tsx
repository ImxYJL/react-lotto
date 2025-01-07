import { Input } from '../../common';
import * as S from './styles';

interface InputContainerProps {
  label: string;
  count: number;
  values: string[];
  onChange: (index: number, value: string) => void;
  $inputStyle?: React.CSSProperties;
}
const InputContainer = ({ label, count, values, onChange, $inputStyle }: InputContainerProps) => {
  return (
    <S.NumberContainer>
      <S.NumberLabel>{label}</S.NumberLabel>
      <S.NumberInputContainer $inputStyle={$inputStyle}>
        {Array.from({ length: count }).map((_, index) => (
          <Input
            key={index}
            maxLength={2}
            value={values[index]}
            onChange={(e) => onChange(index, e.target.value)}
            $style={{ width: '35px', height: '30px', padding: '3px 5px', textAlign: 'center' }}
          />
        ))}
      </S.NumberInputContainer>
    </S.NumberContainer>
  );
};

export default InputContainer;

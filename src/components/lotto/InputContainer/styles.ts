import styled from '@emotion/styled';

export const NumberContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NumberLabel = styled.label`
  font-size: 12px;
  text-align: left;

  margin-bottom: 8px;
`;

interface NumberContainerStyleProps {
  $inputStyle?: React.CSSProperties;
}

export const NumberInputContainer = styled.div<NumberContainerStyleProps>`
  display: flex;
  gap: 5px;

  ${({ $inputStyle }) => $inputStyle && { ...$inputStyle }};
`;

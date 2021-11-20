import styled from 'styled-components/native';
import { spacing } from '../utils/styling';

export const Screen = styled.SafeAreaView`
  background-color: #d3d3d3;
`;

export const Card = styled.View`
  padding: ${spacing()};
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  border-radius: 5px;
`

export const Image = styled.Image`
  aspect-ratio: ${({ aspectRatio }: { aspectRatio: number }) => aspectRatio};
  flex: 2;
  border-radius: 5px;
`;

export const Title = styled.Text`
  font-size: 28px;
`;

export const Headline = styled.Text`
  font-size: 20px;
`;

export const Caption = styled.Text`
  font-size: 12px;
`;


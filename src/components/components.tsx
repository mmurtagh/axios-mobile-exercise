import styled from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

import { spacing } from '../utils/styling';

export const Screen = styled.SafeAreaView`
  background-color: #d3d3d3;
  flex-grow: 1;
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

const AppText = styled.Text`
  font-family: Helvetica;
`

export const Title = styled(AppText)`
  font-size: 28px;
`;

export const Headline = styled(AppText)`
  font-size: 20px;
`;

export const Caption = styled(AppText)`
  font-size: 12px;
`;

export const StyledIcon = styled(MaterialIcon)`
  color: blue;
`
export const Icon = ({ name, size = 40, onPress = null }: { name: string; size: number, onPress?: () => any | null }) => {
  return <StyledIcon size={size} name={name} onPress={onPress}/>
}
import styled from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

import { spacing, fontSize } from '../utils/styling';

const SafeAreaView = styled.SafeAreaView`
  background-color: #d3d3d3;
  flex-grow: 1;
`;

const Container = styled.View`
  padding-horizontal: ${spacing()};
`

export const Screen = ({ children }) => {
  return (
    <SafeAreaView>
      <Container>
        {children}
      </Container>
    </SafeAreaView>
  );
}

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

export const Headline = styled(AppText)`
  font-size: ${fontSize('lg')};
`;

export const Paragraph = styled(AppText)`
  font-size: ${fontSize()};
`;

export const Caption = styled(AppText)`
  font-size: ${fontSize('sm')};
`;

export const StyledIcon = styled(MaterialIcon)`
  color: blue;
`

export const Icon = ({ name, size = 40, onPress = null }: { name: string; size: number, onPress?: () => any | null }) => {
  return <StyledIcon size={size} name={name} onPress={onPress}/>
}
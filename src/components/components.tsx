import styled from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

import {
  spacing,
  fontSize,
  fontColor,
  backdropColor,
  surfaceColor,
  primary,
} from '../utils/styling';

const SafeAreaView = styled.SafeAreaView`
  background-color: ${backdropColor};
  flex-grow: 1;
`;

const Container = styled.View`
  padding-horizontal: ${spacing()};
`;

export const Screen = ({ children }) => {
  return (
    <SafeAreaView>
      <Container>
        {children}
      </Container>
    </SafeAreaView>
  );
};

export const Card = styled.View`
  padding: ${spacing()};
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.25);
  background-color: ${surfaceColor};
  border-radius: 5px;
`;

export const Image = styled.Image`
  aspect-ratio: ${({ aspectRatio }: { aspectRatio: number }) => aspectRatio};
  flex: 2;
  border-radius: 5px;
`;

const AppText = styled.Text`
  font-family: Helvetica;
  color: ${fontColor};
`;

export const Headline = styled(AppText)`
  font-size: ${fontSize('lg')};
`;

export const Paragraph = styled(AppText)`
  font-size: ${fontSize()};
`;

export const Caption = styled(AppText)`
  font-size: ${fontSize('sm')};
`;

const StyledIcon = styled(MaterialIcon)`
  color: ${({ color }) => color || primary};
`;

export const Icon = (
  { name, size = 30, onPress = null, color }:
  { name: string; size?: number, onPress?: () => any | null, color?: string }) => {
  return <StyledIcon color={color} size={size} name={name} onPress={onPress}/>
};

export const Touchable = styled.TouchableOpacity`
  background-color: ${primary};
  padding: ${spacing()}
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const ButtonText = styled(Paragraph)`
  padding-left: ${spacing('sm')};
  text-align: center;
  color: white;
`

export const Button = ({ title, onPress, icon }: { title: string, onPress: () => any, icon: string }) => {
  return (
    <Touchable onPress={onPress}>
      {icon && <Icon size={20} color="white" name={icon} />}
      <ButtonText>{title}</ButtonText>
    </Touchable>
  )
}

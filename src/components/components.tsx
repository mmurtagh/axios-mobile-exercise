import styled from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  spacing,
  fontSize,
  fontColor,
  backdropColor,
  surfaceColor,
  primary,
} from '../utils/styling';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

const SafeAreaView = styled.SafeAreaView`
  background-color: ${backdropColor};
  flex-grow: 1;
`;

const Container = styled.View`
  padding-horizontal: ${spacing()};
`;

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

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  icon: string;
}

export const Screen = ({ children, ...rest }: SafeAreaViewProps) => {
  return (
    <SafeAreaView {...rest}>
      <Container>
        {children}
      </Container>
    </SafeAreaView>
  );
};

export const Icon = (
  { name, size = 30, onPress, color = primary }:
  { name: string; size?: number, onPress?: () => any | null, color?: string }) => {
  return <MaterialIcon color={color} size={size} name={name} onPress={onPress}/>
};

export const Button = ({ title, onPress, icon, ...props }: AppButtonProps) => {
  return (
    <Touchable onPress={onPress} {...props}>
      {icon && <Icon size={20} color="white" name={icon} />}
      <ButtonText>{title}</ButtonText>
    </Touchable>
  )
}

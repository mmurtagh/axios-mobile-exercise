import styled from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { IconProps } from 'react-native-vector-icons/Icon';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

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

const Touchable = styled.TouchableOpacity`
  background-color: ${primary};
  padding: ${spacing()}
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  icon?: string;
}

/** 
 * @name: Card
 * @description: Styled card component
*/
export const Card = styled.View`
  padding: ${spacing()};
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.25);
  background-color: ${surfaceColor};
  border-radius: 5px;
`;

/** 
 * @name: Image
 * @description: Styled image component
*/
export const Image = styled.Image`
  aspect-ratio: ${({ aspectRatio }: { aspectRatio: number }) => aspectRatio};
  flex: 2;
  border-radius: 5px;
`;

/** 
 * @name: AppText
 * @description: Base component of all typography
*/
const AppText = styled.Text`
  font-family: Helvetica;
  color: ${fontColor};
`;

/** 
 * @name: HeadLine
 * @description: Large text
*/
export const Headline = styled(AppText)`
  font-size: ${fontSize('lg')};
`;

/** 
 * @name: Paragraph
 * @description: Medium text
*/
export const Paragraph = styled(AppText)`
  font-size: ${fontSize()};
`;

/** 
 * @name: Caption
 * @description: Small text
*/
export const Caption = styled(AppText)`
  font-size: ${fontSize('sm')};
`;

const ButtonText = styled(Paragraph)`
  padding-left: ${spacing('sm')};
  text-align: center;
  color: white;
`

/** 
 * @name: Screen
 * @description: Component that wraps all screens
*/
export const Screen = ({ children, ...props }: SafeAreaViewProps) => {
  return (
    <SafeAreaView {...props}>
      <Container>
        {children}
      </Container>
    </SafeAreaView>
  );
};

/** 
 * @name: Icon
 * @description: Vector icon from the MateriaIcons icon set
*/
export const Icon = (
  { name, size = 30, onPress, color = primary, ...props }: IconProps) => {
  return (
    <MaterialIcon
      {...props}
      color={color}
      size={size}
      name={name}
      onPress={onPress}
    />
  )
};

/** 
 * @name: Button
 * @description: Styled button
*/
export const Button = ({ title, onPress, icon, ...props }: AppButtonProps) => {
  return (
    <Touchable accessibilityRole="button" onPress={onPress} {...props}>
      {icon && <Icon size={20} color="white" name={icon} />}
      <ButtonText>{title}</ButtonText>
    </Touchable>
  )
}

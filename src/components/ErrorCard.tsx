import React from 'react';
import styled from 'styled-components/native';

import { Button, Card, Paragraph } from '../components/components';
import { spacing } from '../utils/styling';

const ErrorButton = styled(Button)`
  margin-top: ${spacing()};  
`

const Container = styled(Card)`
  margin-top: ${spacing()};
`

const ErrorText = styled(Paragraph)`
  text-align: center;
`

/** 
 * @name: ErrorCard
 * @description: Component that informs the user there has been an error
 * and allows them to retry the action that caused the error
 * @param onPress: The function that is be called when the user presses the "Try Again" button
*/
export const ErrorCard = ({ onPress }: { onPress: () => any}) => {
  return (
    <Container testID="error-card">
      <ErrorText testID="error-text">There was an error with your request.</ErrorText>
      <ErrorButton testID="error-button" onPress={onPress} title="Try Again" />
    </Container>
  )
}

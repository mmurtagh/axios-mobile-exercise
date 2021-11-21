import { observer } from 'mobx-react-lite';
import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';

import { Story } from '../stores/Story';
import styled from 'styled-components/native';
import { spacing } from '../utils/styling'
import { Card, Image, Paragraph, Caption } from './components';
import { RootStackParamList } from '..';

const Container = styled.View`
  flex: 3;
  padding-left: ${spacing()};
`;

const ThumbnailImage = styled(Image)`
  flex: 2;  
  align-self: center;
`;

const Author = styled(Caption)`
  margin-top: ${spacing('sm')};
`;

const ListItem = styled(Card)`
  flex-direction: row;
`

const Touchable = styled.TouchableOpacity``;

export const StoryListItem = observer(({ story }: { story: Story }) => {
  const { width } = useWindowDimensions();
  const imageUrl: string = story.getImage('4x3', width / 2);
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  return (
    <Touchable onPress={() => navigation.navigate('StoryDetail', { id: story.id })}>
      <ListItem>
        <ThumbnailImage aspectRatio={4 / 3} source={{ uri: imageUrl }} />
        <Container>
          <Paragraph>{story.headline}</Paragraph>
          <Author>{story.author}</Author>
        </Container>
      </ListItem>
    </Touchable>
  );
});

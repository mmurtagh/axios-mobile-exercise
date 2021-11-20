import { observer } from 'mobx-react-lite';
import React from 'react';

import { Story } from '../stores/Story';
import styled from 'styled-components/native';
import { spacing } from '../utils/styling'
import { Card, Image, Headline, Caption } from './components';

const Container = styled.View`
  flex: 3;
  padding-left: ${spacing()};
`;

const ThumbnailImage = styled(Image)`
  align-self: center;
`;

const Author = styled(Caption)`
  margin-top: ${spacing('sm')};
  font-weight: bold;
`;

const ListItem = styled(Card)`
  flex-direction: row;
`

const Touchable = styled.TouchableOpacity``;

export const StoryListItem = observer(({ story }: { story: Story }) => {
  const image: Crop | null = story.getPrimaryImageCrop('4x3');

  return (
    <Touchable onPress={() => console.log('hey buddy')}>
      <ListItem>
        <ThumbnailImage aspectRatio={4 / 3} source={{ uri: image?.url }} />
        <Container>
          <Headline>{story.headline}</Headline>
          <Author>{story.author}</Author>
        </Container>
      </ListItem>
    </Touchable>
  );
});

import { observer } from 'mobx-react-lite';
import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import { Story } from '../stores/Story';
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

/** 
 * @name: StoryListItem
 * @description: A list item representing a story
 * @param story: The story the list item represents
 * @param index: Where the story falls in the list
 * @param totalStories: The total number of stories in the list
*/
export const StoryListItem = observer((
  { story, index, totalStories }:
  { story: Story, index: number, totalStories: number}
) => {
  const imageSources: Crop[] = story.getImageSources('4x3');
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const accessibilityLabel = `${index + 1} of ${totalStories}: ${story.headline} by ${story.author}`

  return (
    <Touchable
      accessibilityLabel={accessibilityLabel}
      onPress={() => navigation.navigate('StoryDetail', { id: story.id })}
    >
      <ListItem>
        <ThumbnailImage
          testID="thumbnail-image"
          aspectRatio={4 / 3}
          source={imageSources}
        />
        <Container>
          <Paragraph testID="headline">{story.headline}</Paragraph>
          <Author testID="author">{story.author}</Author>
        </Container>
      </ListItem>
    </Touchable>
  );
});

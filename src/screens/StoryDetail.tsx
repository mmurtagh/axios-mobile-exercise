import React, { useContext } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components/native';
import { Linking } from 'react-native'

import { RootStackParamList, StoryStoreContext } from '../index';
import { Button, Headline, Screen, Card, Image, Caption } from '../components/components';
import { DetailCaption } from '../components/DetailCaption';
import { BlockText } from '../components/BlockText';
import { fontColor, backdropColor, spacing } from '../utils/styling';

export type Props = NativeStackScreenProps<RootStackParamList, 'StoryDetail'>;

const axiosUrl = 'https://www.axios.com/'

const HeadlineCard = styled(Card)`
  margin-top: ${spacing()}
`
const ScrollView = styled.ScrollView`
  background-color: ${backdropColor};
  height: 100%;
`

const Break = styled.View`
  border-bottom-width: 1px;
  border-color: ${fontColor}
  margin-vertical: ${spacing('lg')}
`;

const BlockTextCard = styled(Card)`
  margin-vertical: ${spacing()};
`;

const StoryHeadline = styled(Headline)`
  text-align: center;
  font-weight: bold;
`

const Author = styled(Caption)`
  margin-top: ${spacing('sm')};
`;

/** 
 * @name: StoryDetail
 * @description: Screen displaying the detail view of a story
 * @param id: The id of the story
*/
export const StoryDetail = observer(({ route: { params: { id } } }: Props) => {
  const store = useContext(StoryStoreContext);

  const story = store.getStory(id);

  if (story === null) return null

  const imageDescription = story.imageDescription;
  const imageSources: Crop[] = story.getImageSources('16x9');

  return (
    <Screen>
      <ScrollView>
        <HeadlineCard>
          <StoryHeadline
            accessibilityRole="header"
            accessibilityLabel={story.headline}
            testID="headline"
          >
            {story.headline}
          </StoryHeadline>
          <Break />
          <Image
            accessible
            accessibilityRole="image"
            accessibilityLabel={imageDescription}
            testID="image"
            aspectRatio={16 / 9}
            source={imageSources}
          />
          <DetailCaption story={story} />
          <Author testID="author">{story.author}</Author>
        </HeadlineCard>
        <BlockTextCard testID="block-text-card">
          {story.blocks.map((block) => {
            return <BlockText key={block.key} block={block} />
          })}
          <Button
            testID="button"
            icon="open-in-new"
            title="Visit Axios.com"
            onPress={() => Linking.openURL(axiosUrl)}
          />
        </BlockTextCard>
      </ScrollView>
    </Screen>
  );
});

export default StoryDetail;

import React, { useContext } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components/native';
import { Linking, useWindowDimensions } from 'react-native'

import { RootStackParamList, StoryStoreContext } from '../index';
import { Button, Headline, Screen, Card, Image, Paragraph } from '../components/components';
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

export const StoryDetail = observer(({ route }: Props) => {
  const { width } = useWindowDimensions();
  const store = useContext(StoryStoreContext);

  const story = store.getStory(route.params.id);

  if (story === null) return null

  const imageUrl: string | null = story.getImage('16x9', width);

  return (
    <Screen>
      <ScrollView>
        <HeadlineCard>
          <StoryHeadline testID="headline">{story.headline}</StoryHeadline>
          <Break />
          <Image testID="image" aspectRatio={16 / 9} source={{ uri: imageUrl }}/>
          <DetailCaption story={story} />
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

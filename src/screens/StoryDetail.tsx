import React, { useContext } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components/native';
import { useWindowDimensions } from 'react-native'

import { RootStackParamList, StoryStoreContext } from '../index';
import { Headline, Screen, Card, Image } from '../components/components';
import { DetailCaption } from '../components/DetailCaption';
import { BlockText } from '../components/BlockText';
import { spacing } from '../utils/styling';

export type Props = NativeStackScreenProps<RootStackParamList, 'StoryDetail'>;

const HeadlineCard = styled(Card)`
  margin-top: ${spacing()}
`

const Container = styled.View`
  background-color: green;
`

const ScrollView = styled.ScrollView`
  background-color: #d3d3d3;
`

const Break = styled.View`
  border-bottom-width: 1px;
  margin-vertical: ${spacing('lg')}
`;

const BlockTextCard = styled(Card)`
  margin-vertical: ${spacing()};
`;

const StoryHeadline = styled(Headline)`
  text-align: center;
  font-weight: bold;
`

export const StoryDetail = observer(({ navigation, route }: Props) => {
  const { width } = useWindowDimensions();
  const store = useContext(StoryStoreContext);
  const story = store.getStory(route.params.id);
  const image: Crop | null = story.getPrimaryImageCrop('16x9', width);

  return (
    <Screen>
      <ScrollView>
        <HeadlineCard>
          <StoryHeadline>{story.headline}</StoryHeadline>
          <Break />
          <Image aspectRatio={16 / 9} source={{ uri: image?.url }} />
          <DetailCaption story={story} />
        </HeadlineCard>
        <BlockTextCard>
          {story.blocks.map((block) => {
            return <BlockText key={block.key} block={block} entityMap={story.entityMap} />
          })}
        </BlockTextCard>
      </ScrollView>
    </Screen>
  );
});

export default StoryDetail;

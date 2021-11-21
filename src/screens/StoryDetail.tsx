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

export const StoryDetail = observer(({ navigation, route }: Props) => {
  const { width } = useWindowDimensions();
  const store = useContext(StoryStoreContext);
  const story = store.getStory(route.params.id);
  const imageUrl: string = story.getImage('16x9', width);

  return (
    <Screen>
      <ScrollView>
        <HeadlineCard>
          <StoryHeadline>{story.headline}</StoryHeadline>
          <Break />
          <Image aspectRatio={16 / 9} source={{ uri: imageUrl }} />
          <DetailCaption story={story} />
        </HeadlineCard>
        <BlockTextCard>
          {story.blocks.map((block) => {
            return <BlockText key={block.key} block={block} entityMap={story.entityMap} />
          })}
          <Button icon="open-in-new" title="Visit Axios.com" onPress={() => Linking.openURL(axiosUrl)} />
        </BlockTextCard>
      </ScrollView>
    </Screen>
  );
});

export default StoryDetail;

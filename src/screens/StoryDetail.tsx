import React, { useContext } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components/native';
import { toJS } from 'mobx';

import { Caption, Headline, Icon, Title } from '../components/components';
import { Screen } from '../components/components';
import { RootStackParamList, StoryStoreContext } from '../index';
import { Card, Image } from '../components/components';
import { spacing } from '../utils/styling';
import { DetailCaption } from '../components/DetailCaption';

export type Props = NativeStackScreenProps<RootStackParamList, 'StoryDetail'>;

const Container = styled.View`
  background-color: green;
`

const ScrollView = styled.ScrollView`
  background-color: #d3d3d3;
  padding: ${spacing()};
`

const Break = styled.View`
  border-bottom-width: 1px;
  margin-vertical: ${spacing('lg')}
`;

export const StoryDetail = observer(({ navigation, route }: Props) => {
  const store = useContext(StoryStoreContext);
  const story = store.getStory(route.params.id);

  const image: Crop | null = story.getPrimaryImageCrop('16x9');

  return (
    <Screen>
      <ScrollView>
        <Card>
          <Headline>{story.headline}</Headline>
          <Break />
          <Image resizeMode='center' aspectRatio={16 / 9} source={{ uri: image?.url }} />
          <DetailCaption story={story} />
        </Card>
      </ScrollView>
    </Screen>
  );
});

export default StoryDetail;

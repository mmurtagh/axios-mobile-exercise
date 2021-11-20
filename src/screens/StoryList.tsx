import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components/native';

import { Screen } from '../components';
import { StoryStoreContext } from '../index';

const Text = styled.Text`
  font-size: 15px;
  border-bottom-width: 2px;
`

export const StoryList = observer(() => {
  const store = useContext(StoryStoreContext);

  useEffect(() => {
    store.loadMostRecentStories();
  }, [store]);

  return (
    <Screen>
      {store.stories.map((story) => {
        return <Text key={story.id}>{story.headline}</Text>
      })}
    </Screen>
  );
});

export default StoryList;

import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { Screen } from '../components/components';
import { StoryStoreContext } from '../index';
import { Story } from '../stores/Story';
import { StoryListItem } from '../components/StoryListItem';
import { spacing } from '../utils/styling';

const Separator = styled.View`
  padding-top: ${spacing('sm')}
`

const Header = styled.View`
  padding-top: ${spacing()}
`

const Container = styled.View`
  margin-top: ${spacing()};
  padding-horizontal: ${spacing('lg')};
`

export const StoryList = observer(() => {
  const store = useContext(StoryStoreContext);

  useEffect(() => {
    store.loadMostRecentStories();
  }, [store]);

  const renderItem = ({ item }: { item: Story }) => {
    return <StoryListItem story={item} />;
  };

  return (
    <Screen>
      <FlatList
        ItemSeparatorComponent={Separator}
        data={store.stories}
        renderItem={renderItem}
        ListHeaderComponent={Header}
        ListFooterComponent={Header}
      />
    </Screen>
  );
});

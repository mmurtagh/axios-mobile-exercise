import React, { useContext, useEffect, useState } from 'react';
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

const RefreshControl = styled.RefreshControl``

export const StoryList = observer(() => {
  const store = useContext(StoryStoreContext);
  const [ isRefreshing, setIsRefreshing ] = useState(false)

  useEffect(() => {
    store.loadMostRecentStories();
  }, [store]);

  const renderItem = ({ item }: { item: Story }) => {
    return <StoryListItem story={item} />;
  };

  const onRefresh = async () => {
    setIsRefreshing(true)
    
    store.loadMostRecentStories()
      .then(() => setIsRefreshing(false))
      .catch(() => setIsRefreshing(false))
  }

  return (
    <Screen>
      <FlatList
        ItemSeparatorComponent={Separator}
        data={store.stories}
        renderItem={renderItem}
        ListHeaderComponent={Header}
        ListFooterComponent={Header}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </Screen>
  );
});

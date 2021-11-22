import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { Screen } from '../components/components';
import { Story } from '../stores/Story';
import { StoryListItem } from '../components/StoryListItem';
import { spacing } from '../utils/styling';
import { StoryStore } from '../stores/StoryStore';
import { StoryStoreContext } from '..';
import { ErrorCard } from '../components/ErrorCard';

const Separator = styled.View`
  padding-top: ${spacing('sm')};
`
const Header = styled.View`
  padding-top: ${spacing()};
`
const Spinner = styled.ActivityIndicator`
  padding-top: ${spacing()};
`
const RefreshControl = styled.RefreshControl``
enum LoadingState {
  LOADING,
  READY,
  REFRESHING,
  ERRORED,
}

/** 
 * @name: StoryList
 * @description: Screen displaying the list of stories
*/
export const StoryList = observer(() => {
  const store: StoryStore = useContext(StoryStoreContext);
  const [ loadingState, setLoadingState ] = useState(LoadingState.LOADING)

  const loadStories = (state: LoadingState) => {
    setLoadingState(state);

    store.loadMostRecentStories()
      .then(() => setLoadingState(LoadingState.READY))
      .catch(() => setLoadingState(LoadingState.ERRORED))
  }

  useEffect(() => {
    loadStories(LoadingState.LOADING); 
  }, []);

  const renderItem = ({ item, index }: { item: Story, index: number }) => {
    return <StoryListItem story={item} index={index} totalStories={store.stories.length} />;
  };

  return (
    <Screen>
      {loadingState === LoadingState.LOADING && <Spinner testID="spinner" size="large"/>}
      {loadingState === LoadingState.ERRORED && <ErrorCard onPress={() => loadStories(LoadingState.LOADING)}/>}
      {loadingState !== LoadingState.ERRORED && (
        <FlatList
          testID="flatlist"
          ItemSeparatorComponent={Separator}
          data={loadingState === LoadingState.LOADING ? [] : store.stories}
          renderItem={renderItem}
          ListHeaderComponent={Header}
          ListFooterComponent={Header}
          refreshControl={
            <RefreshControl
              testID="refresh-control"
              refreshing={loadingState === LoadingState.REFRESHING}
              onRefresh={() => loadStories(LoadingState.REFRESHING)}
            />
          }
        />
      )}
    </Screen>
  );
});

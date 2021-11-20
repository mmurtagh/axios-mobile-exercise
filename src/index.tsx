
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StoryList } from './screens/StoryList';
import { StoryStore } from './stores/StoryStore';

export type RootStackParamList = {
  StoryList: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export const StoryStoreContext = React.createContext<StoryStore>(
  new StoryStore(),
);

export default function App() {
  return (
    <StoryStoreContext.Provider value={new StoryStore()}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="StoryList"
            component={StoryList}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoryStoreContext.Provider>
  );
}

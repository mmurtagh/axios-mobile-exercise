
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon, Paragraph } from './components/components';

import { StoryList } from './screens/StoryList';
import { StoryStore } from './stores/StoryStore';
import StoryDetail from './screens/StoryDetail';

export type RootStackParamList = {
  StoryList: undefined;
  StoryDetail: { id: string };
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
            options={{
              headerTitle: () => <Paragraph>Latest Stories</Paragraph>,
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="StoryDetail"
            component={StoryDetail}
            options={({ navigation }) => ({
              headerTitle: () => <Paragraph>Story Detail</Paragraph>,
              headerTitleAlign: 'center',
              headerBackVisible: false,
              headerLeft: () => <Icon size={40} name="chevron-left" onPress={() => navigation.goBack()}/>,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoryStoreContext.Provider>
  );
}

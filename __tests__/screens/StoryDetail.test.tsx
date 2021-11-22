import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { clearTimers } from 'mobx-react-lite';
import { RootStackParamList } from '../../src';
import { Linking } from 'react-native';

import { StoryDetail } from '../../src/screens/StoryDetail'
import { StoryStore } from '../../src/stores/StoryStore';
import { Story } from '../../src/stores/Story';
import contentInstance from '../data/contentInstance';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const mockStore = new StoryStore();
const story = new Story(contentInstance);
mockStore.stories = [ story ];
mockStore.loadMostRecentStories = jest.fn();

const mockNavigation = {} as NativeStackNavigationProp<RootStackParamList, 'StoryDetail'>;
const mockRoute = { params: { id: '1A2B3C' } } as RouteProp<RootStackParamList, 'StoryDetail'>;

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useContext: () => mockStore,
  }
})

describe('StoryDetail', () => {
  beforeEach(() => {
    (mockStore.loadMostRecentStories as jest.Mock).mockClear();
  })

  afterEach(() => {
    clearTimers();
  })

  test('snapshot', () => {
    const obj = render(<StoryDetail navigation={mockNavigation} route={mockRoute} />);

    expect(obj).toMatchSnapshot()
  })

  test('headline', () => {
    const { getByTestId } = render(<StoryDetail navigation={mockNavigation} route={mockRoute} />);

    expect(getByTestId('headline').children[0]).toBe(story.headline);
  })

  test('image - 16x9 aspect ratio', () => {
    const { getByTestId } = render(<StoryDetail navigation={mockNavigation} route={mockRoute} />);
    const sources = story.getImageSources('16x9');

    expect(getByTestId('image').props.source).toStrictEqual(sources)
  })

  test('link off button', () => {
    const { getByTestId } = render(<StoryDetail navigation={mockNavigation} route={mockRoute} />);

    fireEvent(getByTestId('button'), 'press');

    expect(Linking.openURL).toBeCalledWith('https://www.axios.com/');
  })

  test('blocks', () => {
   const { getByTestId } = render(<StoryDetail navigation={mockNavigation} route={mockRoute} />);

   expect(getByTestId('block-text-card').children.length).toBe(story.blocks.length + 1);
 })

 test('authot', () => {
  const { getByTestId } = render(<StoryDetail navigation={mockNavigation} route={mockRoute} />);

  expect(getByTestId('author').children[0]).toBe(story.author);
})
});

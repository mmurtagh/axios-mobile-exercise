import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { clearTimers } from 'mobx-react-lite';

import { StoryList } from '../../src/screens/StoryList'
import { StoryStore } from '../../src/stores/StoryStore';

const mockStore = new StoryStore();
mockStore.loadMostRecentStories = jest.fn();

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useContext: () => mockStore,
  }
})

describe('StoryList', () => {
  beforeEach(() => {
    (mockStore.loadMostRecentStories as jest.Mock).mockClear();
  })

  afterEach(() => {
    clearTimers();
  })

  test('snapshot', () => {
    const obj = render(<StoryList />);

    expect(obj).toMatchSnapshot();
  });

  test('load stores on init', async () => {
    const obj = render(<StoryList />);

    expect(mockStore.loadMostRecentStories).toBeCalled();
  })

  test('refresh', async () => {
    const { getByTestId } = render(<StoryList />);

    (mockStore.loadMostRecentStories as jest.Mock).mockClear();

    const refreshControl = getByTestId('flatlist').props.refreshControl;
    fireEvent(refreshControl, 'refresh');

    expect(mockStore.loadMostRecentStories).toBeCalled();
  })
});

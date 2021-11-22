import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import { clearTimers } from 'mobx-react-lite';

import { StoryList } from '../../src/screens/StoryList'
import { StoryStore } from '../../src/stores/StoryStore';

const mockStore = new StoryStore();
mockStore.loadMostRecentStories = jest.fn().mockResolvedValue(null);

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

  test('snapshot', async () => {
    const obj = await waitFor(() => render(<StoryList />));

    expect(obj).toMatchSnapshot();
  });

  test('load stores on init', async () => {
    await waitFor(() => render(<StoryList />));

    expect(mockStore.loadMostRecentStories).toBeCalled();
  })

  test('refresh', async () => {
    const { getByTestId } = await waitFor(() => render(<StoryList />));

    (mockStore.loadMostRecentStories as jest.Mock).mockClear();

    const refreshControl = getByTestId('flatlist').props.refreshControl;
    await act(async () => await fireEvent(refreshControl, 'refresh'));

    expect(mockStore.loadMostRecentStories).toBeCalled();
  })

  test('load succeeds', async () => {
    (mockStore.loadMostRecentStories as jest.Mock).mockResolvedValue(null)
    const obj = await waitFor(() => render(<StoryList />));

    expect(mockStore.loadMostRecentStories).toBeCalled();

    expect(obj.queryByTestId('error-card')).toBeFalsy();
  })

  test('load fails', async () => {
    (mockStore.loadMostRecentStories as jest.Mock).mockRejectedValue(null)
    const obj = await waitFor(() => render(<StoryList />));

    expect(mockStore.loadMostRecentStories).toBeCalled();

    expect(obj.queryByTestId('error-card')).toBeTruthy();
  })

  test('load fails then refresh', async () => {
    (mockStore.loadMostRecentStories as jest.Mock).mockRejectedValue(null)
    const obj = await waitFor(() => render(<StoryList />));

    expect(mockStore.loadMostRecentStories).toBeCalled();
    expect(obj.queryByTestId('error-card')).toBeTruthy();

    (mockStore.loadMostRecentStories as jest.Mock).mockResolvedValue(null)

    await act(async () => await fireEvent(obj.getByTestId('error-button'), 'press'))

    expect(mockStore.loadMostRecentStories).toBeCalled();
    expect(obj.queryByTestId('error-card')).toBeFalsy();
  })
});

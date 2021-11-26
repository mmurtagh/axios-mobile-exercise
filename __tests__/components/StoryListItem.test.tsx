import React from 'react';
import { render } from '@testing-library/react-native';
import { clearTimers } from 'mobx-react-lite';

import { StoryListItem } from '../../src/components/StoryListItem';
import { Story } from '../../src/stores/Story';
import contentInstance from '../data/contentInstance';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('StoryListItem', () => {
  afterEach(() => {
    clearTimers();
  });

  test('snapshot', () => {
    const story = new Story(contentInstance);
    const obj = render(<StoryListItem story={story} totalStories={20} index={0}/>);

    expect(obj).toMatchSnapshot();
  });

  test('headline', () => {
    const story = new Story(contentInstance);
    const { getByTestId } = render(<StoryListItem story={story} totalStories={20} index={0}/>);

    expect(getByTestId('headline').children[0]).toBe(story.headline);
  });

  test('author', () => {
    const story = new Story(contentInstance);
    const { getByTestId } = render(<StoryListItem story={story} totalStories={20} index={0}/>);

    expect(getByTestId('author').children[0]).toBe(story.author);
  });

  test('image - 4x3 aspect ratio', () => {
    const story = new Story(contentInstance);
    const { getByTestId } = render(<StoryListItem story={story} totalStories={20} index={0}/>);
    const sources = story.getImageSources('4x3');

    expect(getByTestId('thumbnail-image').props.source).toStrictEqual(sources);
  });
});

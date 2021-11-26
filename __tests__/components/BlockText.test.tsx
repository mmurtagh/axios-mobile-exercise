import React from 'react';
import { render } from '@testing-library/react-native';
import { clearTimers } from 'mobx-react-lite';

import { BlockText } from '../../src/components/BlockText';
import { Story } from '../../src/stores/Story';
import contentInstance from '../data/contentInstance';

describe('BlockText', () => {
  afterEach(() => {
    clearTimers();
  });

  test('snapshot', () => {
    const story = new Story(contentInstance);
    const obj = render(<BlockText block={story.blocks[0]} />);

    expect(obj).toMatchSnapshot();
  });

  test('text', () => {
    const story = new Story(contentInstance);
    const { getByTestId } = render(<BlockText block={story.blocks[0]} />);

    expect(getByTestId('block-paragraph').children[0]).toBe(story.blocks[0].text);
  });

  test('unstyled', () => {
    const story = new Story(contentInstance);
    const { queryByTestId } = render(<BlockText block={story.blocks[0]} />);

    expect(queryByTestId('bullet')).toBeFalsy();
  });

  test('unordered-list-item', () => {
    const story = new Story(contentInstance);
    const { queryByTestId } = render(<BlockText block={story.blocks[1]} />);

    expect(queryByTestId('bullet')).toBeTruthy();
  });
});

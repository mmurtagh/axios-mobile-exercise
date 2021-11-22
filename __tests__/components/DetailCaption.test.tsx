import React from 'react';
import MockDate from 'mockdate'
import { render } from '@testing-library/react-native';
import dayjs from 'dayjs';
import { clearTimers } from 'mobx-react-lite';

import { DetailCaption } from '../../src/components/DetailCaption'
import { Story } from '../../src/stores/Story'
import contentInstance from '../data/contentInstance';

describe('DetailCaption', () => {
  beforeAll(() => {
    MockDate.set('2021-11-21T15:30:58-05:00');
  })

  afterEach(() => {
    clearTimers();
  })

  test('snapshot', () => {
    const story = new Story(contentInstance)

    const obj = render(<DetailCaption story={story}/>)
    expect(obj).toMatchSnapshot();
  })

  test('topic available', () => {
    const story = new Story(contentInstance)

    const { getByTestId } = render(<DetailCaption story={story}/>)
    const timeString = dayjs(story.publishedDate).fromNow()
    const primaryTopicName = story.primaryTopicName

    expect(getByTestId('styled-caption').children[0]).toBe(`${timeString} - ${primaryTopicName}`);
  });

  test('no topic available', () => {
    const data = { ...contentInstance }
    data.topics = [];
    const story = new Story(data)

    const { getByTestId } = render(<DetailCaption story={story}/>)
    const timeString = dayjs(story.publishedDate).fromNow()

    expect(getByTestId('styled-caption').children[0]).toBe(timeString);
  });
});

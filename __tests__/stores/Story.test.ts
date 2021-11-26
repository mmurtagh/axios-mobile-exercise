import dayjs from 'dayjs';
import { Story } from '../../src/stores/Story';
import contentInstance from '../data/contentInstance';

describe('Story', () => {
  test('filters out unsupported blocks', () => {
    const story = new Story(contentInstance);
    const blocks = story.contentInstance.blocks.blocks;

    expect(blocks.length).toBe(2);
    expect(blocks.find(({ key }) => key === 'GAB')).toBeFalsy();
  });

  test('headline', () => {
    const story = new Story(contentInstance);

    expect(story.headline).toBe(contentInstance.headline);
  });

  test('publishedDate', () => {
    const story = new Story(contentInstance);
    const publishedDate = dayjs(contentInstance.published_date);

    expect(story.publishedDate.isSame(publishedDate)).toBeTruthy();
  });

  test('id', () => {
    const story = new Story(contentInstance);

    expect(story.id).toBe(contentInstance.id);
  });

  test('blocks', () => {
    const story = new Story(contentInstance);

    expect(story.blocks).toStrictEqual(contentInstance.blocks.blocks);
  });

  test('entityMap', () => {
    const story = new Story(contentInstance);

    expect(story.entityMap).toStrictEqual(contentInstance.blocks.entityMap);
  });

  describe('getImageSources', () => {
    test('gets image sources of correct ratio', () => {
      const story = new Story(contentInstance);

      expect(story.getImageSources('1x1')).toMatchSnapshot();
    });

    test('falls back to social_image if primary_image is null', () => {
      const value = { ...contentInstance };
      value.primary_image = null;
      value.social_image = contentInstance.primary_image;
      const story = new Story(contentInstance);

      expect(story.getImageSources('4x3')).toMatchSnapshot();
    });

    test('returns [] if neither primary_image or social_image exists', () => {
      const value = { ...contentInstance };
      value.primary_image = null;
      const story = new Story(value);

      const sources = story.getImageSources('1x1');

      expect(sources).toStrictEqual([]);
    });
  });

  describe('primaryTopicName', () => {
    test('returns first topic name', () => {
      const story = new Story(contentInstance);

      expect(story.primaryTopicName).toBe('Science');
    });

    test('returns empty string if topics = []', () => {
      const value = { ...contentInstance };
      value.topics = [];
      const story = new Story(value);

      expect(story.primaryTopicName).toBe('');
    });

    test('returns empty string if topics = null', () => {
      const value = { ...contentInstance };
      value.topics = null;
      const story = new Story(value);

      expect(story.primaryTopicName).toBe('');
    });
  });
});
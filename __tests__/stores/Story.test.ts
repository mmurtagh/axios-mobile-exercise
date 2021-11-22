import dayjs from "dayjs";
import { Story } from "../../src/stores/Story";
import contentInstance from '../contentInstance';

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

  describe('primary image crop', () => {
    test('picks lowest res image that satisfies width req', () => {
      const story = new Story(contentInstance);
      const desiredWidth = 250;

      const url = story.getImage('1x1', desiredWidth)

      expect(url).toBe('Image300-1x1');
    });

    test('picks highest res image if width is larger than all options', () => {
      const story = new Story(contentInstance);
      const desiredWidth = 700;

      const url = story.getImage('1x1', desiredWidth)

      expect(url).toBe('Image500-1x1');
    });

    test('falls back to social_image if primary_image is null', () => {
      const value = { ...contentInstance };
      value.primary_image = null;
      value.social_image = contentInstance.primary_image;
      const story = new Story(value)

      const url = story.getImage('1x1', 100)

      expect(url).not.toBe(null);
      expect(url).toBe('Image100-1x1');
    })

    test('returns empty string if neither primary_image or social_image exists', () => {
      const value = { ...contentInstance };
      value.primary_image = null;
      const story = new Story(value)

      const url = story.getImage('1x1', 100)

      expect(url).toBe('');
    });
  });

  describe('primaryTopicName', () => {
    test('returns first topic name', () => {
      const story = new Story(contentInstance);

      expect(story.primaryTopicName).toBe('Science');
    })

    test('returns null if topics = []', () => {
      const value = { ...contentInstance }
      value.topics = [];
      const story = new Story(value);

      expect(story.primaryTopicName).toBe(null);
    })

    test('returns null if topics = null', () => {
      const value = { ...contentInstance }
      value.topics = null;
      const story = new Story(value);

      expect(story.primaryTopicName).toBe(null);
    })
  })
})
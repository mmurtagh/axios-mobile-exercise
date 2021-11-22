import { StoryStore } from '../../src/stores/StoryStore';
import { Story } from '../../src/stores/Story';
import contentInstance from '../data/contentInstance'

describe('StoryStore', () => {
  describe('getStory', () => {
    const store = new StoryStore()
    const story = new Story({ ...contentInstance, id: 'ABC' })

    store.stories = [
      new Story({ ...contentInstance, id: 'DEF' }),
      story,
      new Story({ ...contentInstance, id: 'GBA' })
    ]

    test('getStory found', () => {
      expect(store.getStory('ABC')).toBe(story);
    })

    test('getStory not found', () => {
      expect(store.getStory('DEF#')).toBe(null);
    })
  })

  describe('loadMostRecentStories', () => {
    const results = Array.from({ length: 20 }, () => { id: `${Math.random()}` });
    const stream = {
      count: 20,
      next: null,
      previous: null,
      results,    
    }

    const fakeService = {
      getStream: jest.fn().mockResolvedValue(stream),
      getContent: jest.fn().mockResolvedValue(contentInstance),
    }

    const store = new StoryStore()
    store.service = fakeService;

    test('loads in data', async () => {
      expect(store.stories.length).toBe(0);

      await store.loadMostRecentStories()

      expect(fakeService.getStream).toBeCalledTimes(1);
      expect(fakeService.getContent).toBeCalledTimes(20);
      expect(store.stories.length).toBe(20);
    })
  })
})
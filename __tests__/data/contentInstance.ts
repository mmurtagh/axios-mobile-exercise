const generateSizes = (ratio: '1x1' | '4x3' | '16x9'): Crop[] => {
  return Array.from({ length: 5 }, (_, index) => {
    const size = (index + 1) * 100;
    return {
      width: size,
      height: size,
      url: `Image${size}-${ratio}`,
    };
  })
}

const axiosImage: AxiosImage = {
  id: 'ABC',
  alt_text: '',
  crops: {
    '1x1': { sizes: generateSizes('1x1') },
    '4x3': { sizes: generateSizes('4x3') },
    '16x9': { sizes: generateSizes('16x9') },
  },
  caption: {
    blocks: [],
    entityMap: [],
  },
}

const contentInstance: AxiosContentInstance = {
  id: '1A2B3C',
  authors: [{ display_name: 'Foo Barrington' }],
  headline: 'This is the headline',
  published_date: '2021-08-02T18:36:19.716000Z',
  blocks: {
    blocks: [
      {
        key: 'ABC',
        text: 'Lorem ipsum',
        type: 'unstyled',
        entityRanges: [],
        inlineStyleRanges: [],
      },
      {
        key: 'DEF',
        text: 'Dolor sit amet',
        type: 'unordered-list-item',
        entityRanges: [],
        inlineStyleRanges: [],
      },
      {
        key: 'GAB',
        text: 'hello world',
        type: 'keep-reading',
        entityRanges: [],
        inlineStyleRanges: [],
      },
    ],
    entityMap: [
      {
        type: 'LINK',
        data: { url: 'https://google.com' },        
      }
    ],
  },
  primary_image: axiosImage,
  social_image: null,
  topics: [
    {
      id: 'ABC',
      name: 'Science',
    },
    {
      id: 'DEF',
      name: 'Wombology',
    },
  ],
};

export default contentInstance;
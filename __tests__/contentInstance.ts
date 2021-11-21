const sizes: Crop[] = [
  {
    width: 400,
    height: 400,
    url: 'Image400x400',
  },
  {
    width: 300,
    height: 300,
    url: 'Image300x300',
  },
  {
    width: 200,
    height: 200,
    url: 'Image200x200',
  },
  {
    width: 100,
    height: 100,
    url: 'Image100x100',
  },
];

const axiosImage: AxiosImage = {
  id: 'ABC',
  alt_text: '',
  crops: {
    '1x1': { sizes },
    '4x3': { sizes },
    '16x9': { sizes },
  },
  caption: {
    blocks: [],
    entityMap: [],
  },
}

const contentInstance: AxiosContentInstance = {
  id: '1A2B3C',
  authors: [{ display_name: '' }],
  headline: '',
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
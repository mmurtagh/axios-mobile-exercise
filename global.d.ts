// types for data returned from axios apis

interface Crop {
  width: number;
  height: number;
  url: string;
}

interface PrimaryImage {
  id: string;
  alt_text: string;
  crops: {
    '1x1': { sizes: Crop[] };
    '4x3': { sizes: Crop[] };
    '16x9': { sizes: Crop[] };
  };
  caption: {
    blocks: Block[];
    entityMap: Entity[];
  };
}

interface Block {
  key: string;
  text: string;
  type: 'unstyled' | 'unordered-list-item';
  inlineStyleRanges: InlineStyleRange[];
  entityRanges: EntityRange[];
}

interface InlineStyleRange {
  style: 'BOLD';
  length: number;
  offset: number;
}

interface EntityRange {
  offset: number;
  length: number;
  key: number;
}

interface Entity {
  type: 'LINK';
  data: { url: string };
}

interface Topic {
  id: string;
  name: string;
}

interface AxiosStream {
  count: number;
  next: string | null;
  previous: string | null;
  results: string[];
}

interface AxiosContentInstance {
  id: string;
  authors: [{ display_name: string }];
  headline: string;
  published_date: string;
  blocks: { blocks: Block[] };
  primary_image: PrimaryImage;
  topics: Topic[] | null;
}

interface Crop {
  width: number;
  height: number;
  url: string;
}

interface AxiosImage {
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
  type: string;
  inlineStyleRanges: InlineStyleRange[];
  entityRanges: EntityRange[];
}

interface InlineStyleRange {
  style: string;
  length: number;
  offset: number;
}

interface EntityRange {
  offset: number;
  length: number;
  key: number;
}

interface Entity {
  type: string;
  data: { url: string };
}

interface Topic {
  id: string;
  name: string;
}

/**
 * Represents a stream  returned from the Axios Stream API
 */
interface AxiosStream {
  count: number;
  next: string | null;
  previous: string | null;
  results: string[];
}

/**
 * Represents a content instance returned from the Axios content API
 */
interface AxiosContentInstance {
  id: string;
  authors: { display_name: string }[];
  headline: string;
  published_date: string;
  blocks: { blocks: Block[], entityMap: Entity[] };
  primary_image: AxiosImage | null;
  social_image: AxiosImage | null;
  topics: Topic[] | null;
}

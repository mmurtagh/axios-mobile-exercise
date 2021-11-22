import { makeAutoObservable, toJS } from 'mobx';
import dayjs from 'dayjs';

export enum SupportedEntityType {
  LINK = 'LINK',
}

export enum SupportedBlockType {
  UNSTYLED = 'unstyled',
  UNORDERED_LIST_ITEM = 'unordered-list-item',
}

export enum SupportedInlineStyle {
  BOLD = 'BOLD',
}

function sanitizeContentInstance (_contentInstance: AxiosContentInstance): AxiosContentInstance {
  const contentInstance = { ..._contentInstance }
  const { blocks: { blocks } } = contentInstance;

  // Filter out all blocks with unsupported block type
  contentInstance.blocks.blocks = blocks.filter(({ type }) => {
    const supportedTypes: string[] = Object.values(SupportedBlockType);

    return supportedTypes.includes(type)
  })

  return contentInstance
}

export class Story {
  contentInstance: AxiosContentInstance;

  constructor(contentInstance: AxiosContentInstance) {
    this.contentInstance = sanitizeContentInstance(contentInstance);
    makeAutoObservable(this);
  }

  get headline(): string {
    return this.contentInstance.headline;
  }

  get publishedDate(): dayjs.Dayjs {
    return dayjs(this.contentInstance.published_date);
  }

  getImage(ratio: '1x1' | '4x3' | '16x9', width: number): string {
    let image = this.contentInstance.primary_image

    if (image === null || !image.crops[ratio].sizes) {
      image = this.contentInstance.social_image;
    }

    if (image === null) {
      return ''
    }
    
    const sizes = [ ...image.crops[ratio].sizes ].sort((a, b) => {
      return b.width - a.width;
    })

    const bestMatch = sizes.reduce((acc, crop) => {
      if (crop.width >= width && acc.width > crop.width) {
        return crop
      }

      return acc;
    }, sizes[0])

    return bestMatch.url;
  }

  get id(): string {
    return this.contentInstance.id;
  }

  get author(): string | null {
    if (!this.contentInstance.authors.length) {
      return null;
    }

    return this.contentInstance.authors[0].display_name;
  }

  get primaryTopicName(): string | null {
    const topics = this.contentInstance.topics;

    if (topics === null || topics.length === 0) {
      return null;
    }

    return topics[0].name;
  }

  get blocks(): Block[] {
    return this.contentInstance.blocks.blocks;
  }

  get entityMap(): Entity[] {
    return this.contentInstance.blocks.entityMap;
  }
}

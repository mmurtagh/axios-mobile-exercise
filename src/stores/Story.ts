import { makeAutoObservable } from 'mobx';
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

function sanitzeContentInstance (_contentInstance: AxiosContentInstance): AxiosContentInstance {
  const contentInstance = { ..._contentInstance }
  const {
    blocks: {
      entityMap,
      blocks,
    }
  } = contentInstance;

  // Filter out all blocks with unsupported block type
  contentInstance.blocks.blocks = blocks.filter(({ type }) => {
    const supportedTypes: string[] = Object.values(SupportedBlockType);

    return supportedTypes.includes(type)
  })

  // Find the indices of all unsupported entity types
  const unsupportedEntityIndices = entityMap.reduce((acc, { type }, index) => {

    const supportedTypes: string[] = Object.values(SupportedEntityType);

    if (supportedTypes.includes(type)) {
      acc.add(index);
    }

    return acc;
  }, new Set())

  // Remove unsupported entity types
  contentInstance.blocks.entityMap = entityMap.filter((entity, index) => {
    return !unsupportedEntityIndices.has(index)
  })

  // Filter out all inline styles with unsupported InlineStyle style
  // and filter out all entity ranges refering to unsupported entities
  blocks.forEach((block) => {
    const { inlineStyleRanges, entityRanges } = block
    const supportedStyles: string[] = Object.values(SupportedInlineStyle);

    block.inlineStyleRanges = inlineStyleRanges.filter(({ style }) => {
      return supportedStyles.includes(style);
    })

    block.entityRanges = entityRanges.filter(({ key }) => {
      return !unsupportedEntityIndices.has(key);
    })
  })

  return contentInstance
}

export class Story {
  contentInstance: AxiosContentInstance;

  constructor(contentInstance: AxiosContentInstance) {
    this.contentInstance = sanitzeContentInstance(contentInstance);
    makeAutoObservable(this, { contentInstance: false });
  }

  get headline(): string {
    return this.contentInstance.headline;
  }

  get publishedDate(): dayjs.Dayjs {
    return dayjs(this.contentInstance.published_date);
  }

  getPrimaryImageCrop(ratio: '1x1' | '4x3' | '16x9', width?: number): Crop | null {
    let image = this.contentInstance.primary_image

    if (image === null) {
      image = this.contentInstance.social_image;
    }

    if (image === null) {
      return null
    }

    const sizes = image.crops[ratio].sizes

    const bestMatch = sizes.reduce((acc, crop) => {
      if (crop.width > width && acc.width > crop.width) {
        return crop
      }

      return acc;
    }, sizes[0])

    return bestMatch;
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

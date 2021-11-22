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

/** 
 * @name sanitizeContentInstance
 * @description: Filters out unsupported features from raw AxiosContentInstances.
 * @param _contentInstance: The AxiosContentInstance object that needs to be sanitized.
*/
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

/** 
 * @class: Story
 * @description: An Axios story. A mobx domain object managed by StoryStore.js.
*/
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

  /** 
   * @name getImageSources
   * @description: Gets the list of image sources of a given ratio.
   * @param ratio: The desired image's aspect ratio
  */
   getImageSources (ratio: '1x1' | '4x3' | '16x9'): Crop[] {
    let image = this.contentInstance.primary_image

    if (image === null || !image.crops[ratio].sizes) {
      image = this.contentInstance.social_image;
    }

    if (image === null) {
      return []
    }

    return toJS(image.crops[ratio].sizes)
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

  /** 
   * @name imageDescription
   * @description: Gets a description of the image associated with the story.
  */
  get imageDescription(): string {
    let image = this.contentInstance.primary_image

    if (image === null) {
      image = this.contentInstance.social_image;
    }

    if (image === null) {
      return ''
    }

    const { blocks } = image.caption
    
    if (blocks.length === 0) {
      return ''
    }

    return blocks[0].text;
  }
}

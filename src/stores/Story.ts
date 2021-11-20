import { makeAutoObservable } from 'mobx';
import dayjs from 'dayjs';

export class Story {
  contentInstance: AxiosContentInstance;

  constructor(contentInstance: AxiosContentInstance) {
    this.contentInstance = contentInstance;
    makeAutoObservable(this);
  }

  get headline(): string {
    return this.contentInstance.headline;
  }

  get publishedDate(): dayjs.Dayjs {
    return dayjs(this.contentInstance.published_date);
  }

  getPrimaryImageCrop(ratio: '1x1' | '4x3' | '16x9'): Crop | null {
    if (this.contentInstance.primary_image === null) {
      return null;
    }

    return this.contentInstance.primary_image.crops[ratio].sizes[0];
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
}

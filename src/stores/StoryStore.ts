import { makeAutoObservable, runInAction } from 'mobx';

import { AxiosService } from '../services/AxiosService';
import { Story } from './Story';

/** 
 * @class: StoryStore
 * @description: A mobx domain store representing a store of Axios stories.
*/
export class StoryStore {
  service: AxiosService;
  isLoadingStories = false;
  stories: Story[] = [];

  constructor() {
    makeAutoObservable(this);
    this.service = new AxiosService();
  }

  /** 
   * @class: loadMostRecentStories
   * @description: Loads the most recent stories using the Axios stream and content APIs.
  */
  async loadMostRecentStories(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const stream: AxiosStream = await this.service.getStream();

    const contentCalls = stream.results.map(id => {
      return this.service.getContent(id);
    });

    const data: AxiosContentInstance[] = await Promise.all(contentCalls);

    runInAction(() => {
      this.stories = data.map((story) => new Story(story));
    });
  }

  getStory(id: string): Story | null {
    return (
      this.stories.find(story => {
        return id === story.id;
      }) || null
    );
  }
}

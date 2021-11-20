import { AxiosService } from '../services/AxiosService';
import { makeAutoObservable, runInAction } from 'mobx';

export class StoryStore {
  service: AxiosService;
  isLoadingStories = false;
  stories: AxiosContentInstance[] = []

  constructor() {
    makeAutoObservable(this);
    this.service = new AxiosService();
  }

  async loadMostRecentStories(): Promise<void> {
    const stream: AxiosStream = await this.service.getStream();

    const contentCalls = stream.results.map(id => {
      return this.service.getContent(id);
    });

    const data: AxiosContentInstance[] = await Promise.all(contentCalls);

    runInAction(() => {
      this.stories = data
    });
  }
}

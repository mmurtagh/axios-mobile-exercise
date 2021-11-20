const API_PATH = 'https://api.axios.com/api';
const STREAM_PATH = '/render/stream/content';
const CONTENT_PATH = '/render/content';

export class AxiosService {
  async getStream({ pageSize = 20 }: { pageSize? : number } = {}): Promise<AxiosStream> {
    const response = await fetch(
      `${API_PATH}${STREAM_PATH}?page_size=${pageSize}`,
    );

    return response.json();
  }

  async getContent(id: string): Promise<AxiosContentInstance> {
    const response = await fetch(`${API_PATH}${CONTENT_PATH}/${id}`);

    return response.json();
  }
}

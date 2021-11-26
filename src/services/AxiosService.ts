const API_PATH = 'https://api.axios.com/api';
const STREAM_PATH = '/render/stream/content';
const CONTENT_PATH = '/render/content';

/** 
 * @class: AxiosService
 * @description: Class with methods to access Axios apis
*/
export class AxiosService {
  /** 
   * @name: getStream
   * @description: Makes a request to the Axios stream API
   * (https://api.axios.com/api/render/stream/content/)
   * @returns: an AxiosStream object
  */
  async getStream({ pageSize = 20 }: { pageSize? : number } = {}): Promise<AxiosStream> {
    const response = await fetch(
      `${API_PATH}${STREAM_PATH}?page_size=${pageSize}`,
    );

    return (response.json() as Promise<AxiosStream>);
  }

  /** 
   * @name: getContent
   * @description: Makes a request to the Axios content API
   * (https://api.axios.com/api/render/content/c13dbda5-893d-46ba-ae6a-87ff8e34c74e//)
   * @returns: an AxiosContentInstance object
  */
  async getContent(id: string): Promise<AxiosContentInstance> {
    const response = await fetch(`${API_PATH}${CONTENT_PATH}/${id}`);

    return (response.json() as Promise<AxiosContentInstance>);
  }
}
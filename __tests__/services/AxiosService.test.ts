import { AxiosService } from '../../src/services/AxiosService';

describe('AxiosService', () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockResolvedValue({ json: () => 'data' });
  });

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  describe('getStream', () => {
    test('getStream with pageSize', async () => {
      const service = new AxiosService();
      const pageSize = 123;
      await service.getStream({ pageSize });
  
      expect(fetch).toBeCalledWith(`https://api.axios.com/api/render/stream/content?page_size=${pageSize}`);
    });

    test('getStream w/o pageSize', async () => {
      const service = new AxiosService();
      await service.getStream();
  
      expect(fetch).toBeCalledWith('https://api.axios.com/api/render/stream/content?page_size=20');
    });
  });

  test('getContent', async () => {
    const service = new AxiosService();
    const id = '1A2B3C'
    await service.getContent(id);

    expect(fetch).toBeCalledWith(`https://api.axios.com/api/render/content/${id}`);
  });
});

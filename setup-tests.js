const dayjs = jest.requireActual('dayjs');
const relativeTime = jest.requireActual('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

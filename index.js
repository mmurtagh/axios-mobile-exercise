import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

AppRegistry.registerComponent(appName, () => App);

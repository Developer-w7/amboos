/** @format */

import {AppRegistry} from 'react-native';
import AppNavigator from './src/app';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppNavigator);

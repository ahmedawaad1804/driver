import React from 'react';
import { Image, Dimensions } from 'react-native';
import { createSwitchNavigator, createStackNavigator,createAppContainer} from 'react-navigation';
import Main from '../Main/Main'
import Map from '../Map/Map'
import Login from '../Login/Login'
import Details from '../Details/Details'
import DetailsDriver from '../DetailsDriver/DetailsDriver'
const Stack = createStackNavigator({
    Main,
    Map,
    Details,
    DetailsDriver
})
const switchNavigator = createSwitchNavigator({
    Login,
    Stack
})

// const App = createAppContainer(Stack);
// const AppContainer = createAppContainer(switchNavigator);
export default switchNavigator
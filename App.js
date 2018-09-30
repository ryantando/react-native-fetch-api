import React from 'react';
import { StackNavigator } from 'react-navigation';

import DetailsScreen from './src/detail';
import HomeScreen from './src/home';
import FilmsScreen from './src/films';
import PlanetsScreen from './src/planets';
import SpeciesScreen from './src/species'


const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    Films: {
      screen: FilmsScreen
    },
    Planets: {
      screen: PlanetsScreen
    },
    Species: {
      screen: SpeciesScreen
    }
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

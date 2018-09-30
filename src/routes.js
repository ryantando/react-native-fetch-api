import React from 'react';
import DetailScreen from 'detail'
import HomeScreen from 'home'
​
const RootStack = StackNavigator(
    {
        HomeScreen: {
        screen: HomeScreen,
      },
      DetailScreen: {
        screen: DetailsScreen,
      },
    },
    {
      initialRouteName: 'Home',
    }
);
​
export default RootStack;
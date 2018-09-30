import React, {Component, PropTypes} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements'


const dummySearchBarProps = {
    showLoading: true,
    onFocus: () => console.log("focus"),
    onBlur: () => console.log("blur"),
    onCancel: () => console.log("cancel"),
    onClearText: () => console.log("cleared"),
    onChangeText: text => console.log("text:", text),
  }

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
            dataBackup: null,
        }
    }
    static navigationOptions = {
      title: "Home Screen"
    }
    setSearchText(event){
        searchText = event.nativeEvent.text;
        data       = this.state.dataBackup;
        searchText = searchText.trim().toLowerCase();
        data = data.filter(l => {
            return l.name.toLowerCase().match( searchText );
        });
       this.setState({
        dataSource : data
    });
    }   
  
    componentDidMount () {
        console.log(this.state.dataSource);
          return fetch('https://swapi.co/api/people/')
              .then ( (response) => response.json() )
              .then( (responseJson) => {
                  this.setState({
                      isLoading: false,
                      dataSource: responseJson.results,
                      dataBackup: responseJson.results,
                  })
              })
          .catch((error) => {
              console.log(error)
          });
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.LoadingContainer}>
                    <ActivityIndicator />
                </View>
            )
        } else {
            let people = this.state.dataSource.map((val, key) => {
                console.log(val);
                return (
                    <ListItem
                        key={key}
                        title={val.name}
                        subtitle={
                            <View key={key} style={styles.card}>
                                <Text>Birthdate : {val.birth_year}</Text>
                                <Text>Height : {val.height}</Text>
                            </View>
                        }
                        onPress={() => {
                                this.props.navigation.navigate('Details', {
                                itemId: {key},
                                otherParam: {val},
                                type: 'Details'
                            });
                        }}
                    />
                )
            });
            return (
                <View style={styles.container}>
                    <SearchBar 
                    lightTheme
                    onChange={this.setSearchText.bind(this)}
                    placeholder="Search" 
                    platform="android" {...dummySearchBarProps}
                    />
                
                    <ScrollView style={styles.container}>
                        {people}
                    </ScrollView>
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    container: {
      /* marginTop: 50, */
      backgroundColor: '#F5FCFF',
      paddingBottom: 50,
    },
    loadingStyle: {
        /* marginTop: 50, */
        flex:1,
    },
    LoadingContainer: {
        /* marginTop: 50, */
        paddingVertical: 30,
        backgroundColor: '#F5FCFF',
    },
    card: {
      flex: 1,
      margin: 20,
      margin: 10
    },
    item: {
      flex: 1,
      margin: 20,
      margin: 10,
      textAlign: 'center',
      fontSize: 20,
    }
});

export default HomeScreen;
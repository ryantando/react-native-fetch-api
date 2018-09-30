import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, TouchableHighlight, ActivityIndicator } from 'react-native';

class PlanetsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingPlanets: true,
            dataSource: null
        }
    }
    componentDidMount () {
        return fetch(this.props.navigation.state.params.url)
            .then ( (response) => response.json() )
            .then( (responseJson) => {
                this.setState({
                    isLoadingPlanets: false,
                    dataSource: responseJson,
                })
                console.log(responseJson);
            })
        .catch((error) => {
            console.log(error)
        });
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Planets',
        headerStyle: {
          backgroundColor: '#c6c9ce',
        },
        tintColor: 'transparent',
        headerLeft: <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../img/close_red.png')} 
                        style={{marginTop: 10, marginLeft:10, width:40,height:40, justifyContent: 'center', alignItems: 'center'}} />
                    </TouchableOpacity>
    });

    render() {
        if (this.state.isLoadingPlanets) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            )
        } else {
            let dataSource = this.state.dataSource;
            return (
                <View style={{ flex: 1, marginTop:20}}>
                    <Text style={styles.texttitle}>{dataSource.name}</Text>
                    <Text style={styles.texttitle}>Terrain : {dataSource.terrain}</Text>
                    <Text style={styles.texttitle}>Climate : {dataSource.climate}</Text>
                    <Text style={styles.texttitle}>Gravity : {dataSource.gravity}</Text>
                    <Text style={styles.texttitle}>Diameter : {dataSource.diameter}</Text>
                    <Text style={styles.texttitle}>Orbital period : {dataSource.orbital_period}</Text>
                    <Text style={styles.texttitle}>population : {dataSource.population}</Text>
                    <Text style={styles.texttitle}>Rotation period : {dataSource.rotation_period}</Text>
                    <Text style={styles.texttitle}>Surface water : {dataSource.diameter}</Text>
                    <Text style={styles.texttitle}>Terrain : {dataSource.terrain}</Text>
                </View>
                )
        }
    }
  }
  const styles = StyleSheet.create({
    container: {
        /* marginTop: 50, */
        paddingVertical: 20,
        backgroundColor: '#F5FCFF',
    },
    texttitle: {
        alignSelf: 'flex-start',
        fontSize: 15,
        paddingBottom: 10,
        paddingLeft: 20,
    },
    containerScroll: {
        /* marginTop: 50, */
        paddingVertical: 20,
        backgroundColor: '#F5FCFF',
      },
    });

export default PlanetsScreen;
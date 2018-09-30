import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, TouchableHighlight, ActivityIndicator } from 'react-native';

class SpeciesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingSpecies: true,
            dataSource: null
        }
    }
    componentDidMount () {
        return fetch(this.props.navigation.state.params.url)
            .then ( (response) => response.json() )
            .then( (responseJson) => {
                this.setState({
                    isLoadingSpecies: false,
                    dataSource: responseJson,
                })
                console.log(responseJson);
            })
        .catch((error) => {
            console.log(error)
        });
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Species ',
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
        if (this.state.isLoadingSpecies) {
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
                    <Text style={styles.texttitle}>Classification : {dataSource.classification}</Text>
                    <Text style={styles.texttitle}>Designation : {dataSource.designation}</Text>
                    <Text style={styles.texttitle}>Average Height : {dataSource.average_height}</Text>
                    <Text style={styles.texttitle}>Average Lifespan : {dataSource.average_lifespan}</Text>
                    <Text style={styles.texttitle}>Eye Color : {dataSource.eye_colors}</Text>
                    <Text style={styles.texttitle}>Hair colors : {dataSource.hair_colors}</Text>
                    <Text style={styles.texttitle}>Skin colors : {dataSource.skin_colors}</Text>
                    <Text style={styles.texttitle}>Hair colors : {dataSource.hair_colors}</Text>
                    <Text style={styles.texttitle}>Language : {dataSource.language}</Text>
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

export default SpeciesScreen;
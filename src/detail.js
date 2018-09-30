import React, {Component, PropTypes} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';

import { ListItem } from 'react-native-elements'

class DetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingFilms: true,
            dataSourceFilms: [],
            isLoadingStarships: true,
            dataSourceStarships: null,
        }
    }
    
    componentDidMount () {
        this.props.navigation.state.params.otherParam.val.films.map((val,key) => {
            fetch(val)
            .then ( (response) => response.json() )
            .then( (responseJson) => {
                this.setState({
                    isLoadingFilms: false,
                    dataSourceFilms: [...this.state.dataSourceFilms, responseJson],
                })
            })
            .catch((error) => {
                console.log(error)
            });
            console.log("finished")
        });
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Details ' +  navigation.state.params.otherParam.val.name,
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
        
    if(this.state.isLoadingFilms){
        films = (<View style={styles.LoadingContainer}>
        <ActivityIndicator />
            </View>)
    }else{
        console.log(this.state.dataSourceFilms);
        films = this.state.dataSourceFilms.map((val,key) => (
                    <ListItem
                    key={key}
                    title={val.title}
                    subtitle={val.release_date}
                    onPress={() =>
                        this.props.navigation.navigate('Films', {
                            itemId: {key},
                            otherParam: {val}
                        })
                    }
                    />
        ))
    }
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');
        return (
        <ScrollView style={{ flex: 1, marginTop:20 }}>
            <Text style={styles.texttitle}>Id: {JSON.stringify(itemId.key)}</Text>
            <Text style={styles.texttitle}>Name: {(otherParam.val.name)}</Text>
            <Text style={styles.texttitle}>Birth Year: {(otherParam.val.birth_year)}</Text>
            <Text style={styles.texttitle}>Eye Color: {(otherParam.val.eye_color)}</Text>
            <Text style={styles.texttitle}>Gender: {(otherParam.val.gender)}</Text>
            <Text style={styles.texttitle}>Hair Color: {(otherParam.val.hair_color)}</Text>
            <Text style={styles.texttitle}>Skin Color: {(otherParam.val.skin_color)}</Text>
            <Text style={styles.texttitle}>Height: {(otherParam.val.height)}</Text>
            {films}
            <View style={styles.button}>
                <Button
                    title="Check Home World"
                    onPress={() =>
                        this.props.navigation.push('Planets', {
                            people:otherParam.val.name,
                            url:otherParam.val.homeworld,
                        })
                    }
                />
            </View>

            <View style={styles.button}>
                <Button
                title="Check Species"
                onPress={() =>
                    this.props.navigation.push('Species', {
                        people:otherParam.val.name,
                        url:otherParam.val.species[0],
                    })
                }
                />
            </View>
      </ScrollView>
      );
    }
  }
  const styles = StyleSheet.create({
    button: {
        marginTop: 10,
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

export default DetailsScreen;
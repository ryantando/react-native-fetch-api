import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, ScrollView} from 'react-native';

class FilmsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingFilms: true,
            dataSourceFilms: null
        }
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Films - ' +  navigation.state.params.otherParam.val.title,
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
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');
        return (
        <ScrollView style={{ flex: 1, marginTop:20 }}>
            <Text style={styles.texttitle}>Title: {otherParam.val.title}</Text>
            <Text style={styles.texttitle}>Release Date: {(otherParam.val.release_date)}</Text>
            <Text style={styles.texttitle}>Director: {(otherParam.val.director)}</Text>
            <Text style={styles.texttitle}>Producer: {(otherParam.val.producer)}</Text>
            <Text style={styles.texttitle}>Opening Crawl: {(otherParam.val.opening_crawl)}</Text>
            <Text style={styles.texttitle}>Episode ID: {(otherParam.val.episode_id)}</Text>
        </ScrollView>
         );
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

export default FilmsScreen;
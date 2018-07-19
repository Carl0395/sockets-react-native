/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Image,
    ImageBackground
} from 'react-native';
import SocketIoClient from 'socket.io-client';
import Toolbar from "./src/Toolbar";
export default class Sockets extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: [{key: 0, value: 'valor'}],
            text: ''
        };

        this.onReceive = this.receiveMessage.bind(this);
        this.socket = SocketIoClient('https://chat-react-native.herokuapp.com');
        this.socket.on('message', this.onReceive);
    }

    /**
     * Cuando el servidor envia un mensaje
     */
    receiveMessage = (message) => {
        //console.warn("nuevo", message);
        let data = this.state.dataSource;
        data.unshift({key: data.length, value: message});
        this.setState({
            dataSource: data,
        })
    };

    sendMessageApp = (message) => {
        this.socket.emit('message', message);
    };

    renderItem = (item) => {
        return (
            <View>
                <View style={{backgroundColor: 'white', padding: 10, marginHorizontal: 10, borderWidth: 1, borderRadius: 5, marginVertical: 5}}>
                    <Text style={{flex: 1, fontWeight: 'bold', maxHeight: 15}}>{item.value}</Text>
                </View>
            </View>
        )
    };

    render() {
        return (
            <ImageBackground source={require('./src/images/whatsapp.jpg')} style={{flex: 1}}>
                <KeyboardAvoidingView behavior={(Platform.OS === 'ios')? "padding" : null} style={styles.container}>
                    <FlatList
                        style={{top: 0, marginBottom: 4, right: 0, bottom: 40, marginTop: 55}}
                        enableEmptySections = {true}
                        data={this.state.dataSource}
                        initialNumToRender={27}
                        keyExtractor={item => item.key}
                        renderItem={(item) => this.renderItem(item.item)}
                        inverted={true}
                    />

                    <View style={{bottom: 0, height: 50, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#ccc'}}>
                        <TextInput
                            value={this.state.text}
                            onChangeText={(text) => this.setState({text: text})}
                            style={{height: 50, marginLeft: 10}}
                            placeholder={"Escriba un mensaje"}/>
                        <TouchableOpacity style={{position: 'absolute', right: 20, top: 15}} onPress={() => this.sendMessageApp(this.state.text)}>
                            <Image source={require('./src/images/sent_mail.png')} borderColor={'#dcdcdc'} style={{width: 20, height: 20, tintColor: '#cccccc'}}/>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

                <Toolbar/>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('Sockets', () => Sockets);

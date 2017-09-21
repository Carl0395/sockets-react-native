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
    TextInput
} from 'react-native';
import SocketIoClient from 'socket.io-client';
export default class Sockets extends Component {

    constructor(props) {
        super(props);


        this.state = {
            dataSource: ['valor'],
            text: ''
        };

        this.onReceive = this.receiveMessage.bind(this);
        this.socket = SocketIoClient('https://chat-react-native.herokuapp.com');
        this.socket.on('message', this.onReceive);
    }

    componentDidMount() {

    }

    /** Cuando el servidor envia un mensaje
     *
     */
    receiveMessage = (message) => {
        console.warn("nuevo", message);
        let data = this.state.dataSource;
        data.push(message);
        this.setState({
            dataSource: data,
        })
    };

    onSend(messages = []) {
        this.socket.emit('message', {name: 'celular', text: 'prueba movil'});
    }



    _renderItem = (item) => {
        console.warn(item.item)
        return (
            <View style={{flex: 1}}>
                <Text style={{backgroundColor: 'red', top: 10}}>{item.item}</Text>
            </View>
        )
    };

    addItem = (item) => {

        let object = item;
        this.state.dataSource.push(object);
        this.setState({dataSource: this.state.dataSource})
        console.warn(item, this.state.dataSource)
    };

    render() {
        return (
            <View style={styles.container}>

                <FlatList
                    style={{top: 0, marginBottom: 4, right: 0, bottom: 40, marginTop: 20}}
                    enableEmptySections = {true}
                    data={this.state.dataSource}
                    initialNumToRender={27}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item}
                    renderItem={(item) => {
                        return (
                            <View>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={{flex: 1, fontWeight: 'bold', maxHeight: 15}}>{item.item}</Text>
                                </View>
                            </View>
                        )
                    }}
                />

                <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 50, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#ccc'}}>
                    <TextInput style={{height: 50, marginLeft: 10}}
                            placeholder={"Escriba un mensaje"}/>
                    <TouchableOpacity style={{position: 'absolute',}}>
                        <Text>Button</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eaffff'
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

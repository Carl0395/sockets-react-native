import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export default class Toolbar extends Component {

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>
                    Wasi Chat
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#1b562b',
        justifyContent: 'center'
    },
    title: {
        color: '#FFF',
        marginLeft: 10,
        marginTop: 10,
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        fontSize: 18
    }
});
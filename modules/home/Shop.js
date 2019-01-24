import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Shop extends Component {
    static navigationOptions = {
        header: null
    };

    state = {}
    render() {
        return (
            <View>
                <Text>
                    this is Shop Page
                </Text>
            </View>
        );
    }
}

export default Shop;
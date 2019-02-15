import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ShopCart extends Component {
    static navigationOptions = {
        header: null
    };

    state = {}
    render() {
        return (
            <View>
                <Text>
                    this is ShopCart Page
                </Text>
            </View>
        );
    }

}

export default ShopCart;
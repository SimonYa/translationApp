import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Community extends Component {
    static navigationOptions = {
        header: null
    };

    state = {}
    render() {
        return (
            <View>
                <Text>
                    this is Community Page
                </Text>
            </View>
        );
    }
}

export default Community;
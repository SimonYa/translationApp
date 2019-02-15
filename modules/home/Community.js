import React, { Component } from 'react';
import { View, Text, ToastAndroid } from 'react-native';
import { Provider, Button, Toast } from '@ant-design/react-native';

class Community extends Component {
    static navigationOptions = {
        header: null
    };

    state = {}
    render() {
        return (
            <Provider>
                <View>
                    <Text>
                        this is Community Page
                </Text>
                    <Button onPress={showToast} style={{ marginTop: 5, backgroundColor: 'red' }} type="primary" size='large'>翻译</Button>
                </View>
            </Provider>
        );
    }

    toastTest = () => {

    }
}

function showToast() {
    Toast.info('This is a toast tips 2 !!!', 3);
}



export default Community;
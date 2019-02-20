import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from '@ant-design/react-native';

class ModifyUserInfo extends Component {
    state = {}
    render() {
        return (
            <View>
                <Button
                    type='primary'
                    size='large'
                    style={{
                        backgroundColor: 'red'
                    }}
                    onPress={this.handleExitLogin}
                >
                    退出登录
                </Button>
            </View>
        );
    }

    handleExitLogin = () => {
        storage.remove({
            key: 'userInfo'
        });
    }
}

export default ModifyUserInfo;
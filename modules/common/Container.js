import React, { PureComponent } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Provider } from '@ant-design/react-native';

class Container extends PureComponent {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Provider style={{ flex: 1 }}>
                    <View style={{ flex: 1, backgroundColor: '#e6e6e6' }}>
                        {this.props.children}
                    </View>
                </Provider>
            </SafeAreaView>
        );
    }
}

export default Container;
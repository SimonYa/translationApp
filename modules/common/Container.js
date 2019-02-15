import React, { PureComponent } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

class Container extends PureComponent {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flex: 1 }}>
                    <View style={{ flex: 1, backgroundColor:'#e6e6e6' }}>
                        {this.props.children}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default Container;
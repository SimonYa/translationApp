import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Container from '../common/Container';
import ScreenUtil from '../../base/ScreenUtil';

import { Icon } from '@ant-design/react-native';


class User extends Component {
    static navigationOptions = {
        header: null
    };

    state = {}
    render() {
        return (
            <Container>

                <View style={{
                    height: ScreenUtil.scaleSize(250),
                    backgroundColor: 'white',
                    borderRadius: ScreenUtil.scaleSize(10),
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Icon name="smile" size="lg" />
                        <Text>名字</Text>
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    marginTop: ScreenUtil.scaleSize(10),
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: ScreenUtil.scaleSize(70),
                        backgroundColor: 'white',
                        marginTop: ScreenUtil.scaleSize(2),
                        paddingLeft: ScreenUtil.scaleSize(10),
                        paddingRight: ScreenUtil.scaleSize(5),
                    }}>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Icon name="cloud" size="md" />
                            <Text style={{
                                paddingLeft: ScreenUtil.scaleSize(10),
                                fontSize: ScreenUtil.setSpText2(26)
                            }}>我的收藏</Text>
                        </View>
                        <Icon name="right" size="md" />
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: ScreenUtil.scaleSize(70),
                        backgroundColor: 'white',
                        marginTop: ScreenUtil.scaleSize(2),
                        paddingLeft: ScreenUtil.scaleSize(10),
                        paddingRight: ScreenUtil.scaleSize(5),
                    }}>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Icon name="shopping-cart" size="md" />
                            <Text style={{
                                paddingLeft: ScreenUtil.scaleSize(10),
                                fontSize: ScreenUtil.setSpText2(26)
                            }}>购物车</Text>
                        </View>
                        <Icon name="right" size="md" />
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: ScreenUtil.scaleSize(70),
                        backgroundColor: 'white',
                        marginTop: ScreenUtil.scaleSize(2),
                        paddingLeft: ScreenUtil.scaleSize(10),
                        paddingRight: ScreenUtil.scaleSize(5),
                    }}>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Icon name="user" size="md" />
                            <Text style={{
                                paddingLeft: ScreenUtil.scaleSize(10),
                                fontSize: ScreenUtil.setSpText2(26)
                            }}>用户中心</Text>
                        </View>
                        <Icon name="right" size="md" />
                    </View>
                </View>
            </Container>
        );
    }
}

export default User;
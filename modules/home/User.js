import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';
import Container from '../common/Container';
import ScreenUtil from '../../base/ScreenUtil';

import { Icon } from '@ant-design/react-native';


class User extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            //0：非VIP
            vipText: '点击开通',
            isVip: false,
            userinfo: null
        }

        this.selfState = {
            isLogin: false
        }
    }

    render() {

        let vipText = this.state.vipText;
        this.state.userinfo = {
            name: '张三四',
            headImg: 'http://bhms-fru-dev.oss-cn-shenzhen.aliyuncs.com/images/8c5a89ce668440f9b25fce8337f704c8.png'
        };

        return (
            <Container>
                <View style={{
                    height: ScreenUtil.scaleSize(250),
                    backgroundColor: '#FEAB0E',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        flexDirection: 'column',
                        flex: 1,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity
                            onPress={this.handleLogin}
                            style={{
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Image
                                source={{ uri: this.state.userinfo.headImg }}
                                style={{
                                    width: ScreenUtil.scaleSize(120),
                                    height: ScreenUtil.scaleSize(120),
                                    borderRadius: ScreenUtil.scaleSize(80),
                                }}
                            />
                            <Text style={{
                                fontSize: ScreenUtil.setSpText2(26),
                                color: 'black',
                                marginTop: ScreenUtil.scaleSize(10)
                            }}>{this.state.userinfo.name}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        height: 40,
                        width: '100%',
                        marginLeft: ScreenUtil.scaleSize(15),
                        marginRight: ScreenUtil.scaleSize(15),
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity>
                            <ImageBackground
                                source={require('../../resource/images/club_card.png')}
                                style={{
                                    width: ScreenUtil.scaleSize(500),
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'flex-end'
                                }}
                            >
                                <View style={{
                                    width: ScreenUtil.scaleSize(100),
                                    height: '50%',
                                    backgroundColor: '#C79769',
                                    marginRight: ScreenUtil.scaleSize(20),
                                    borderRadius: ScreenUtil.scaleSize(50),
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: ScreenUtil.setSpText2(16)
                                    }}>
                                        {vipText}
                                    </Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    height: ScreenUtil.scaleSize(150),
                    width: '100%',
                    backgroundColor: 'white',
                    borderBottomLeftRadius: ScreenUtil.scaleSize(10),
                    borderBottomRightRadius: ScreenUtil.scaleSize(10),
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: ScreenUtil.scaleSize(10)
                }}>
                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        width: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        paddingLeft: ScreenUtil.scaleSize(15)
                    }}>
                        <Text style={{
                            fontSize: ScreenUtil.setSpText2(24),
                            color: 'black'
                        }}>
                            我的订单
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        flex: 3,
                        width: '100%',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => { this.handleMyOrder(1) }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                alignItems: 'center'
                            }}>
                                <Image
                                    source={require('../../resource/images/all.png')}
                                    style={{
                                        width: ScreenUtil.scaleSize(50),
                                        height: ScreenUtil.scaleSize(50),
                                    }}
                                />
                                <Text style={{
                                    fontSize: ScreenUtil.setSpText2(20),
                                }}>
                                    全部
                            </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.handleMyOrder(2) }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                alignItems: 'center'
                            }}>
                                <Image
                                    source={require('../../resource/images/waitPay.png')}
                                    style={{
                                        width: ScreenUtil.scaleSize(50),
                                        height: ScreenUtil.scaleSize(50),
                                    }}
                                />
                                <Text style={{
                                    fontSize: ScreenUtil.setSpText2(20),
                                }}>
                                    待付款
                            </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.handleMyOrder(3) }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                alignItems: 'center'
                            }}>
                                <Image
                                    source={require('../../resource/images/waitSend.png')}
                                    style={{
                                        width: ScreenUtil.scaleSize(50),
                                        height: ScreenUtil.scaleSize(50),
                                    }}
                                />
                                <Text style={{
                                    fontSize: ScreenUtil.setSpText2(20),
                                }}>
                                    待发货
                            </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.handleMyOrder(4) }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                alignItems: 'center'
                            }}>
                                <Image
                                    source={require('../../resource/images/waitShou.png')}
                                    style={{
                                        width: ScreenUtil.scaleSize(50),
                                        height: ScreenUtil.scaleSize(50),
                                    }}
                                />
                                <Text style={{
                                    fontSize: ScreenUtil.setSpText2(20),
                                }}>
                                    待收货
                            </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>

                    {/* vip专有权限 */}
                    {
                        this.state.isVip ?
                            <View style={{
                                height: 300
                            }}>

                            </View>
                            : null
                    }


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
                                <Icon name="cloud" size="md" color='#FEAB0E' />
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
                                <Icon name="shopping-cart" size="md" color='#FEAB0E' />
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
                                <Icon name="environment" size="md" color='#FEAB0E' />
                                <Text style={{
                                    paddingLeft: ScreenUtil.scaleSize(10),
                                    fontSize: ScreenUtil.setSpText2(26)
                                }}>地址管理</Text>
                            </View>
                            <Icon name="right" size="md" />
                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    }

    //头像点击处理事件
    handleLogin = () => {
        // this.selfState.isLogin = true;
        if (this.selfState.isLogin) {
            this.props.navigation.navigate('ModifyUserInfo');
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    //处理我的订单的点击事件
    handleMyOrder = (type) => {
        //type：1--全部   2--待付款   3--待发货   4--待收货
    }
}

export default User;
import React, { Component } from 'react';
import { View, ImageBackground, Dimensions, Text } from 'react-native';
import Container from '../../common/Container';
import { Card, InputItem, Button } from '@ant-design/react-native';
import ScreenUtil from '../../../base/ScreenUtil';

const { height, width } = Dimensions.get('window');
class Login extends Component {
    state = {
        code: '发送验证码'
    }
    render() {

        console.log(height + ',' + width);

        return (
            <Container>
                <View style={{
                    flex: 1
                }}>
                    <ImageBackground
                        source={require('../../../resource/images/loginbg.jpg')}
                        style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Card style={{
                                width: '80%',
                            }}>


                                <InputItem
                                    placeholder='请输入昵称'
                                >
                                    昵称:
                                </InputItem>
                                <InputItem
                                    placeholder='请输入电话'
                                    type='phone'
                                    maxLength={11}
                                    style={{
                                        marginRight: 0,
                                        paddingRight: 0
                                    }}
                                    extra={
                                        <View style={{
                                            width: ScreenUtil.scaleSize(120),
                                            height: ScreenUtil.scaleSize(50),
                                            borderRadius: ScreenUtil.scaleSize(50),
                                            backgroundColor: '#7D8DF9',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                color: 'white',
                                                fontSize: ScreenUtil.setSpText2(20)
                                            }}>{this.state.code}</Text>
                                        </View>
                                    }
                                >
                                    电话:
                                </InputItem>
                                <InputItem
                                    placeholder='请输入密码'
                                    type='password'
                                >
                                    密码:
                                </InputItem>
                                <InputItem
                                    placeholder='请确认密码'
                                    type='password'
                                >
                                    确认:
                                </InputItem>
                            </Card>
                        </View>
                    </ImageBackground>
                </View>
            </Container>
        );
    }
}

export default Login;
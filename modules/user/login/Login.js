import React, { Component } from 'react';
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import Container from '../../common/Container';
import { Card, InputItem, Button, Toast } from '@ant-design/react-native';
import ScreenUtil from '../../../base/ScreenUtil';


class Login extends Component {
    static navigationOptions = {
        title: '登录'
    };

    constructor(props) {
        super(props);
        this.state = {
            loginParams: {
                mobile: '',
                password: ''
            }
        }
    }

    render() {
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
                            alignItems: 'center',
                            paddingTop: ScreenUtil.scaleSize(20)
                        }}>
                            <Card style={{
                                width: '80%',
                            }}>

                                <InputItem
                                    placeholder='请输入手机号码'
                                    maxLength={11}
                                    labelNumber={3}
                                    value={this.state.loginParams.mobile}
                                    onChange={(value) => { this.setMobile(value) }}
                                >
                                    手机
                                </InputItem>
                                <InputItem
                                    placeholder='请输入密码'
                                    type='password'
                                    labelNumber={3}
                                    value={this.state.loginParams.password}
                                    onChange={(value) => { this.setPassword(value) }}
                                >
                                    密码
                                </InputItem>
                                <View style={{
                                    paddingLeft: ScreenUtil.scaleSize(15),
                                    paddingRight: ScreenUtil.scaleSize(15),
                                    paddingTop: ScreenUtil.scaleSize(15),
                                    paddingBottom: ScreenUtil.scaleSize(5),
                                }}>
                                    <Button
                                        type='primary'
                                        size='large'
                                        style={{
                                            backgroundColor: 'red'
                                        }}
                                        onPress={this.handleLogin}
                                    >
                                        登录
                                    </Button>
                                </View>
                                <View style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingTop: ScreenUtil.scaleSize(15),
                                }}>
                                    <TouchableOpacity onPress={this.goToForgotPass}>
                                        <View>
                                            <Text style={{
                                                color: 'blue',
                                                fontSize: ScreenUtil.setSpText2(20)
                                            }}>忘记密码</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{
                                        paddingRight: ScreenUtil.scaleSize(20),
                                        paddingLeft: ScreenUtil.scaleSize(20)
                                    }}>
                                        <View style={{
                                            width: 2,
                                            height: ScreenUtil.scaleSize(20),
                                            backgroundColor: 'blue'
                                        }} />
                                    </View>
                                    <TouchableOpacity onPress={this.goToRegister}>
                                        <View>
                                            <Text style={{
                                                color: 'blue',
                                                fontSize: ScreenUtil.setSpText2(20)
                                            }}>立即注册</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </Card>
                        </View>
                    </ImageBackground>
                </View>
            </Container >
        );
    }

    handleLogin = () => {
        
    }

    goToRegister = () => {
        this.props.navigation.navigate('Register');
    }

    goToForgotPass = () => {
        this.props.navigation.navigate('ForgotPass');
    }

    setPassword = (value) => {
        let patt = /\s/;
        if (patt.test(value)) {
            return;
        }
        let loginParams = this.state.loginParams;
        loginParams.password = value;
        this.setState({ loginParams: loginParams });
    }

    setMobile = (value) => {
        let patt = /\s/;
        if (patt.test(value)) {
            return;
        }
        let loginParams = this.state.loginParams;
        loginParams.mobile = value;
        this.setState({ loginParams: loginParams });
    }
}

export default Login;
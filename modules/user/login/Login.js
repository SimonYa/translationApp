import React, { Component } from 'react';
import { View, ImageBackground, Text, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import Container from '../../common/Container';
import { Card, InputItem, Button, Toast } from '@ant-design/react-native';
import ScreenUtil from '../../../base/ScreenUtil';
import Base from '../../../base/Base';


const baseUrl = Base.baseUrl;
const timeout = Base.timeout;
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
        };

        this.selfState = {
            isClickLogin: false
        }
    }

    loginFetch = () => {
        let url = baseUrl + '/user/login';

        let formData = new FormData();
        formData.append('mobile', this.state.loginParams.mobile);
        formData.append('password', this.state.loginParams.password);

        Promise.race([fetch(url, {
            method: 'POST',
            body: formData
        }), new Promise(function (resolve, reject) {
            setTimeout(() => reject(new Error('请求超时')), timeout);
        })]).then((response) => {
            console.log(response);
            if (response.ok) {
                return response.json();
            } else {
                let res = {
                    code: '000',
                    message: '服务器错误'
                }
                return res;
            }
        }).then((data) => {
            console.dir(data);
            if (data.code === '000') {
                Toast.info(data.message, 1);
                return;
            }
            if (data.code === '200') {
                let userInfo = data.data;

                storage.save({
                    key: 'userInfo', // 注意:请不要在key中使用_下划线符号!
                    data: userInfo
                }).then(() => {
                    DeviceEventEmitter.emit('updateUserInfo');
                    this.props.navigation.navigate('User');
                });
            } else {
                Toast.info(data.message, 1);
            }
        }).catch((error) => {
            Toast.info(error, 1);
        }).finally(() => {
            this.selfState.isClickLogin = false;
        });
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
        if (this.selfState.isClickLogin) {
            return;
        }
        this.selfState.isClickLogin = true;

        let loginParams = this.state.loginParams;

        //电话号码验证
        if (loginParams.mobile === '' || loginParams.mobile.length === 0) {
            Toast.info('手机号码不能为空', 1);
            this.selfState.isClickLogin = false;
            return;
        }


        let mobilePatt = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;

        if (loginParams.mobile.length < 11 || !mobilePatt.test(loginParams.mobile)) {
            Toast.info('手机号码格式不正确', 1);
            this.selfState.isClickLogin = false;
            return;
        }

        //密码验证
        if (loginParams.password === '' || loginParams.password.length === 0) {
            Toast.info('密码不能为空', 1);
            this.selfState.isClickLogin = false;
            return;
        }

        if (loginParams.password.length < 6) {
            Toast.info('密码长度不能少于6', 1);
            this.selfState.isClickLogin = false;
            return;
        }

        if (global.isNetConnected) {
            this.loginFetch();
        } else {
            Toast.info('请检查网络连接', 1);
            this.selfState.isClickLogin = false;
        }
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
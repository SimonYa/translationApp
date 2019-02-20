import React, { Component } from 'react';
import { View, ImageBackground, DeviceEventEmitter, Text, TouchableOpacity } from 'react-native';
import Container from '../../common/Container';
import { Card, InputItem, Button, Toast } from '@ant-design/react-native';
import ScreenUtil from '../../../base/ScreenUtil';
import Base from '../../../base/Base';

const baseUrl = Base.baseUrl;
const timeout = Base.timeout;
class Register extends Component {
    static navigationOptions = {
        title: '注册'
    };


    state = {
        code: '获取验证码',
        registerParams: {
            name: '',
            password: '',
            mobile: '',
            validateCode: ''
        },
        confirmPass: ''
    }

    selfState = {
        isClickRegister: false,
        isClickSendCaptcha: false,
        isBlurCheckMobile: false,
        isMobileExist: false
    }


    // ===> fetch:网络请求
    //检查电话号码是否存在
    checkMobileFetch = (mobile) => {
        let url = baseUrl + '/user/checkMobile?mobile=' + mobile;

        Promise.race([fetch(url, {
            method: 'GET',
            credentials: 'include'
        }), new Promise(function (resolve, reject) {
            setTimeout(() => reject(new Error('请求超时')), timeout);
        })]).then((response) => {
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
            if (data.code === '000') {
                Toast.info(data.message, 2);
                return;
            }
            if (data.code === '200') {
                this.selfState.isMobileExist = false;
            } else {
                this.selfState.isMobileExist = true;
            }
        }).catch((error) => {
            Toast.info(error, 2);
        }).finally(() => {
            this.selfState.isBlurCheckMobile = false;
        });
    }

    //发送验证码
    sendCaptchaFetch = (mobile) => {
        let url = baseUrl + '/user/captcha?mobile=' + mobile;

        Promise.race([fetch(url, {
            method: 'GET',
            credentials: 'include'
        }), new Promise(function (resolve, reject) {
            setTimeout(() => reject(new Error('请求超时')), timeout);
        })]).then((response) => {
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
            if (data.code === '000') {
                Toast.info(data.message, 2);
                return;
            }

            if (data.code === '200') {
                Toast.info('验证码已发送', 2);
            } else {
                Toast.info(data.message, 2);
            }
        }).catch((error) => {
            Toast.info(error, 2);
        });
    }

    //注册用户
    registerFetch = (registerParams) => {
        let url = baseUrl + '/user/insertUser';
        let registerParamsStr = JSON.stringify(registerParams);
        Promise.race([fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: registerParamsStr
        }), new Promise(function (resolve, reject) {
            setTimeout(() => reject(new Error('请求超时')), timeout);
        })]).then((response) => {
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
            if (data.code === '000') {
                Toast.info(data.message, 2);
                return;
            }

            if (data.code === '200') {
                let userInfo = data.data;

                storage.save({
                    key: 'userInfo', // 注意:请不要在key中使用_下划线符号!
                    data: userInfo
                }).then(() => {
                    global.userInfo = userInfo;
                    global.isLogin = true;

                    DeviceEventEmitter.emit('updateUserInfo');
                    this.props.navigation.navigate('User');
                });
            } else {
                Toast.info(data.message, 2);
            }
        }).catch((error) => {
            Toast.info(error, 2);
        }).finally(() => {
            this.selfState.isClickRegister = false;
        });
    }

    //  <=== fetch:end

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
                            alignItems: 'center'
                        }}>
                            <Card style={{
                                width: '80%',
                            }}>


                                <InputItem
                                    placeholder='请输入昵称'
                                    labelNumber={3}
                                    value={this.state.registerParams.name}
                                    onChange={(value) => { this.setName(value) }}
                                >
                                    昵称
                                </InputItem>
                                <InputItem
                                    placeholder='请输入密码'
                                    type='password'
                                    labelNumber={3}
                                    value={this.state.registerParams.password}
                                    onChange={(value) => { this.setPassword(value) }}
                                >
                                    密码
                                </InputItem>
                                <InputItem
                                    placeholder='请再次输入密码'
                                    type='password'
                                    labelNumber={3}
                                    value={this.state.confirmPass}
                                    onChange={(value) => { this.setConfirmPass(value) }}
                                >
                                    密码
                                </InputItem>

                                <InputItem
                                    placeholder='请输入手机号码'
                                    onBlur={this.blurCheckMobile}
                                    maxLength={11}
                                    labelNumber={3}
                                    value={this.state.registerParams.mobile}
                                    onChange={(value) => { this.setMobile(value) }}
                                >
                                    手机
                                </InputItem>
                                <InputItem
                                    placeholder='请输入验证码'
                                    maxLength={6}
                                    labelNumber={3}
                                    value={this.state.registerParams.validateCode}
                                    onChange={(value) => { this.setValidateCode(value) }}
                                    style={{
                                        marginRight: 0,
                                        paddingRight: 0
                                    }}
                                    extra={
                                        <TouchableOpacity onPress={this.handleSendCaptcha}>
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
                                                }}>{this.state.code === '获取验证码' ? this.state.code : this.state.code + '(s)'}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    }
                                >
                                    验证码
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
                                        onPress={this.handleRegister}
                                    >
                                        注册
                                    </Button>
                                </View>
                            </Card>
                        </View>
                    </ImageBackground>
                </View>
            </Container>
        );
    }

    //检查电话号码是否存在
    blurCheckMobile = () => {
        if (this.selfState.isBlurCheckMobile) {
            return;
        }
        this.selfState.isBlurCheckMobile = true;

        if (!isNetConnected) {
            this.selfState.isBlurCheckMobile = false;
            return;
        }

        let mobile = this.state.registerParams.mobile;
        let flag = this.verifyMobile(mobile);
        if (flag === 200) {
            this.checkMobileFetch(mobile);
        } else {
            this.selfState.isBlurCheckMobile = false;
        }
    }



    //电话号码格式验证方法
    verifyMobile = (mobile) => {
        // 200：表示合法   1：空   2：格式不正确
        let flag = 200;

        //电话验证
        if (mobile === '' || mobile.length === 0) {
            flag = 1;
        }

        let mobilePatt = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
        if (mobile.length < 11 || !mobilePatt.test(mobile)) {
            flag = 2;
        }

        return flag;
    }

    //发送验证码
    handleSendCaptcha = () => {
        if (this.selfState.isClickSendCaptcha) {
            return;
        }

        this.selfState.isClickSendCaptcha = true;

        if (!isNetConnected) {
            Toast.info('请检查网络连接', 2);
            this.selfState.isClickSendCaptcha = false;
            return;
        }

        let mobile = this.state.registerParams.mobile;
        let flag = this.verifyMobile(mobile);
        if (flag === 1) {
            Toast.info('手机号码不能为空', 2);
            this.selfState.isClickSendCaptcha = false;
            return;
        }

        if (flag === 2) {
            Toast.info('手机号码格式不正确', 2);
            this.selfState.isClickSendCaptcha = false;
            return;
        }

        if (this.selfState.isMobileExist) {
            Toast.info('电话号码已存在，请去登录', 2);
            this.selfState.isClickSendCaptcha = false;
            return;
        }

        this.setState({ code: 60 }, () => {
            this.captchaCountdown = setInterval(() => {
                if (typeof this.state.code === 'number' && this.state.code > 0) {
                    this.setState({ code: this.state.code - 1 });
                } else {
                    this.setState({ code: '获取验证码' });
                    this.captchaCountdown && clearInterval(this.captchaCountdown);
                    this.selfState.isClickSendCaptcha = false;
                }
            }, 1000);
        });

        this.sendCaptchaFetch(mobile);
    }

    handleRegister = () => {
        if (this.selfState.isClickRegister) {
            return;
        }
        this.selfState.isClickRegister = true;
        let registerParams = this.state.registerParams;
        let confirmPass = this.state.confirmPass;

        //昵称验证
        if (registerParams.name === '' || registerParams.length === 0) {
            Toast.info('昵称不能为空', 2);
            this.selfState.isClickRegister = false;
            return;
        }

        //密码验证
        if (registerParams.password === '' || registerParams.password.length === 0 || confirmPass === '' || confirmPass.length === 0) {
            Toast.info('密码不能为空', 2);
            this.selfState.isClickRegister = false;
            return;
        }

        if (registerParams.password.length < 6) {
            Toast.info('密码长度不能少于6', 2);
            this.selfState.isClickRegister = false;
            return;
        }

        if (confirmPass !== registerParams.password) {
            Toast.info('密码不一致', 2);
            this.selfState.isClickRegister = false;
            return;
        }

        //电话验证
        if (registerParams.mobile === '' || registerParams.mobile.length === 0) {
            Toast.info('手机号码不能为空', 2);
            this.selfState.isClickRegister = false;
            return;
        }


        let mobilePatt = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;

        if (registerParams.mobile.length < 11 || !mobilePatt.test(registerParams.mobile)) {
            Toast.info('手机号码格式不正确', 2);
            this.selfState.isClickRegister = false;
            return;
        }

        if (this.selfState.isMobileExist) {
            Toast.info('电话号码已存在，请去登录', 2);
            this.selfState.isClickRegister = false;
            return;
        }

        //验证码验证
        if (registerParams.validateCode === '' || registerParams.validateCode.length === 0) {
            Toast.info('验证码不能为空', 2);
            this.selfState.isClickRegister = false;
            return;
        }

        if (!isNetConnected) {
            Toast.info('请检查网络连接', 2);
            this.selfState.isClickRegister = false;
            return;
        }

        this.registerFetch(registerParams);
    }


    setName = (value) => {
        let patt = /\s/;
        if (patt.test(value)) {
            return;
        }
        let registerParams = this.state.registerParams;
        registerParams.name = value;
        this.setState({ registerParams: registerParams });
    }

    setPassword = (value) => {
        let patt = /\s/;
        if (patt.test(value)) {
            return;
        }
        let registerParams = this.state.registerParams;
        registerParams.password = value;
        this.setState({ registerParams: registerParams });
    }

    setConfirmPass = (value) => {
        let patt = /\s/;
        if (patt.test(value)) {
            return;
        }
        this.setState({ confirmPass: value });
    }

    setMobile = (value) => {
        let patt = /\s/;
        if (patt.test(value)) {
            return;
        }
        let registerParams = this.state.registerParams;
        registerParams.mobile = value;
        this.setState({ registerParams: registerParams });
    }

    setValidateCode = (value) => {
        let patt = /\s/;
        if (patt.test(value)) {
            return;
        }
        let registerParams = this.state.registerParams;
        registerParams.validateCode = value;
        this.setState({ registerParams: registerParams });
    }
}

export default Register;
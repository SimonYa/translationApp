import React, { Component } from 'react';
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import Container from '../../common/Container';
import { Card, InputItem, Button, Toast } from '@ant-design/react-native';
import ScreenUtil from '../../../base/ScreenUtil';
import Utils from '../../common/Utils';
import Base from '../../../base/Base';

const baseUrl = Base.baseUrl;
const timeout = Base.timeout;
class ForgotPass extends Component {
    static navigationOptions = {
        title: '忘记密码'
    };


    constructor(props) {
        super(props);
        this.state = {
            modifyPassParams: {
                mobile: '',
                password: '',
                validateCode: ''
            },
            code: '获取验证码',
        }

        this.selfState = {
            isPressUpdatePass: false,
            isClickSendCaptcha: false,
            isBlurCheckMobile: false,
            isMobileExist: false
        }
    }

    componentWillUnmount() {
        this.loginTimer && clearTimeout(this.loginTimer);
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

    //更新密码
    updatePassFetch = (params) => {
        let url = baseUrl + '/user/updatePassword';
        let paramsStr = JSON.stringify(params);
        Promise.race([fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: paramsStr
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
                Toast.info('更新成功', 2);
                this.loginTimer = setTimeout(() => { this.props.navigation.navigate('Login'); }, 2000);
            } else {
                Toast.info(data.message, 2);
            }
        }).catch((error) => {
            Toast.info(error, 2);
        }).finally(() => {
            this.selfState.isPressUpdatePass = false;
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
                            alignItems: 'center',
                            paddingTop: ScreenUtil.scaleSize(20)
                        }}>
                            <Card style={{
                                width: '80%',
                            }}>

                                <InputItem
                                    placeholder='请输入手机号码'
                                    onBlur={this.blurCheckMobile}
                                    maxLength={11}
                                    labelNumber={3}
                                    value={this.state.modifyPassParams.mobile}
                                    onChange={(value) => { this.setMobile(value) }}
                                >
                                    手机
                                </InputItem>
                                <InputItem
                                    placeholder='请输入密码'
                                    type='password'
                                    labelNumber={3}
                                    value={this.state.modifyPassParams.password}
                                    onChange={(value) => { this.setPassword(value) }}
                                >
                                    新密码
                                </InputItem>
                                <InputItem
                                    placeholder='请输入验证码'
                                    maxLength={6}
                                    labelNumber={3}
                                    value={this.state.modifyPassParams.validateCode}
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
                                        onPress={this.pressUpdatePass}
                                    >
                                        修改密码
                                    </Button>
                                </View>
                                <View style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    paddingTop: ScreenUtil.scaleSize(15),
                                    paddingRight: ScreenUtil.scaleSize(15),
                                }}>
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

    blurCheckMobile = () => {
        if (this.selfState.isBlurCheckMobile) {
            return;
        }
        this.selfState.isBlurCheckMobile = true;

        if (!isNetConnected) {
            this.selfState.isBlurCheckMobile = false;
            return;
        }

        let mobile = this.state.modifyPassParams.mobile;
        let flag = Utils.verifyMobile(mobile);
        if (flag === 200) {
            this.checkMobileFetch(mobile);
        } else {
            this.selfState.isBlurCheckMobile = false;
        }
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

        let mobile = this.state.modifyPassParams.mobile;
        let password = this.state.modifyPassParams.password;
        let flag = Utils.verifyMobile(mobile);
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

        //密码验证
        if (password === '' || password.length === 0) {
            Toast.info('请填写密码', 2);
            this.selfState.isClickSendCaptcha = false;
            return;
        }

        if (!this.selfState.isMobileExist) {
            Toast.info('号码尚未注册', 2);
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


    pressUpdatePass = () => {
        if (this.selfState.isPressUpdatePass) {
            return;
        }
        this.selfState.isPressUpdatePass = true;
        let modifyPassParams = this.state.modifyPassParams
        let mobile = modifyPassParams.mobile;
        let password = modifyPassParams.password;
        let validateCode = modifyPassParams.validateCode;
        let flag = Utils.verifyMobile(mobile);
        if (flag === 1) {
            Toast.info('手机号码不能为空', 2);
            this.selfState.isPressUpdatePass = false;
            return;
        }

        if (flag === 2) {
            Toast.info('手机号码格式不正确', 2);
            this.selfState.isPressUpdatePass = false;
            return;
        }

        //密码验证
        if (password === '' || password.length === 0) {
            Toast.info('密码不能为空', 2);
            this.selfState.isPressUpdatePass = false;
            return;
        }

        if (password.length < 6) {
            Toast.info('密码长度不能少于6', 2);
            this.selfState.isPressUpdatePass = false;
            return;
        }

        //验证码验证
        if (validateCode === '' || validateCode.length === 0) {
            Toast.info('验证码不能为空', 2);
            this.selfState.isPressUpdatePass = false;
            return;
        }

        if (!isNetConnected) {
            Toast.info('请检查网络连接', 2);
            this.selfState.isPressUpdatePass = false;
            return;
        }

        if (!this.selfState.isMobileExist) {
            Toast.info('号码尚未注册', 2);
            this.selfState.isPressUpdatePass = false;
            return;
        }

        this.updatePassFetch(modifyPassParams);
    }

    goToRegister = () => {
        this.props.navigation.navigate('Register');
    }

    setValidateCode = (value) => {
        let patt = /\s/;
        if (patt.test(value)) {
            return;
        }
        let modifyPassParams = this.state.modifyPassParams;
        modifyPassParams.validateCode = value;
        this.setState({ modifyPassParams: modifyPassParams });
    }

    setPassword = (value) => {
        let patt = /\s/;
        if (patt.test(value)) {
            return;
        }
        let modifyPassParams = this.state.modifyPassParams;
        modifyPassParams.password = value;
        this.setState({ modifyPassParams: modifyPassParams });
    }

    setMobile = (value) => {
        let patt = /\s/;
        if (patt.test(value)) {
            return;
        }
        let modifyPassParams = this.state.modifyPassParams;
        modifyPassParams.mobile = value;
        this.setState({ modifyPassParams: modifyPassParams });
    }
}

export default ForgotPass;
import React, { Component } from 'react';
import { View, ImageBackground, Dimensions, Text, TouchableOpacity } from 'react-native';
import Container from '../../common/Container';
import { Card, InputItem, Button, Toast } from '@ant-design/react-native';
import ScreenUtil from '../../../base/ScreenUtil';

// const { height, width } = Dimensions.get('window');
class Register extends Component {
    static navigationOptions = {
        title: '注册'
    };


    state = {
        code: '获取验证码',
        userInfo: {
            name: '',
            password: '',
            mobile: '',
            validateCode: ''
        },
        confirmPass: ''
    }

    selfState = {
        isClickRegister: false
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
                            alignItems: 'center'
                        }}>
                            <Card style={{
                                width: '80%',
                            }}>


                                <InputItem
                                    placeholder='请输入昵称'
                                    labelNumber={3}
                                    value={this.state.userInfo.name}
                                    onChange={(value) => { this.setName(value) }}
                                >
                                    昵称
                                </InputItem>
                                <InputItem
                                    placeholder='请输入密码'
                                    type='password'
                                    labelNumber={3}
                                    value={this.state.userInfo.password}
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
                                    maxLength={11}
                                    labelNumber={3}
                                    value={this.state.userInfo.mobile}
                                    onChange={(value) => { this.setMobile(value) }}
                                >
                                    手机
                                </InputItem>
                                <InputItem
                                    placeholder='请输入验证码'
                                    maxLength={6}
                                    labelNumber={3}
                                    value={this.state.userInfo.validateCode}
                                    onChange={(value) => { this.setValidateCode(value) }}
                                    style={{
                                        marginRight: 0,
                                        paddingRight: 0
                                    }}
                                    extra={
                                        <TouchableOpacity>
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


    handleRegister = () => {
        if (this.selfState.isClickRegister) {
            return;
        }
        this.selfState.isClickRegister = true;
        let userInfo = this.state.userInfo;
        let confirmPass = this.state.confirmPass;

        //昵称验证
        if (userInfo.name === '' || userInfo.length === 0) {
            Toast.info('昵称不能为空', 2);
            this.selfState.isClickRegister = false;
            return;
        }

        //密码验证
        if (userInfo.password === '' || userInfo.password.length === 0 || confirmPass === '' || confirmPass.length === 0) {
            Toast.info('密码不能为空', 2);
            this.selfState.isClickRegister = false;
            return;
        }

        if (userInfo.password.length < 6) {
            Toast.info('密码长度不能少于6', 2);
            this.selfState.isClickRegister = false;
            return;
        }

        if (confirmPass !== userInfo.password) {
            Toast.info('密码不一致', 2);
            this.selfState.isClickRegister = false;
            return;
        }

        //电话验证
        if (userInfo.mobile === '' || userInfo.mobile.length === 0) {
            Toast.info('手机号码不能为空', 2);
            this.selfState.isClickRegister = false;
            return;
        }


        let mobilePatt = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;

        if (userInfo.mobile.length < 11 || !mobilePatt.test(userInfo.mobile)) {
            Toast.info('手机号码格式不正确', 2);
            this.selfState.isClickRegister = false;
            return;
        }

        //验证码验证
        if (userInfo.validateCode === '' || userInfo.validateCode.length === 0) {
            Toast.info('验证码不能为空', 2);
            this.selfState.isClickRegister = false;
            return;
        }

        this.selfState.isClickRegister = false;
    }

    setName = (value) => {
        let patt = /\s/;
        if (patt.test(value)) {
            return;
        }
        let userInfo = this.state.userInfo;
        userInfo.name = value;
        this.setState({ userInfo: userInfo });
    }

    setPassword = (value) => {
        let patt = /\s/;
        if (patt.test(value)) {
            return;
        }
        let userInfo = this.state.userInfo;
        userInfo.password = value;
        this.setState({ userInfo: userInfo });
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
        let userInfo = this.state.userInfo;
        userInfo.mobile = value;
        this.setState({ userInfo: userInfo });
    }

    setValidateCode = (value) => {
        let patt = /\s/;
        if (patt.test(value)) {
            return;
        }
        let userInfo = this.state.userInfo;
        userInfo.validateCode = value;
        this.setState({ userInfo: userInfo });
    }
}

export default Register;
import React, { Component } from 'react';
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import Container from '../../common/Container';
import { Card, InputItem, Button, Toast } from '@ant-design/react-native';
import ScreenUtil from '../../../base/ScreenUtil';


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
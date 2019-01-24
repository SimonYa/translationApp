import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import ScreenUtil from '../../base/ScreenUtil';
import Base from '../../base/Base';
import Container from '../common/Container';
import TranCardContainer from '../common/transalte_common/TranCardContainer';
import ModalDropdown from 'react-native-modal-dropdown';

import { Button, Card, WhiteSpace, TextareaItem, Icon } from '@ant-design/react-native';

const baseUrl = Base.baseUrl;
class Translate extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            pickerDataArr: [
                {
                    id: 0,
                    label: '英文',
                    value: 'en',
                },
                {
                    id: 1,
                    label: '中文',
                    value: 'zh',
                }
            ],
            //输入的需要翻译的内容
            inputText: '',
            //翻译之后的内容
            translatedValue: '',
            isHaveTextBool: false
        }

        this.condition = {
            isClickTranslate: false,
            //翻译请求参数
            translateParamsObj: {
                sourceLanguage: 'en',
                targetLanguage: 'zh',
                sourceText: ''
            }
        }
    }

    translateFetch = () => {
        let url = baseUrl + '/translate/translate';
        let params = this.condition.translateParamsObj;
        let paramsStr = JSON.stringify(params);

        fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: paramsStr
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            let targetText = data.data.targetText;
            this.setState({ translatedValue: targetText });
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            this.condition.isClickTranslate = false;
        });
    }


    render() {

        return (
            <Container style={{ flex: 1 }}>
                <WhiteSpace size="sm" />
                <TranCardContainer>
                    <View style={{
                        height: ScreenUtil.scaleSize(50),
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <ModalDropdown options={this.state.pickerDataArr}
                                renderButtonText={this._renderButtonText}
                                renderRow={this._renderRow}
                                onSelect={this._onSelectSource}
                                defaultIndex={0}
                                defaultValue={this.state.pickerDataArr[0].label}
                                dropdownStyle={{ height: ScreenUtil.scaleSize(100) }}
                                textStyle={{ fontSize: ScreenUtil.setSpText2(25) }}
                                style={{
                                    paddingRight: ScreenUtil.scaleSize(5),
                                    height: ScreenUtil.scaleSize(50),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }} />
                            <Icon name='caret-down' size='xxs' />
                        </View>
                        <View>
                            <Icon name='arrow-right' size='md' color='black' />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <ModalDropdown options={this.state.pickerDataArr}
                                renderButtonText={this._renderButtonText}
                                renderRow={this._renderRow}
                                onSelect={this._onSelectTarget}
                                defaultIndex={1}
                                defaultValue={this.state.pickerDataArr[1].label}
                                dropdownStyle={{ height: ScreenUtil.scaleSize(100) }}
                                textStyle={{ fontSize: ScreenUtil.setSpText2(25) }}
                                style={{
                                    paddingRight: ScreenUtil.scaleSize(5),
                                    height: ScreenUtil.scaleSize(50),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }} />
                            <Icon name='caret-down' size='xxs' />
                        </View>
                    </View>
                    <Card.Body style={{ borderRadius: ScreenUtil.scaleSize(20), flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <ScrollView contentContainerStyle={{ flex: 1 }}>
                                {/* <TextareaItem
                                    onChange={this._handleInputText}
                                    value={this.state.inputText}
                                    placeholder='请输入你需要翻译的内容'
                                    rows={ScreenUtil.scaleSize(14)}
                                    last={true}
                                    onLongPress={this.copyAndPast} /> */}
                                <TextInput
                                    style={{
                                        flex: 1,
                                        textAlignVertical: 'top',
                                        fontSize: ScreenUtil.setSpText2(25)
                                    }}
                                    placeholder='请输入你需要翻译的内容'
                                    multiline={true}
                                    onChangeText={this._handleInputText}
                                />
                            </ScrollView>
                        </View>
                    </Card.Body>
                    <View style={{ width: '100%', height: 2, backgroundColor: '#E6E6E6', marginBottom: ScreenUtil.scaleSize(5) }} />
                    <Button onPress={this._handleTranslate} style={{ marginTop: 5, backgroundColor: 'red' }} type="primary" size='large'>翻译</Button>
                </TranCardContainer>
                <WhiteSpace size="sm" />
                <TranCardContainer>
                    <Card.Body style={{ flex: 1, borderRadius: ScreenUtil.scaleSize(20) }}>
                        <View style={{ flex: 1 }}>
                            <ScrollView contentContainerStyle={{ flex: 1 }}>
                                {/* <TextareaItem value={this.state.translatedValue} placeholder='翻译内容' editable={false} rows={11} last={true} /> */}
                                <Text style={{ flex: 1, fontSize: ScreenUtil.setSpText2(25) }} selectable={true}>
                                    {this.state.translatedValue}
                                </Text>
                            </ScrollView>
                        </View>
                    </Card.Body>
                    <View style={{ width: '100%', height: 2, backgroundColor: '#E6E6E6', marginBottom: ScreenUtil.scaleSize(5) }} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Icon name="camera" size='lg' color='black' />
                        <Icon name="sound" size='lg' color='black' />
                    </View>
                </TranCardContainer>
                <WhiteSpace size="sm" />
            </Container>
        );
    }

    //下拉列表选中后显示的文本
    _renderButtonText = (rowData) => {
        let { label } = rowData;
        return label;
    }
    //下拉列表渲染的item
    _renderRow = (rowData) => {
        let { label, id } = rowData;
        return (
            <View style={{ padding: ScreenUtil.scaleSize(5) }} key={id}>
                <Text style={{ fontSize: ScreenUtil.setSpText2(25) }}>{label}</Text>
            </View>
        );
    }

    //源语言列表选中回调函数
    _onSelectSource = (index) => {
        let translateParamsObj = this.condition.translateParamsObj;
        let pickerDataArr = this.state.pickerDataArr;
        translateParamsObj.sourceLanguage = pickerDataArr[index].value;
        this.setState({ translateParamsObj: translateParamsObj });
    }

    //目标语言列表选中回调函数
    _onSelectTarget = (index) => {
        let translateParamsObj = this.condition.translateParamsObj;
        let pickerDataArr = this.state.pickerDataArr;
        translateParamsObj.targetLanguage = pickerDataArr[index].value;
        this.setState({ translateParamsObj: translateParamsObj });
    }

    //翻译按钮处理函数
    _handleTranslate = () => {
        if (this.condition.isClickTranslate) {
            return;
        }
        this.condition.isClickTranslate = true;

        let inputText = this.state.inputText;
        let translateParamsObj = this.condition.translateParamsObj;
        translateParamsObj.sourceText = inputText;
        this.condition.translateParamsObj = translateParamsObj;
        this.translateFetch();
    }

    //输入的翻译内容受控处理函数
    _handleInputText = (value) => {
        if (value != '' && value.length > 0) {
            this.setState({ inputText: value, isHaveTextBool: true });
        } else {
            this.setState({ inputText: value, isHaveTextBool: false });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6E6E6'
    }
});

export default Translate;
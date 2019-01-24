import React, { PureComponent } from 'react';

import { Card, WingBlank } from '@ant-design/react-native';

import ScreenUtil from '../../../base/ScreenUtil';

class TranCardContainer extends PureComponent {

    render() {
        return (
            <WingBlank style={{ flex: 1 }} size="sm">
                <Card style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: ScreenUtil.scaleSize(20),
                    paddingLeft: ScreenUtil.scaleSize(10),
                    paddingRight: ScreenUtil.scaleSize(10),
                }}>
                    {this.props.children}
                </Card>
            </WingBlank>
        );
    }
}

export default TranCardContainer;
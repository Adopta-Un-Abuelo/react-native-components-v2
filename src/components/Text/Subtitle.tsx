import React, { FC } from 'react';
import { TextStyle } from 'react-native';

import Text from './Text';

const Subtitle: FC <Props> = props =>{

    return(
        <Text
            style={{
                fontFamily: 'Poppins-Regular',
                marginBottom: 24,
                paddingTop: 8,
                paddingBottom: 8,
                backgroundColor: 'white',
                ...props.style
            }}
        >
            {props.children}
        </Text>
    )
}
export default Subtitle;
export interface Props{
    style?: TextStyle
}
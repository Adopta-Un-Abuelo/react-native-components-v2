import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { MenuList } from '../src';
import { Watch, Wifi, WifiOff } from 'react-native-feather'

storiesOf('MenuList', module)
	.add('Main', () => {
        return(
            <MenuList
                options={[
                    {
                        id: 'option1',
                        title: 'Option 1',
                        icon: Watch
                    },
                    {
                        id: 'option2',
                        title: 'Option 3',
                        icon: Wifi
                    },
                    {
                        id: 'option3',
                        title: 'Option 3',
                        icon: WifiOff
                    }
                ]}
            />
	    )
})
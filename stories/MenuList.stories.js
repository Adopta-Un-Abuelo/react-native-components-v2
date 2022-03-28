import React from 'react';

import { action } from '@storybook/addon-actions';
import { array, object } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { MenuList } from '../src';
import { Watch, Wifi, WifiOff } from 'react-native-lucide'

storiesOf('MenuList', module)
	.add('Main', () => {
        return(
            <MenuList
                style={object('style', {
                    margin: 24
                })}
                options={array('options', [
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
                ])}
                onPress={action('onPress')}
            />
	    )
})

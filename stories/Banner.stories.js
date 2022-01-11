import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, object, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Banner, Text } from '../src';
import { Wifi } from 'react-native-feather';

storiesOf('Banner', module)
	.add('Main', () => (
        <Banner
            position={select('position', ["top", "bottom", "center"], 'bottom')}
            title={text('title', 'Titulo de prueba')}
            icon={Wifi}
            buttonProps={object('buttonProps', {
                title: 'Button'
            })}
        >
            <Text>Children</Text>
        </Banner>
	))

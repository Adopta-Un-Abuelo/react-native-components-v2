import React from 'react';

import { object, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Banner, Text } from '../src';
import { Wifi } from 'lucide-react-native';

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

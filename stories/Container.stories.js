import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Container, Text } from '../src';

storiesOf('Container', module)
	.add('Main', () => (
		<Container
            navbarProps={{
                title: 'Title',
                navigation: {
                    canGoBack: () => console.log('Hola')
                }
            }}
            buttonProps={{
                title: 'Bottom button'
            }}
        >
            <Text>Children</Text>
        </Container>
	))

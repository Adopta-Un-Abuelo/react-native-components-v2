import React from 'react';
import { showMessage } from "react-native-flash-message";

import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Alert, Button } from '../src';

storiesOf('Alert', module)
	.add('Warning', () => (
        <>
        <Button
            title='Show message'
            onPress={() => {
                showMessage({
                    message: text('message', 'This is a test message'),
                    icon: 'danger'
                });
            }}
        />
		<Alert
			type={'warning'}
            position={'top'}
		/>
        </>
	))

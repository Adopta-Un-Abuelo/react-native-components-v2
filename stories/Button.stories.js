import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Button } from '../src';

storiesOf('Button', module)
	.add('Primary', () => (
		<Button
			title={text('text', 'Button')}
			loading={boolean('loading', false)}
			disabled={boolean('disabled', false)}
			onPress={action('onPress')}
		/>
	))

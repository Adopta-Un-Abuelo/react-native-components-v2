import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Button, ButtonSmall } from '../src';

storiesOf('Button', module)
	.add('Primary', () => (
		<Button
			title={text('text', 'Button')}
			loading={boolean('loading', false)}
			disabled={boolean('disabled', false)}
			onPress={action('onPress')}
		/>
	))
	.add('Small', () => (
		<ButtonSmall
			title={text('text', 'Button')}
			loading={boolean('loading', false)}
			disabled={boolean('disabled', false)}
			onPress={action('onPress')}
		/>
	))

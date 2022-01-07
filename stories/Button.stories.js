import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, text, color, object, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Button, ButtonBottom, ButtonImage, CallToAction, Color } from '../src';
import { Info } from 'react-native-feather';

storiesOf('Button', module)
	.add('Main', () => (
		<Button
			style={object('style', {
				margin: 24
			})}
			textStyle={object('textStyle', {})}
			iconStyle={object('iconStyle', {})}
			title={text('text', 'Button')}
			loading={boolean('loading', false)}
			disabled={boolean('disabled', false)}
			color={color('color', Color.blue5)}
			type={select('type', {
				fill: 'fill',
				line: 'line'
			}, 'fill')}
			size={select('size', {
				normal: 'normal',
				small: 'small'
			}, 'normal')}
			hideIcon={boolean('hideIcon', false)}
			onPress={action('onPress')}
		/>
	))
	.add('WithIcon', () => (
		<Button
			style={object('style', {
				margin: 24
			})}
			textStyle={object('textStyle', {})}
			iconStyle={object('iconStyle', {})}
			title={text('text', 'Button')}
			loading={boolean('loading', false)}
			disabled={boolean('disabled', false)}
			color={color('color', Color.blue5)}
			type={select('type', {
				fill: 'fill',
				line: 'line'
			}, 'fill')}
			size={select('size', {
				normal: 'normal',
				small: 'small'
			}, 'normal')}
			hideIcon={boolean('hideIcon', false)}
			onPress={action('onPress')}
		/>
	))
	.add('Bottom', () => (
		<ButtonBottom
			title={text('text', 'Button')}
			loading={boolean('loading', false)}
			disabled={boolean('disabled', false)}
			onPress={action('onPress')}
		/>
	))
	.add('Image', () => (
		<ButtonImage
			icon={Info}
			onPress={action('onPress')}
		/>
	))
	.add('CallToAction', () => (
		<CallToAction
			title='Call to action'
			onPress={action('onPress')}
		/>
	))

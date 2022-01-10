import React from 'react';
import { View } from 'react-native';

import { action } from '@storybook/addon-actions';
import { boolean, text, color, object, select, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Button, ButtonBottom, ButtonImage, CallToAction, Color, Text } from '../src';
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
			hideIcon={boolean('hideIcon', false)}
			icon={Info}
			onPress={action('onPress')}
		/>
	))
	.add('Bottom', () => (
		<ButtonBottom
			textStyle={object('textStyle', {})}
			iconStyle={object('iconStyle', {})}
			title={text('text', 'Button')}
			loading={boolean('loading', false)}
			disabled={boolean('disabled', false)}
			color={color('color', Color.blue5)}
			size={select('size', {
				big: 'big',
				small: 'small'
			}, 'big')}
			showShadow={boolean('showShadow', false)}
			onPress={action('onPress')}
		/>
	))
	.add('Bottom with leftView', () => (
		<ButtonBottom
			textStyle={object('textStyle', {})}
			iconStyle={object('iconStyle', {})}
			title={text('text', 'Button')}
			loading={boolean('loading', false)}
			disabled={boolean('disabled', false)}
			color={color('color', Color.blue5)}
			size={select('size', {
				big: 'big',
				small: 'small'
			}, 'big')}
			showShadow={boolean('showShadow', false)}
			leftView={() => (
				<View
					style={{flex: 2}}
				>
					<Text>
						LeftView
					</Text>
				</View>
			)}
			onPress={action('onPress')}
		/>
	))
	.add('Image', () => (
		<ButtonImage
			icon={Info}
			style={object('style', {})}
			title={text('text', 'Button')}
			height={number('height', 28)}
			width={number('width', 28)}
			color={color('color', Color.blue5)}
			fill={color('fill', 'transparent')}
			onPress={action('onPress')}
		/>
	))
	.add('CallToAction', () => (
		<CallToAction
			style={object('style', {})}
			title={text('title', 'Call to action')}
			color={color('color', Color.blue5)}
			onPress={action('onPress')}
		/>
	))

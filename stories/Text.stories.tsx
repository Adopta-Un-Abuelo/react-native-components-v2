import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { select } from '@storybook/addon-knobs';
import { Text } from '../src';

storiesOf('Text', module)
	.add('Display', () => (
		<Text
			type={select('type', {
				d1: 'd1',
				d2: 'd2'
			}, 'd2')}
		>
			Display
		</Text>
	))
	.add('Header', () => (
		<Text
			type={select('type', {
				h1: 'h1',
				h2: 'h2',
				h3: 'h3',
				h4: 'h4',
				h5: 'h5',
				h6: 'h6'
			}, 'h1')}
		>
			Header
		</Text>
	))
	.add('Paragraph', () => (
		<Text
			type={select('type', {
				p1: 'p1',
				p2: 'p2'
			}, 'p1')}
			weight={select('weight', {
				regular: 'regular',
				semibold: 'semibold',
				medium: 'medium'
			}, 'semibold')}
		>
			Paragraph
		</Text>
	))
	.add('Button', () => (
		<Text
			type={select('type', {
				b1: 'b1',
				b2: 'b2',
			}, 'b1')}
			weight={select('weight', {
				medium: 'medium',
				semibold: 'semibold'
			}, 'medium')}
		>
			Text Button
		</Text>
	))
	.add('Caption', () => (
		<Text
			type={select('type', {
				c1: 'c1',
				c2: 'c2'
			}, 'c1')}
			weight={select('weight', {
				medium: 'medium',
				regular: 'regular'
			}, 'medium')}
		>
			Caption
		</Text>
	))
	.add('Overline', () => (
		<Text type={'o1'}>
			Overline
		</Text>
	))
	.add('All', () => (
		<>
		<Text type={'d1'}>
			TextDisplay - B1
		</Text>
		<Text type={'d2'}>
			TextDisplay - B2
		</Text>
		<Text type='h1'>
			TextHeader - H1
		</Text>
		<Text type='h2'>
			TextHeader - H2
		</Text>
		<Text type='h3'>
			TextHeader - H3
		</Text>
		<Text type='h4'>
			TextHeader - H4
		</Text>
		<Text type='h5'>
			TextHeader - H5
		</Text>
		<Text type='h6'>
			TextHeader - H6
		</Text>
		<Text type='p1'>
			Text - p1
		</Text>
		<Text type='p2'>
			Text - p2
		</Text>
		<Text type='b1'>
			TextButton - b1
		</Text>
		<Text type='b2'>
			TextButton - b2
		</Text>
		<Text type='c1'>
			TextCaption - c1
		</Text>
		<Text type='c2'>
			TextCaption - c2
		</Text>
		<Text type='o1'>
			TextOverline - o1
		</Text>
		</>
	))

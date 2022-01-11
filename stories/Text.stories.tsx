import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { Text, Title, Subtitle } from '../src';

storiesOf('Text', module)
	.add('Title', () => (
		<Title>
			Title
		</Title>
	))
	.add('Subtitle', () => (
		<Subtitle>
			Subtitle
		</Subtitle>
	))
	.add('Paragraph', () => (
		<Text>
			Paragraph
		</Text>
	))

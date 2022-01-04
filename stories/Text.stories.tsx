import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { Text, Title } from '../src';

storiesOf('Text', module)
	.add('Paragraph', () => (
		<Text>
			Paragraph
		</Text>
	))
	.add('Title', () => (
		<Title>
			Title
		</Title>
	))

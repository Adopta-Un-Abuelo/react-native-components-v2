import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { Text } from '../src';

storiesOf('Text', module)
	.add('Paragraph', () => (
		<Text>
			Paragraph
		</Text>
	))

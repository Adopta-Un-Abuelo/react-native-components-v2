import React from 'react';

import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Text } from '../components';

storiesOf('Text', module)
	.add('Paragraph', () => (
		<Text>
			Paragraph
		</Text>
	))

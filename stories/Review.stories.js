import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Review } from '../src';

storiesOf('Review', module)
	.add('Main', () => (
		<Review
           
        />
	))

import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Tag } from '../src';

storiesOf('Tag', module)
	.add('Main', () => (
		<Tag
            options={[
                'Option 1',
                'Option 2',
                'Option 3'
            ]}
        />
	))

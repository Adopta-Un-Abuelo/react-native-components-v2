import React from 'react';

import { boolean, object, array } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Tag } from '../src';

storiesOf('Tag', module)
	.add('Main', () => (
		<Tag
            style={object('style', {
                margin: 24
            })}
            textStyle={object('textStyle', {})}
            optionStyle={object('optionStyle', {})}
            options={array('options', [
                'Option 1',
                'Option 2',
                'Option 3'
            ])}
            hideIcon={boolean('hideIcon', false)}
        />
	))

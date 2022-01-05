import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { Select } from '../src';

storiesOf('Select', module)
	.add('Main', () => {
        return(
            <Select
                options={[
                    {
                        id: 'option1',
                        title: 'Option 1'
                    },
                    {
                        id: 'option2',
                        title: 'Option 3'
                    },
                    {
                        id: 'option3',
                        title: 'Option 3'
                    }
                ]}
            />
	    )
    })

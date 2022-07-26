import React from 'react';

import { boolean, number, object, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { ProgressBar, VideoProgressBar } from '../src';

storiesOf('ProgressBar', module)
	.add('Main', () => (
        <ProgressBar
            style={object('style', {})}
            progress={number('progress', 20)}
            maxProgress={number('maxProgress', 100)}
        />
    ))
    .add('VideoProgressBar', () => (
        <VideoProgressBar
            style={object('style', {})}
            progress={number('progress', 20)}
            maxProgress={number('maxProgress', 100)}
        />
    ))

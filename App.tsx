import React from 'react';
import useCachedResources from './hooks/useCachedResources';
import Storybook from './storybook'

export default function App() {
    const isLoadingComplete = useCachedResources();
    if (!isLoadingComplete) {
        return null;
    } 
    else {
        return (
            <Storybook/>
        );
    }
}
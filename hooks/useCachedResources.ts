import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as React from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'Poppins-Regular': require('../src/assets/fonts/Poppins/Poppins-Regular.ttf'),
          'Poppins-Black': require('../src/assets/fonts/Poppins/Poppins-Black.ttf'),
          'Poppins-BlackItalic': require('../src/assets/fonts/Poppins/Poppins-BlackItalic.ttf'),
          'Poppins-Bold': require('../src/assets/fonts/Poppins/Poppins-Bold.ttf'),
          'Poppins-BoldItalic': require('../src/assets/fonts/Poppins/Poppins-BoldItalic.ttf'),
          'Poppins-ExtraBold': require('../src/assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
          'Poppins-ExtraBoldItalic': require('../src/assets/fonts/Poppins/Poppins-ExtraBoldItalic.ttf'),
          'Poppins-ExtraLight': require('../src/assets/fonts/Poppins/Poppins-ExtraLight.ttf'),
          'Poppins-ExtraLightItalic': require('../src/assets/fonts/Poppins/Poppins-ExtraLightItalic.ttf'),
          'Poppins-Italic': require('../src/assets/fonts/Poppins/Poppins-Italic.ttf'),
          'Poppins-Light': require('../src/assets/fonts/Poppins/Poppins-Light.ttf'),
          'Poppins-LightItalic': require('../src/assets/fonts/Poppins/Poppins-LightItalic.ttf'),
          'Poppins-Medium': require('../src/assets/fonts/Poppins/Poppins-Medium.ttf'),
          'Poppins-MediumItalic': require('../src/assets/fonts/Poppins/Poppins-MediumItalic.ttf'),
          'Poppins-SemiBold': require('../src/assets/fonts/Poppins/Poppins-SemiBold.ttf'),
          'Poppins-SemiBoldItalic': require('../src/assets/fonts/Poppins/Poppins-SemiBoldItalic.ttf'),
          'Poppins-Thin': require('../src/assets/fonts/Poppins/Poppins-Thin.ttf'),
          'Poppins-ThinItalic': require('../src/assets/fonts/Poppins/Poppins-ThinItalic.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}

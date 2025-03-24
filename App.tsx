/* eslint-disable */
import React, {type FC, useEffect, useState} from 'react';
import {MD3LightTheme as DefaultTheme} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import * as Sentry from '@sentry/react-native';
import {PersistGate} from 'redux-persist/integration/react';

import Navigator from './src/navigators';
import SplashScreen from './src/Screens/SplashScreen/Splash.Screen';
import {persistor, store} from './src/store';
import {ApolloProvider} from '@apollo/client';
import client from './src/utils/apolloClient';
import PushNotification from 'react-native-push-notification';

Sentry.init({
  dsn: 'https://c2a97730d96c05c0a4a86ac98197deab@o4506316960038912.ingest.us.sentry.io/4507920948527104',
  tracesSampleRate: 1.0,
  _experiments: {
    profilesSampleRate: 1.0,
  },
});

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'team-pharmaceuticals',
        channelName: 'Team Pharmaceuticals',
        playSound: true,
        soundName: 'ringtone',
        importance: 4, // Set the importance level
        vibrate: true,
      },
      created => console.log(`channel created: ${created}`),
    );
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          {isLoading ? <SplashScreen /> : <Navigator />}
          {/* //<Navigator />} */}
        </ApolloProvider>
      </PersistGate>
    </StoreProvider>
  );
};

// export default App;

export default Sentry.wrap(App);

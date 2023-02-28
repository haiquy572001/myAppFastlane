import * as React from 'react';
import {Suspense} from 'react';
import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';

const bootSplashLogo = require('./splash/splash.png');

const App = () => {
  const [bootSplashIsVisible, setBootSplashIsVisible] = React.useState(true);
  const [bootSplashLogoIsLoaded, setBootSplashLogoIsLoaded] =
    React.useState(false);
  const opacity = React.useRef(new Animated.Value(1));
  const translateY = React.useRef(new Animated.Value(0));

  const init = async () => {
    // You can uncomment this line to add a delay on app startup
    // await fakeApiCallWithoutBadNetwork(3000);

    try {
      await BootSplash.hide();

      Animated.stagger(250, [
        Animated.spring(translateY.current, {
          useNativeDriver: true,
          toValue: -50,
        }),
        Animated.spring(translateY.current, {
          useNativeDriver: true,
          toValue: Dimensions.get('window').height,
        }),
      ]).start();

      Animated.timing(opacity.current, {
        useNativeDriver: true,
        toValue: 0,
        duration: 150,
        delay: 350,
      }).start(() => {
        setBootSplashIsVisible(false);
      });
    } catch (error) {
      setBootSplashIsVisible(false);
    }
  };

  React.useEffect(() => {
    bootSplashLogoIsLoaded && init();
  }, [bootSplashLogoIsLoaded]);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Suspense fallback={null}>
          <GestureHandlerRootView style={styles.root}>
            <View style={styles.container}>
              {/* <SystemBars barStyle="dark-content" /> */}

              <Text style={styles.text}>Hello, Dave.</Text>

              {/* <Button
        title="Activate push notifications"
        onPress={() => {
          requestNotifications(['alert']);
        }}
      /> */}

              {bootSplashIsVisible && (
                <Animated.View
                  style={[
                    StyleSheet.absoluteFill,
                    styles.bootsplash,
                    {opacity: opacity.current},
                  ]}>
                  <Animated.Image
                    source={bootSplashLogo}
                    fadeDuration={0}
                    resizeMode="contain"
                    onLoadEnd={() => setBootSplashLogoIsLoaded(true)}
                    style={[
                      styles.logo,
                      {transform: [{translateY: translateY.current}]},
                    ]}
                  />
                </Animated.View>
              )}
            </View>
          </GestureHandlerRootView>
        </Suspense>
      </Provider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    margin: 20,
    lineHeight: 30,
    color: '#333',
    textAlign: 'center',
  },
  bootsplash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 89,
    width: 100,
  },
});
export default App;

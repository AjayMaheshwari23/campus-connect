import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {Button} from "react-native-paper"
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
const IOS_KEY = process.env.IOS_KEY;
const ANDROID_KEY = process.env.ANDROID_KEY;
const WEB_KEY = process.env.WEB_KEY;

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

import {
  Provider as PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
  MD2DarkTheme,
  MD2LightTheme,
  MD2Theme,
  MD3Theme,
  useTheme,Title,
  adaptNavigationTheme,
} from "react-native-paper";

import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import DrawerItems from "./components/global/DrawerItems";
import React from "react";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import { screens } from "./components/screens/ScreensConfig";

const Drawer = createDrawerNavigator<any>();
export const PreferencesContext = React.createContext<any>(null);

export const useExampleTheme = () => useTheme<MD2Theme | MD3Theme>();

const DrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <PreferencesContext.Consumer>
      {(preferences) => (
        <DrawerItems
          drawerNavigationProps={props}
          toggleTheme={preferences.toggleTheme}
          toggleThemeVersion={preferences.toggleThemeVersion}
          toggleCollapsed={preferences.toggleCollapsed}
          collapsed={preferences.collapsed}
          isDarkTheme={preferences.theme.dark}
        />
      )}
    </PreferencesContext.Consumer>
  );
};

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [themeVersion, setThemeVersion] = React.useState<2 | 3>(3);
  const [collapsed, setCollapsed] = React.useState(false);

  const themeMode = isDarkMode ? "dark" : "light";

  const theme = {
    2: {
      light: MD2LightTheme,
      dark: MD2DarkTheme,
    },
    3: {
      light: MD3LightTheme,
      dark: MD3DarkTheme,
    },
  }[themeVersion][themeMode];

  const preferences = React.useMemo(
    () => ({
      toggleTheme: () => setIsDarkMode((oldValue) => !oldValue),
      toggleCollapsed: () => setCollapsed(!collapsed),
      toggleThemeVersion: () => {
        setCollapsed(false);
        setThemeVersion((oldThemeVersion) => (oldThemeVersion === 2 ? 3 : 2));
      },
      collapsed,
      theme,
    }),
    [theme, collapsed]
  );

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const CombinedDefaultTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...LightTheme.colors,
    },
  };

  const CombinedDarkTheme = {
    ...MD3DarkTheme,
    ...DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      ...DarkTheme.colors,
    },
  };

  const combinedTheme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: WEB_KEY,
    iosClientId: IOS_KEY,
    webClientId: ANDROID_KEY,
  });

  useEffect(() => {
    handleEffect();
  }, [response, token]);

  async function handleEffect() {
    const user = await getLocalUser();
    console.log("userInformation = ", user);
    if (!user) {
      if (response?.type === "success") {
        setToken(response.authentication.accessToken);
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
      console.log("loaded locally");
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
        
      const user = await response.json();
      setUserInfo(user);
      await AsyncStorage.setItem("@user", JSON.stringify(user));
    } catch (error) {
      // Add your own error handler here
    }
  };

  return (
    <PaperProvider theme={theme}>
      {!userInfo ? (
        <View style={styles.container}>
          <Title style={{ fontWeight: "bold" , fontSize:30,marginTop:10,marginBottom:30}}>Campus-Connect</Title>
          <Image
            source={require("../campus-connect-rn/assets/IIITL.png")}
            style={styles.logo}
          />
          <Button
            title="Sign in with Google"
            onPress={() => {
              promptAsync();
            }}
            style={[styles.button, { backgroundColor: "#4285F4" }]}
            labelStyle={styles.buttonLabel}
          >
            <Text style={styles.buttonText}>Sign in with Google</Text>
          </Button>
        </View>
      ) : (
        <PreferencesContext.Provider value={preferences}>
          <React.Fragment>
            <NavigationContainer theme={combinedTheme}>
              <SafeAreaInsetsContext.Consumer>
                {(insets) => {
                  const { left, right } = insets || { left: 0, right: 0 };
                  const collapsedDrawerWidth = 80 + Math.max(left, right);
                  return (
                    <Drawer.Navigator
                      screenOptions={{
                        drawerStyle: {
                          borderTopRightRadius: 20,
                          borderBottomRightRadius: 20,
                          ...(collapsed
                            ? {
                                width: collapsedDrawerWidth,
                              }
                            : {}),
                        },
                      }}
                      drawerContent={(props) => <DrawerContent {...props} />}
                    >
                      {(
                        Object.keys(screens) as Array<keyof typeof screens>
                      ).map((id) => {
                        return (
                          <Drawer.Screen
                            key={id}
                            name={id}
                            component={screens[id].component}
                            options={{
                              title: screens[id].title,
                              headerShown: id !== "themingWithReactNavigation",
                            }}
                          />
                        );
                      })}
                    </Drawer.Navigator>
                  );
                }}
              </SafeAreaInsetsContext.Consumer>
              <StatusBar style={!theme.isV3 || theme.dark ? "light" : "dark"} />
            </NavigationContainer>
          </React.Fragment>
        </PreferencesContext.Provider>
      )}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  logo: {
    width: "90%",
    height: "30%",
    marginBottom: 32,
  },
  Glogo: {
    width: 15,
    height: 15,
    margin:2
  },
  button: {
    width: "80%",
    marginBottom: 16,
    borderRadius: 40,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  buttonText: {
    color: "#FFFFFF",
  },
});

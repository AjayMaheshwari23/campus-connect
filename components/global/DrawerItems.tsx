import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Badge,
  Drawer,
  MD2Colors,
  MD3Colors,
  Switch,
  Text,
  TouchableRipple,
} from "react-native-paper";
import { PreferencesContext, useExampleTheme } from "../../App";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { StyleSheet, View } from "react-native";
import { screens } from "../screens/ScreensConfig";

import { NativeModules, Linking, Platform } from "react-native";

const restartApp = () => {
  if (Platform.OS === "ios") {
    NativeModules.DevSettings.reload();
  }

  if (Platform.OS === "android") {
    Linking.sendIntent("android.intent.action.MAIN");
  }
};

type DrawerItemsProps = {
  drawerNavigationProps: DrawerContentComponentProps;
  toggleTheme: () => void;
  toggleThemeVersion: () => void;
  toggleCollapsed: () => void;
  collapsed: boolean;
  isDarkTheme: boolean;
};

const DrawerCollapsedItemsData = [
  {
    label: "Courses",
    focusedIcon: "inbox",
    unfocusedIcon: "inbox-outline",
    key: 0,
    badge: 44,
  },
  {
    label: "Starred",
    focusedIcon: "star",
    unfocusedIcon: "star-outline",
    key: 1,
  },
  {
    label: "Sent mail",
    focusedIcon: "send",
    unfocusedIcon: "send-outline",
    key: 2,
  },
  {
    label: "A very long title that will be truncated",
    focusedIcon: "delete",
    unfocusedIcon: "delete-outline",
    key: 3,
  },
  {
    label: "Full width",
    focusedIcon: "arrow-all",
    key: 4,
  },
  {
    focusedIcon: "bell",
    unfocusedIcon: "bell-outline",
    key: 5,
    badge: true,
  },
];

const DrawerItemsData = [
  {
    label: "Inbox",
    icon: "inbox",
    key: 0,
    right: () => <Text variant="labelLarge">44</Text>,
  },
  {
    label: "Starred",
    icon: "star",
    key: 1,
    right: ({ color }: { color: string }) => (
      <Badge
        visible
        size={8}
        style={[styles.badge, { backgroundColor: color }]}
      />
    ),
  },
  { label: "Sent mail", icon: "send", key: 2 },
  { label: "Colored label", icon: "palette", key: 3 },
  {
    label: "A very long title that will be truncated",
    icon: "delete",
    key: 4,
    right: () => <Badge visible size={8} style={styles.badge} />,
  },
];

export default function DrawerItems({
  drawerNavigationProps,
  toggleTheme,
  toggleThemeVersion,
  toggleCollapsed,
  collapsed,
  isDarkTheme,
}: DrawerItemsProps) {
  const [drawerItemIndex, setDrawerItemIndex] = React.useState(0);

  const preferences = React.useContext(PreferencesContext);

  const _setDrawerItem = (index: number) => setDrawerItemIndex(index);

  const { isV3, colors } = useExampleTheme();

  const coloredLabelTheme = {
    colors: isV3
      ? {
          secondaryContainer: MD3Colors.tertiary80,
          onSecondaryContainer: MD3Colors.tertiary20,
        }
      : {
          primary: MD2Colors.tealA200,
        },
  };

  return (
    <DrawerContentScrollView
      alwaysBounceVertical={false}
      style={[
        styles.drawerContent,
        {
          backgroundColor: colors.surface,
        },
      ]}
    >
      {isV3 && collapsed ? (
        <Drawer.Section style={styles.collapsedSection}>
          {DrawerCollapsedItemsData.map((props, index) => (
            <Drawer.CollapsedItem
              {...props}
              key={props.key}
              active={drawerItemIndex === index}
              onPress={() => {
                _setDrawerItem(index);
                index === 4 && preferences.toggleCollapsed();
              }}
            />
          ))}
        </Drawer.Section>
      ) : null}
      {!collapsed ? (
        <>
          <Drawer.Section title="">
            {drawerNavigationProps.state.routeNames.map((props, index) => (
              <Drawer.Item
                icon={screens[props].icon}
                label={screens[props].label}
                key={props}
                active={index === drawerNavigationProps.state.index}
                onPress={(event) => {
                  drawerNavigationProps.navigation.navigate(props);
                }}
              />
            ))}
          </Drawer.Section>

          <Drawer.Section title="Preferences">
            <TouchableRipple onPress={toggleTheme}>
              <View style={[styles.preference, isV3 && styles.v3Preference]}>
                <Text variant="labelLarge">Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>

            <TouchableRipple onPress={toggleThemeVersion}>
              <View style={[styles.preference, isV3 && styles.v3Preference]}>
                <Text variant="labelLarge">Experimental Theme</Text>
                <View pointerEvents="none">
                  <Switch value={!isV3} />
                </View>
              </View>
            </TouchableRipple>

            {isV3 ? (
              <TouchableRipple onPress={toggleCollapsed}>
                <View style={[styles.preference, isV3 && styles.v3Preference]}>
                  <Text variant="labelLarge">Experimental Drawer</Text>
                  <View pointerEvents="none">
                    <Switch value={collapsed} />
                  </View>
                </View>
              </TouchableRipple>
            ) : null}
          </Drawer.Section>
        </>
      ) : null}



      <Drawer.Item
        icon="logout"
        label="Logout"
        onPress={async () => {
          const user = await AsyncStorage.getItem("@user");
          console.log(user);
          console.log("logged out from storage");
          await AsyncStorage.removeItem("@user");
          restartApp();
        }}
      />

      
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  v3Preference: {
    height: 56,
    paddingHorizontal: 28,
  },
  badge: {
    alignSelf: "center",
  },
  collapsedSection: {
    marginTop: 16,
  },
  annotation: {
    marginHorizontal: 24,
    marginVertical: 6,
  },
});

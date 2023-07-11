import * as React from "react";
import { FlatList } from "react-native";

import type { StackNavigationProp } from "@react-navigation/stack";
import { Divider, List } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Notes from "./Notes";
import Calendar from "./Calendar";
import Overview from "./Overview";
import Timetable from "./Timetable";
import Grades from "./Grades";
import Courses from "./Courses";
import HAS from "./HelpSupport";
import MessMenu from "./MessMenu";

import { useExampleTheme } from "../../App";
import { Screen } from "../../interfaces";

// see icons at https://callstack.github.io/react-native-paper/docs/guides/icons/#1-an-icon-name

export const screens: Record<string, Screen> = {
  overview: {
    name: "overview",
    label: "Overview",
    title: "Overview",
    icon: "home",
    component: Overview,
  },
  calendar: {
    name: "calendar",
    label: "Calendar",
    title: "Calendar",
    icon: "calendar",
    component: Calendar,
  },
  agenda: {
    name: "agenda",
    label: "Notes",
    title: "Notes",
    icon: "bookmark",
    component: Notes,
  },
  timetable: {
    name: "timetable",
    label: "Timetable",
    title: "Timetable",
    icon: "timetable",
    component: Timetable,
  },
  MessMenu: {
    name: "MessMenu",
    label: "MessMenu",
    title: "MessMenu",
    icon: "food",
    component: MessMenu,
  },
  Courses: {
    name: "Courses",
    label: "Courses",
    title: "Courses",
    icon: "book-multiple",
    component: Courses,
  },
  HAS: {
    name: "HAS",
    label: "Support",
    title: "Help & Support",
    icon: "hammer-screwdriver",
    component: HAS,
  },
};

type Props = {
  navigation: StackNavigationProp<{ [key: string]: undefined }>;
};

type Item = {
  id: string;
  data: (typeof screens)[string];
};

const data = Object.keys(screens).map(
  (id): Item => ({ id, data: screens[id] })
);

export default function ScreenList({ navigation }: Props) {
  const keyExtractor = (item: { id: string }) => item.id;

  const { colors, isV3 } = useExampleTheme();
  const safeArea = useSafeAreaInsets();

  const renderItem = ({ item }: { item: Item }) => {
    const { data, id } = item;

    if (!isV3 && data.title === screens.themingWithReactNavigation.title) {
      return null;
    }

    return (
      <List.Item
        unstable_pressDelay={65}
        title={data.title}
        onPress={() => navigation.navigate(id)}
      />
    );
  };

  return (
    <FlatList
      contentContainerStyle={{
        backgroundColor: colors.background,
        paddingBottom: safeArea.bottom,
        paddingLeft: safeArea.left,
        paddingRight: safeArea.right,
      }}
      style={{
        backgroundColor: colors.background,
      }}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      data={data}
    />
  );
}

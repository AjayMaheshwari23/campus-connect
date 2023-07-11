import {
  Button,
  Card,
  Chip,
  Divider,
  Text,
  useTheme,
} from "react-native-paper";
import {  ScrollView, StyleSheet, View } from "react-native";
import {  ScreenName, Time, Timetable } from "../../interfaces";
import { screens } from "./ScreensConfig";
import CustomCard from "../molecules/CustomCard";
import FeelingProud from "../svgs/FeelingProud";
import TodoList from "../molecules/TodoListView";
import GlobalStyles from "../../config/GlobalStyles";
import TimetableView from "../compounds/TimetableView";
import { useEffect } from "react";

const fetchData = async () => {
  const resp = await fetch("http://localhost:1337/api/alerts");
  const data = await resp.json();
};


// TODO: Add types
type OverviewPageProps = {
  
} ;

const screens_to_show: Array<ScreenName> = [
  "overview",
  "timetable",
  "agenda",
  "calendar",
  "MessMenu",
  "Courses"
];

const Overview = (props: OverviewPageProps) => {
  const theme = useTheme();

  const timetable: Timetable = {
    days: [
      {
        day: "Wednesday",
        classes: [
          {
            class: { name: "DBMS2301C" },
            timeSlot: {
              from: new Time("09:00:00.000"),
              to: new Time("14:00:00.000"),
            },
          },
        ],
      },
    ],
  };

  fetchData();

  return (
    <ScrollView style={{ padding: 12 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          paddingBottom: 36,
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingVertical: 12, flexGrow: 0 }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 24,
            }}
          >
            {screens_to_show.map((screen_name) => {
              return (
                <Chip
                  key={screens[screen_name].name}
                  icon={screens[screen_name].icon}
                  onPress={() =>
                    props.navigation.navigate(screens[screen_name].name)
                  }
                >
                  {screens[screen_name].label}
                </Chip>
              );
            })}
          </View>
        </ScrollView>
        <CustomCard
          contentImage={(props) => <FeelingProud {...props} />}
          titleIcon={"timetable"}
          heading="Weekly report"
        >
          <Card.Content
            style={{
              ...styles.buttonContainer,
              justifyContent: "flex-start",
            }}
          >
            <Button
              style={{ width: "100%" }}
              onPress={() => console.log("PRESS")}
              mode="text"
              icon={"clipboard-text-clock"}
            >
              Show more
            </Button>
          </Card.Content>
        </CustomCard>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 12,
            alignItems: "baseline",
          }}
        >
          <Text variant="titleLarge" style={{ fontWeight: "600" }}>
            Today
          </Text>
          <Text
            variant="titleSmall"
            style={{ fontWeight: "100", color: "gray" }}
          >
            Apr 22, 2023
          </Text>
        </View>
        <CustomCard
          divider={false}
          heading="Pending events"
          titleIcon={"bookmark"}
        >
          <Card.Content style={{ paddingBottom: 24 }}>
            <TodoList
              data={[
                {
                  completed: false,
                  date: new Date(),
                  subtasks: [],
                  title: "Internship Discussion Meet",
                },
              ]}
            />
          </Card.Content>
          <Divider style={{ backgroundColor: theme.colors.primary }} />
          <Card.Content
            style={{
              ...GlobalStyles.HView,
              ...styles.buttonContainer,
              justifyContent: "space-around",
              alignItems: "stretch",
            }}
          >
            <Button
              style={{ flexGrow: 1 }}
              onPress={() => console.log("PRESS")}
              mode="text"
              icon={"clipboard-text-clock"}
            >
              Show more
            </Button>
            <Button
              style={{ flexGrow: 1 }}
              onPress={() => console.log("PRESS")}
              mode="text"
              icon={"plus"}
            >
              Add event
            </Button>
          </Card.Content>
        </CustomCard>
        <TimetableView data={timetable} />
      </View>
    </ScrollView>
  );
};

Overview.title = "Overview";

const styles = StyleSheet.create({
  buttonContainer: {
    paddingBottom: 8,
    padding: 6,
    display: "flex",
    flexDirection: "row",
  },
});

export default Overview;

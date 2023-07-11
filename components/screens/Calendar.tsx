import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, FAB, Portal, Text, useTheme } from "react-native-paper";
import CalendarView from "../compounds/CalendarView";
import TodoList from "../molecules/TodoListView";
import React from "react";

type CalendarPageProps = {};

const Calendar = (props: CalendarPageProps) => {
  const theme = useTheme();

  const [fabOpen, setFabOpen] = React.useState(false);

  return (
    <React.Fragment>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          paddingBottom: 36,
        }}
      >
        <CalendarView theme={theme} />
        <ScrollView style={{ padding: 12 }}>
          <TodoList
            data={[
              {
                completed: false,
                date: new Date(),
                subtasks: [],
                title: "",
              },
            ]}
          />
        </ScrollView>
      </View>
      <FAB.Group
        open={fabOpen}
        visible
        icon={fabOpen ? "close" : "plus"}
        actions={[
          {
            icon: "bell",
            label: "Remainder",
            onPress: () => console.log("Pressed Remainder"),
          },
          {
            icon: "clipboard",
            label: "Exam",
            onPress: () => console.log("Pressed Exam"),
          },
          {
            icon: "book-open-blank-variant",
            label: "Homework",
            onPress: () => console.log("Pressed Homework"),
          },
        ]}
        onStateChange={({ open }) => setFabOpen(open)}
        onPress={() => {
          if (fabOpen) {
            // do something if the speed dial is open
          }
        }}
      />
    </React.Fragment>
  );
};

Calendar.title = "Calendar";

export default Calendar;

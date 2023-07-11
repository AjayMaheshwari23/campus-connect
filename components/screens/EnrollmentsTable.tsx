import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";


const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const EnrollmentsTable = ({ enrollments }) => {
  const currentDate = new Date();
  const currentDay = days[currentDate.getDay()];


  return (
    <View style={styles.container}>
      <Text style={styles.header}>{currentDay}</Text>
      <FlatList
        data={enrollments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.column}>{item.course_id}</Text>
            {item.timings &&
              item.timings.map((value, index) => {
                console.log(value);
                return <Text style={styles.column}> {value.start_time.substr(0,5)} </Text>;
              })
            }
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  column: {
    flex: 1,
    paddingHorizontal: 8,
  },
});

export default EnrollmentsTable;

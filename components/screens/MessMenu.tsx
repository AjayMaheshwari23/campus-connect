import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { List, FAB, ActivityIndicator } from "react-native-paper";
import client from "../../hasura/credentials";

const GET_MESS_MENU = gql`
  query Mess_Menu {
    mess {
      id
      day
      breakfast
      dinner
      lunch
      snacks
    }
  }
`;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  cardMargin: {
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MessMenu = () => {
  const [data, setdata] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isdatarecieved, setisdatarecieved] = useState(true);
  const [expanded, setExpanded] = useState(Array(days.length).fill(false));

  const handleAccordionPress = (index) => {
    setExpanded((prevState) => {
      const newExpanded = [...prevState];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  const currentDate = new Date();
  const currentDay = days[currentDate.getDay()];

  const fetchData = async (fetchPolicy: any) => {
    try {
      const { data } = await client.query({
        query: GET_MESS_MENU,
        fetchPolicy,
      });

      const sortedData = [...data.mess].sort((a, b) => a.id - b.id);

      setdata(sortedData);

      setisdatarecieved(false);
      const currentDayIndex = days.findIndex((day) => day === currentDay);

      if (!expanded[currentDayIndex]) {

        handleAccordionPress(currentDayIndex);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const refreshData = async () => {
    setIsRefreshing(true);
    await fetchData("network-only");
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchData("cache-first");
  }, []);

  if (isdatarecieved) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <List.Section title="Mess Meals">
          {data.map((meal, index) => {
            return (
              <List.Accordion
                key={index}
                title={`${meal.day}`}
                expanded={expanded[index]}
                left={(props) => <List.Icon {...props} icon="food" />}
                onPress={() => handleAccordionPress(index)}
              >
                <List.Item title="Breakfast" description={meal.breakfast} />
                <List.Item title="Lunch" description={meal.lunch} />
                <List.Item title="Snacks" description={meal.snacks} />
                <List.Item title="Dinner" description={meal.dinner} />
              </List.Accordion>
            );
          })}
        </List.Section>

        <FAB
          icon="refresh"
          label="Refresh"
          onPress={refreshData}
          style={styles.fab}
          loading={isRefreshing}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

MessMenu.title = "MessMenu";

export default MessMenu;

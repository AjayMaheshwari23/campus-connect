import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import CardComponent from "../molecules/CardComponent";
import { SafeAreaView, ScrollView, StyleSheet,View } from "react-native";
import { Button } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { FAB, ActivityIndicator } from "react-native-paper";
import client from '../../hasura/credentials'

const GET_COURSE_ENROLLMENTS = gql`
  query GetCourseEnrollments {
    course_enrollments {
      professor {
        name
      }
      course {
        course_id
        description
      }
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

const Courses = () => {
  const [cards, setCards] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isdatarecieved, setisdatarecieved] = useState(true);

  const fetchData = async (fetchPolicy: any) => {
    try {
      const { data } = await client.query({
        query: GET_COURSE_ENROLLMENTS,
        fetchPolicy,
      });

      const updatedCards = data.course_enrollments.map(
        (course_enrollment: any) => ({
          title: course_enrollment.course.course_id,
          content: course_enrollment.course.description,
          prof: course_enrollment.professor.name,
        })
      );
      setisdatarecieved(false);
      setCards(updatedCards);
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
        {cards.map((card, index) => (
          <CardComponent
            key={index}
            title={card.title}
            content={card.content}
            prof={card.prof}
            style={styles.cardMargin}
          />
        ))}
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

Courses.title = "Courses";

export default Courses;

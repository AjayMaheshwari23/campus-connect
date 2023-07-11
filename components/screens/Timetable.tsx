import React, { useState } from "react";
import { ApolloProvider, useQuery } from "@apollo/client";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { View, Text, StyleSheet } from "react-native";
import EnrollmentsTable from "./EnrollmentsTable";
import client from "../../hasura/credentials";
import { ActivityIndicator } from "react-native-paper";

const GET_COURSE_ENROLLMENTS = gql`
  query {
    course_enrollments {
      course_id
      timings
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_COURSE_ENROLLMENTS, { client });

  if (loading) return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" />
    </View>
  );;
  if (error) return <Text>Error: {error.message}</Text>;

  const enrollments = data.course_enrollments || [];

  return (
    <View>
      <EnrollmentsTable enrollments={enrollments} />
    </View>
  );
};

const TimeTable = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};


const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});


export default TimeTable;

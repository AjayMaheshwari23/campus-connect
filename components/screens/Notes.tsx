import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Snackbar,
  Card,
  Text,
  TextInput,
  Button,
  IconButton,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Notes = () => {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibledel, setVisibledel] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  const onDismissDelSnackBar = () => setVisibledel(false);

  useEffect(() => {
    // Load saved notes from async storage
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem("notes");
      if (savedNotes !== null) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  };

  const saveNote = async () => {
    try {
      if (note == "") {
        onToggleSnackBar();
        return;
      }
      const newNotes = [...notes, note];
      await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
      setNotes(newNotes);
      setNote("");
      console.log(newNotes);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const deleteNote = async (index: any, flag: any) => {
    try {
      const newNotes = [...notes];
      newNotes.splice(index, 1);

      await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
      setNotes(newNotes);
      if (flag) setVisibledel(true);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const editNote = (index: any) => {
    setNote(notes[index]);
    deleteNote(index, false);
  };

  return (
    <View style={styles.container}>
      <Card.Title title="" />
      <Card.Content>
        <TextInput
          label="Add Note"
          value={note}
          onChangeText={(text) => setNote(text)}
          mode="outlined"
          style={styles.input}
        />
        <Button mode="contained" onPress={saveNote}>
          Save Note
        </Button>

        <ScrollView style={styles.notesContainer}>
          {notes.map((item, index) => (
            <Card style={styles.card} key={index}>
              <View key={index} style={styles.noteContainer}>
                <Text style={styles.noteItem}>{item}</Text>
                <View style={styles.noteButtons}>
                  <IconButton
                    icon="pencil"
                    size={20}
                    onPress={() => editNote(index)}
                  />
                  <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => deleteNote(index, true)}
                  />
                </View>
              </View>
            </Card>
          ))}
        </ScrollView>
      </Card.Content>
      <Snackbar
        style={styles.snackcontainer}
        visible={visible}
        duration={2000}
        onDismiss={onDismissSnackBar}
        action={{
          label: "OK",
          onPress: () => {
            // ok
          },
        }}
      >
        Empty Note cannot be added
      </Snackbar>
      <Snackbar
        style={styles.snackcontainer}
        visible={visibledel}
        onDismiss={onDismissDelSnackBar}
        duration={3000}
        action={{
          label: "Ok",
          onPress: () => {
            // ok
          },
        }}
      >
        Note Deleted
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 16,
    margin: 10,
  },
  input: {
    marginBottom: 8,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  noteContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  notesContainer: {
    marginTop: 10,
    maxHeight:600
  },
  noteItem: {
    flex: 1,
    marginRight: 8,
  },
  noteButtons: {
    flexDirection: "row",
  },
  snackcontainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20, 
    marginLeft: 40,
  },
});

export default Notes;

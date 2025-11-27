import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Card, FAB, Text } from "react-native-paper";

// Sample data
const starredNotes = [
  { id: "1", title: "Starred Note 1", description: "Short description..." },
  { id: "2", title: "Starred Note 2", description: "Another description..." },
];

const userNotes = [
  { id: "1", title: "My Note 1", description: "This is my first note" },
  { id: "2", title: "My Note 2", description: "Another short description" },
  { id: "3", title: "My Note 3", description: "Lorem ipsum dolor sit" },
];

export default function Home() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    > 
      <View style={styles.userInfo}>
        <Avatar.Image
          size={60}
          source={{ uri: "https://i.pravatar.cc/150?img=12" }}
        />
        <Text variant="titleMedium" style={styles.userName}>
          John Doe
        </Text>
      </View>
 
      <Text variant="titleMedium" style={styles.sectionTitle}>
        ⭐ Starred Notes
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 16 }}
      >
        {starredNotes.map((note) => (
          <Card key={note.id} style={styles.starredCard}>
            <Card.Content>
              <Text variant="titleSmall">{note.title}</Text>
              <Text variant="bodySmall">{note.description}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
 
      <Text variant="titleMedium" style={styles.sectionTitle}>
        My Notes
      </Text>
      <FlatList
        data={userNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.userNoteCard} elevation={2}>
            <Card.Content>
              <Text variant="titleSmall">{item.title}</Text>
              <Text variant="bodySmall" numberOfLines={2} ellipsizeMode="tail">
                {item.description}
              </Text>
            </Card.Content>
          </Card>
        )}
        scrollEnabled={false}
      />

      <FAB
        icon="plus"
        label="Add Note"
        style={{ position: "fixed", marginLeft: "auto", right: 16, bottom: 0 }}
        onPress={() => console.log("Add Note")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 32,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 12,
  },
  userName: {
    fontWeight: "600",
  },
  sectionTitle: {
    marginBottom: 12,
  },
  starredCard: {
    width: 180,
    marginRight: 12,
  },
  userNoteCard: {
    marginBottom: 12,
  },
});

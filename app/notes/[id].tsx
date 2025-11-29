import { ThemedView } from '@/components/themed-view';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';

const mockNotes = [
  { id: '1', title: 'Meeting Notes', content: 'Discussed project updates, timelines, and assigned tasks to team members. Next steps include prototyping the UI.', createdAt: '2025-11-28' },
  { id: '2', title: 'Grocery List', content: 'Milk, eggs, bread, cheese, apples, bananas. Don\'t forget the coffee!', createdAt: '2025-11-27' },
  { id: '3', title: 'Ideas for App', content: 'UI improvements: Add dark mode toggle. New features: Voice-to-text notes, search functionality, and export to PDF.', createdAt: '2025-11-26' },
];

export default function NoteScreen() {
  const { noteId } = useLocalSearchParams<{ noteId: string }>();
  const note = mockNotes.find((n) => n.id === noteId);

  if (!note) {
    return (
      <ThemedView  style={styles.container}>
        <Text variant="bodyLarge" style={styles.errorText}>
          Note not found.
        </Text>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>{note.title}</Text>
          <Text variant="bodySmall" style={styles.date}>
            {note.createdAt}
          </Text>
          <Text variant="bodyLarge" style={styles.content}>
            {note.content}
          </Text>
        </Card.Content>
        <Card.Actions>
          <IconButton
            icon="pencil"
            onPress={() => {
              // TODO: Open edit mode or navigate to edit screen
              console.log('Edit note');
            }}
          />
          <IconButton
            icon="delete"
            onPress={() => {
              // TODO: Delete note and navigate back
              router.back();
            }}
          />
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
    elevation: 2,
  },
  title: {
    marginBottom: 4,
  },
  date: {
    opacity: 0.6,
    marginBottom: 12,
  },
  content: {
    lineHeight: 24,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 50,
    opacity: 0.7,
  },
});
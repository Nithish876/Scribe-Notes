import { ThemedView } from '@/components/themed-view';
import { useGetNoteById } from '@/hooks/useApi';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';

export default function NoteScreen() {
  const { id } = useLocalSearchParams<{id:string}>(); 
  console.log(id);
  const {data,isError,isLoading} = useGetNoteById(Number(id));
  console.log("NOe data ; ",data);
  if (!data && !isLoading && !isError) {
    return (
      <ThemedView  style={styles.container}>
        <Text variant="bodyLarge" style={styles.errorText}>
          Note not found.
        </Text>
      </ThemedView>
    );
  }

  if(isLoading){
    return<Text>Loadin...</Text>
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>{data?.title}</Text>
          <Text variant="bodySmall" style={styles.date}>
            {data?.createdAt}
          </Text>
          <Text variant="bodyLarge" style={styles.content}>
            {data?.content}
          </Text>
        </Card.Content>
        <Card.Actions>
          <IconButton
            icon="pencil"
            onPress={() => { 
              console.log('Edit note');
            }}
          />
          <IconButton
            icon="delete"
            onPress={() => { 
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
    paddingTop:28

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
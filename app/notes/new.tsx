import { CreateNoteDto } from '@/api/types/dtos';
import { ThemedView } from '@/components/themed-view';
import { useCreateNote } from '@/hooks/useApi'; // We will define this new hook
import { Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

export default function CreateNoteScreen() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { mutate: createNote, isPending } = useCreateNote();
    const theme = useTheme();

    // Handler for saving the note
    const handleSave = () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('Missing Information', 'Please enter both a title and content for your note.');
            return;
        }

        const newNoteData:CreateNoteDto = {
            Title: title.trim(),
            Content: content.trim(),
        };

         
        createNote(newNoteData, {
            onSuccess: () => {
                // Navigate back to the home screen after successful creation
                Alert.alert('Success', 'Note created successfully!');
                router.back();
                router.replace('/(tabs)') 
            },
            onError: (error:any) => {
                console.error('Failed to create note:', error);
                Alert.alert('Error', 'Failed to create note. Please try again.');
            },
        });
    };

    return (
        <ThemedView style={styles.container}>
            {/* Custom Header Configuration for this screen */}
            <Stack.Screen 
                options={{ 
                    title: 'Create New Note',
                    headerTitleStyle: { color: theme.colors.primary },
                    // headerBackTitleVisible: false,
                }}
            />

            <Text variant="titleLarge" style={styles.title}>
                What's on your mind?
            </Text>

            {/* Title Input */}
            <TextInput
                label="Note Title"
                value={title}
                onChangeText={setTitle}
                mode="outlined"
                style={styles.inputTitle}
                activeOutlineColor={theme.colors.primary}
                placeholderTextColor={theme.colors.onSurfaceDisabled}
            />

            {/* Content Input */}
            <TextInput
                label="Note Content"
                value={content}
                onChangeText={setContent}
                mode="outlined"
                multiline={true} // Allows multiple lines of text
                numberOfLines={10}
                style={styles.inputContent}
                activeOutlineColor={theme.colors.primary}
                placeholderTextColor={theme.colors.onSurfaceDisabled}
                textAlignVertical="top" // Ensure text starts at the top for multiline
            />

            {/* Save Button */}
            <Button
                mode="contained"
                onPress={handleSave}
                loading={isPending}
                disabled={isPending}
                icon="content-save"
                style={styles.saveButton}
                labelStyle={styles.saveButtonLabel}
            >
                {isPending ? 'Saving...' : 'Save Note'}
            </Button>
        </ThemedView>
    );
}

// --- Stylesheet ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#4A90E2', // Consistent accent color
    },
    inputTitle: {
        marginBottom: 15,
        fontSize: 18,
    },
    inputContent: {
        flex: 1, // Takes up remaining space
        marginBottom: 20,
        fontSize: 16,
    },
    saveButton: {
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: '#4A90E2', // Consistent accent color
        elevation: 4, // Subtle shadow
    },
    saveButtonLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
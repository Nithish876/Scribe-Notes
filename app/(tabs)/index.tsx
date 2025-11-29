import { ThemedView } from '@/components/themed-view';
import { useGetNotes } from '@/hooks/useApi';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Card, FAB, Searchbar, Text, useTheme } from 'react-native-paper';

// --- Note Data Type Definition ---
type NoteItem = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
};

export default function HomeScreen() {
    // Hooks and State
    const { data, isLoading, isError, error } = useGetNotes();
    const [searchQuery, setSearchQuery] = useState('');
    const theme = useTheme(); // Access the current theme (for colors)

    // --- Data Filtering Logic ---
    const filteredNotes = data?.filter((note:any) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    // --- Render States ---

    if (isLoading) {
        return (
            <ThemedView style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
                <Text style={{ marginTop: 10 }}>Loading Notes...</Text>
            </ThemedView>
        );
    }

    if (isError) {
        return (
            <ThemedView style={styles.errorContainer}>
                <Text style={styles.errorTitle}>🚨 Error Fetching Notes</Text>
                <Text style={styles.errorMessage}>{error.message}</Text>
                {/* Optional: Add a retry button here */}
            </ThemedView>
        );
    }

    if (filteredNotes.length === 0 && !searchQuery) {
        return (
            <ThemedView style={styles.emptyContainer}>
                <Text variant="headlineSmall" style={styles.emptyIcon}>📝</Text>
                <Text variant="titleMedium" style={styles.emptyText}>
                    You haven't created any notes yet.
                </Text>
                <Text variant="bodyMedium" style={{ marginTop: 5, opacity: 0.6 }}>
                    Tap the floating button to start scribbling!
                </Text>
                <FAB
                    icon="plus"
                    style={styles.fab}
                    onPress={() => { router.replace("notes/new")}}
                />
            </ThemedView>
        );
    }

    // --- Note Card Component ---
    const renderNoteItem = ({ item }: { item: NoteItem }) => (
        <View style={styles.cardWrapper}>
            <Link href={`notes/${item.id}`} asChild>
                <Card 
                    // Use theme colors for a premium look
                    style={{ backgroundColor: theme.colors.elevation.level2 }} 
                    onPress={() => {}} 
                >
                    <Card.Content>
                        <View style={styles.cardHeader}>
                            <Text variant="titleLarge" style={styles.cardTitle}>
                                {item.title}
                            </Text>
                            <Text variant="labelSmall" style={styles.cardDate}>
                                {new Date(item.createdAt).toLocaleDateString()}
                            </Text>
                        </View>
                        <Text 
                            variant="bodyMedium" 
                            numberOfLines={3} 
                            style={styles.cardContent}
                        >
                            {item.content}
                        </Text>
                    </Card.Content>
                </Card>
            </Link>
        </View>
    );

    // --- Main Screen Render ---
    return (
        <ThemedView style={styles.container}>
            
            {/* Header and Search */}
            <View style={styles.header}>
                <Text variant="headlineLarge" style={styles.mainTitle}>Scribe Notes</Text>
                <Searchbar
                    placeholder="Search titles or content..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchBar}
                    // Apply theme color for modern look
                    theme={{ colors: { primary: theme.colors.primary } }}
                />
                
                {/* Displaying search results count */}
                <Text variant="bodySmall" style={styles.resultsCount}>
                    {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'} found
                </Text>
            </View>

            {/* List of Notes */}
            <FlatList
                data={filteredNotes}
                renderItem={renderNoteItem}
                keyExtractor={(item) => JSON.stringify(item.id)}
                style={styles.list}
                contentContainerStyle={styles.listContent}
            />

            {/* Floating Action Button */}
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => { router.replace("notes/new")}}
            />
        </ThemedView>
    );
}

// --- Stylesheet for Premium Design ---
const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 40, // Increased padding for a spacious feel
        paddingBottom: 15,
        backgroundColor: 'transparent', // Let ThemedView handle background
    },
    mainTitle: {
        fontWeight: 'bold',
        marginBottom: 15,
        // Using a custom primary color/text color for the title
        color: '#4A90E2', // Example premium blue color
    },
    searchBar: {
        borderRadius: 12,
        marginBottom: 10,
        elevation: 2, // Subtle shadow for depth
    },
    resultsCount: {
        opacity: 0.6,
        marginLeft: 4,
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 80, // Space for the FAB
        paddingHorizontal: 20, // Horizontal padding for the list items
    },
    cardWrapper: {
        marginBottom: 12, // Space between cards
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    cardTitle: {
        fontWeight: '600', // Semi-bold for title
    },
    cardDate: {
        opacity: 0.5,
    },
    cardContent: {
        opacity: 0.8,
    },
    fab: {
        position: 'absolute',
        margin: 20, // Increased margin
        right: 0,
        bottom: 0,
        backgroundColor: '#4A90E2', // Match FAB to premium accent color
    },
    // --- State-Specific Styles ---
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyIcon: {
        marginBottom: 15,
    },
    emptyText: {
        textAlign: 'center',
        fontWeight: '500',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FBE8E8', // Light red background for error
    },
    errorTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#D8000C', // Dark red text
        marginBottom: 10,
    },
    errorMessage: {
        textAlign: 'center',
        color: '#D8000C',
    }
});
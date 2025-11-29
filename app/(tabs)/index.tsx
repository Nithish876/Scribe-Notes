import { ThemedView } from '@/components/themed-view';
import { useGetNotes } from '@/hooks/useApi';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Card, FAB, Searchbar, Text, useTheme } from 'react-native-paper';

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
    const theme = useTheme(); 
 
    const filteredNotes = data?.filter((note:any) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
 
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
                    onPress={() => { router.replace("/(tabs)/notes/new")}}
                />
            </ThemedView>
        );
    }
 
    const renderNoteItem = ({ item }: { item: NoteItem }) => (
        <View style={styles.cardWrapper}>
            <Link href={`/(tabs)/notes/${item.id}`} asChild>
                <Card  
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
 
    return (
        <ThemedView style={styles.container}>
 
            <View style={styles.header}>
                <Text variant="headlineLarge" style={styles.mainTitle}>Scribe Notes</Text>
                <Searchbar
                    placeholder="Search titles or content..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchBar} 
                    theme={{ colors: { primary: theme.colors.primary } }}
                />
                 
                <Text variant="bodySmall" style={styles.resultsCount}>
                    {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'} found
                </Text>
            </View>
 
            <FlatList
                data={filteredNotes}
                renderItem={renderNoteItem}
                keyExtractor={(item) => JSON.stringify(item.id)}
                style={styles.list}
                contentContainerStyle={styles.listContent}
            />
 
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => { router.replace("/(tabs)/notes/new")}}
            />
        </ThemedView>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 40,  
        paddingBottom: 15,
        backgroundColor: 'transparent', 
    },
    mainTitle: {
        fontWeight: 'bold',
        marginBottom: 15,
       
        color: '#4A90E2', 
    },
    searchBar: {
        borderRadius: 12,
        marginBottom: 10,
        elevation: 2, 
    },
    resultsCount: {
        opacity: 0.6,
        marginLeft: 4,
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 80, 
        paddingHorizontal: 20,
    },
    cardWrapper: {
        marginBottom: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    cardTitle: {
        fontWeight: '600', 
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
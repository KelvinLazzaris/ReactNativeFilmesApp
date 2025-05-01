import React, { useEffect, useState } from 'react'
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native'
import { searchMovies, MovieSummary } from '../services/omdb'
import MovieCard from '../components/MovieCard'
import { useRouter } from 'expo-router'

export default function Home() {
  const router = useRouter()
  const [query, setQuery] = useState('My Name Is Kelvin...')
  const [movies, setMovies] = useState<(MovieSummary | undefined)[]>([])
  const [loading, setLoading] = useState(false)

  const loadMovies = async () => {
    setLoading(true)
    try {
      const results = await searchMovies(query)
      setMovies(results.filter(Boolean))
    } catch {
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMovies()
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push('/favorites')}
        style={styles.favNavButton}
      >
        <Text style={styles.favNavText}>Favoritos</Text>
      </TouchableOpacity>
      <TextInput
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={loadMovies}
        placeholder="Search movies..."
        style={styles.input}
      />
      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item?.imdbID ?? Math.random().toString()}
          renderItem={({ item }) => item && <MovieCard movie={item} />}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>No movies found.</Text>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8, backgroundColor: '#c9ffc2' },
  favNavButton: {
    alignSelf: 'flex-end',
    padding: 8,
    backgroundColor: '#ff0000',
    borderRadius: 4,
    marginBottom: 8,
  },
  favNavText: { color: '#fff', fontWeight: '900' },
  input: {
    height: 40,
    borderColor: '#ff0000',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  loader: { flex: 1, justifyContent: 'center' },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#666' },
})
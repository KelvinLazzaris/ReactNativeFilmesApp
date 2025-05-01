import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import { getFavorites } from '../utils/favorites'
import { getMovieDetails, MovieDetail } from '../services/omdb'
import MovieCard from '../components/MovieCard'

export default function FavoritesScreen() {
  const [movies, setMovies] = useState<MovieDetail[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getFavorites()
      .then(ids => Promise.all(ids.map(id => getMovieDetails(id))))
      .then(setMovies)
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />
  }

  if (movies.length === 0) {
    return (
      <View style={styles.empty}>
        <Text>No favorites yet.</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={movies}
      keyExtractor={item => item.imdbID}
      renderItem={({ item }) => <MovieCard movie={item} />}
      contentContainerStyle={styles.list}
    />
  )
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 8 },
})
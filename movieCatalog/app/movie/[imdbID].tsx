import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { getMovieDetails, MovieDetail } from '../../services/omdb'
import { useFavorite } from '../../utils/useFavorite'
import { Ionicons } from '@expo/vector-icons'

type ParamList = { params: { imdbID: string } }

export default function MovieDetailScreen() {
  const { params } = useRoute<RouteProp<ParamList>>()
  const [movie, setMovie] = useState<MovieDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const { isFavorite, toggle } = useFavorite(params.imdbID)

  useEffect(() => {
    setLoading(true)
    getMovieDetails(params.imdbID)
      .then(setMovie)
      .finally(() => setLoading(false))
  }, [params.imdbID])

  if (loading || !movie) {
    return <ActivityIndicator size="large" style={styles.loader} />
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: movie.Poster }} style={styles.poster} />
      <View style={styles.header}>
        <Text style={styles.title}>
          {movie.Title} ({movie.Year})
        </Text>
        <TouchableOpacity onPress={toggle} style={styles.favButton}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={28}
            color="red"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Gênero:</Text>
      <Text style={styles.text}>{movie.Genre}</Text>
      <Text style={styles.label}>Diretor:</Text>
      <Text style={styles.text}>{movie.Director}</Text>
      <Text style={styles.label}>Atores:</Text>
      <Text style={styles.text}>{movie.Actors}</Text>
      <Text style={styles.label}>Sinópse:</Text>
      <Text style={styles.text}>{movie.Plot}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  loader: { flex: 1, justifyContent: 'center' },
  poster: { width: '100%', height: 400, borderRadius: 8, marginBottom: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  favButton: { padding: 8 },
  label: { fontSize: 16, fontWeight: '600', marginTop: 12 },
  text: { fontSize: 14, marginTop: 4, lineHeight: 20 },
})
import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { MovieSummary } from '../services/omdb'
import { useFavorite } from '../utils/useFavorite'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

interface Props {
  movie?: MovieSummary
}

export default function MovieCard({ movie }: Props) {
  if (!movie) return null

  const router = useRouter()
  const { isFavorite, toggle } = useFavorite(movie.imdbID)

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/movie/${movie.imdbID}`)}
    >
      <Image source={{ uri: movie.Poster }} style={styles.poster} />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          {movie.Title}
        </Text>
        <Text style={styles.year}>{movie.Year}</Text>
      </View>
      <TouchableOpacity onPress={toggle} style={styles.favButton}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          color="red"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    backgroundColor: '#028090',
  },
  poster: { width: 80, height: 120 },
  info: { flex: 1, padding: 8, justifyContent: 'center' },
  title: { fontSize: 16, color: '#ffffff', fontWeight: 'bold' },
  year: { fontSize: 30, color: '#E3E885', marginTop: 4 },
  favButton: { padding: 8 },
});

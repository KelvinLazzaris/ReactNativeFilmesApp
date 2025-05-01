import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Catálogo de Filmes disponíveis no momento' }}
      />
      <Stack.Screen
        name="movie/[imdbID]"
        options={{ title: 'Detalhes deste Filme' }}
      />
      <Stack.Screen
        name="favorites"
        options={{ title: 'Meus Filmes Favoritos no momento ' }}
      />
    </Stack>
  )
}
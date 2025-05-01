import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY = 'FAVORITE_MOVIES'

export const getFavorites = async (): Promise<string[]> => {
  const json = await AsyncStorage.getItem(KEY)
  return json ? JSON.parse(json) : []
}

export const toggleFavorite = async (id: string): Promise<void> => {
  const favs = new Set(await getFavorites())
  favs.has(id) ? favs.delete(id) : favs.add(id)
  await AsyncStorage.setItem(KEY, JSON.stringify(Array.from(favs)))
}

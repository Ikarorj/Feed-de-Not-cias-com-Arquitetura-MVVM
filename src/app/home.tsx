import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNewsViewModel } from "../viewmodel/useNewsViewModel";
import { Article } from "../model/entities/Article";
import { router } from "expo-router";

export default function Home() {
  const { news, searchQuery, loading, error, setSearchQuery, fetchNews } =
    useNewsViewModel();

  useEffect(() => {
    fetchNews(); // carrega notícias iniciais
  }, []);

  function openArticle(item: Article) {
    router.push({
      pathname: "/article/[article]",
      params: { article: JSON.stringify(item) },
    });
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Buscar..."
        style={styles.search}
        onSubmitEditing={fetchNews}
      />

      {loading && <ActivityIndicator size="large" color="#000" />}

      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={news}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => openArticle(item)}>
            {item.urlToImage ? (
              <Image source={{ uri: item.urlToImage }} style={styles.image} />
            ) : (
              <View style={styles.placeholder} />
            )}

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.description || "Sem descrição disponível."}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    marginBottom: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  placeholder: {
    width: 80,
    height: 80,
    backgroundColor: "#ccc",
    borderRadius: 8,
    marginRight: 10,
  },
  title: { fontWeight: "bold", fontSize: 16, marginBottom: 4 },
  description: { color: "#555" },
  error: { color: "red", marginTop: 12 },
});

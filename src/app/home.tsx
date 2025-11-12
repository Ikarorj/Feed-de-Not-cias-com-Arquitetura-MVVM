import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator, RefreshControl, } from "react-native";
import { useNewsViewModel } from "../viewmodel/useNewsViewModel";
import { router } from "expo-router";

export default function Home() {
  const {
    news,
    searchQuery,
    loading,
    error,
    setSearchQuery,
    fetchNews,
  } = useNewsViewModel();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  // 🔄 Função para atualizar ao arrastar
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNews();
    setRefreshing(false);
  };

  // 🔗 Abre a tela de detalhes da notícia
  function openArticle(item: any) {
    router.push({
      pathname: "/article/[article]",
      params: { article: JSON.stringify(item) },
    });
  }

  // 📰 Estado vazio — nenhuma notícia
  const renderEmptyState = () => (
    <View style={styles.empty}>
      <Text style={styles.emptyTitle}>Nenhuma notícia encontrada</Text>
      {searchQuery ? (
        <Text style={styles.emptySubtitle}>
          Nenhum resultado para "{searchQuery}".
          Tente outro termo ou atualize a página.
        </Text>
      ) : (
        <Text style={styles.emptySubtitle}>
          Não há notícias disponíveis no momento.
        </Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Buscar notícias..."
        style={styles.search}
        onSubmitEditing={fetchNews}
        returnKeyType="search"
      />

      {loading && !refreshing && <ActivityIndicator size="large" color="#000" />}

      {error && <Text style={styles.error}>Erro: {error}</Text>}

      {!loading && !error && news.length === 0
        ? renderEmptyState()
        : (
          <FlatList
            data={news}
            keyExtractor={(item) => item.url}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => openArticle(item)}
              >
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
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
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
    backgroundColor: "#fafafa",
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
  error: { color: "red", marginTop: 10, textAlign: "center" },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtitle: {
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 30,
  },
});

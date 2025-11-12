import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, ScrollView, StyleSheet, Button } from "react-native";

export default function ArticleDetail() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const article = JSON.parse(params.article as string);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {article.urlToImage && (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      )}

      <Text style={styles.title}>{article.title}</Text>

      <Text style={styles.meta}>
        {article.source?.name} — {article.publishedAt?.slice(0, 10)}
      </Text>

      <Text style={styles.content}>
        {article.content || "Sem conteúdo disponível."}
      </Text>

      <Button title="Voltar" onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  meta: { color: "#555", marginBottom: 12 },
  content: { fontSize: 16, lineHeight: 22 },
});

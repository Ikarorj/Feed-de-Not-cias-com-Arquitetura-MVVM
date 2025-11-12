import { useState } from "react";
import NewsService from "../model/services/NewsService";
import { Article } from "../model/entities/Article";

export function useNewsViewModel() {
  const [news, setNews] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState("business");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const service = new NewsService();

  async function fetchNews() {
    try {
      setLoading(true);
      setError(null);
      const result = await service.fetchNews(searchQuery);

      console.log("📰 Notícias recebidas:", result.length, "itens");
      setNews(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { news, searchQuery, loading, error, setSearchQuery, fetchNews };
}

import { Article } from "../entities/Article";
import Constants from "expo-constants";

export default class NewsService {
  private apiKey: string;
  private baseUrl = "https://newsapi.org/v2/everything";

  constructor() {
    this.apiKey = Constants.expoConfig?.extra?.NEWS_API_KEY ?? "";
  }

  async fetchNews(query: string = "react native"): Promise<Article[]> {
    const url = `${this.baseUrl}?q=${encodeURIComponent(
      query
    )}&language=pt&apiKey=${this.apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erro ao carregar notícias");
    }

    const data = await response.json();
    return data.articles as Article[];
  }
}

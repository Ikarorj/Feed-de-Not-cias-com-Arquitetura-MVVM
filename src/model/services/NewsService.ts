import { Article } from "../entities/Article";
import Constants from "expo-constants";

export default class NewsService {
  private apiKey: string;
  private baseUrl = "https://newsapi.org/v2/top-headlines";

  constructor() {
    this.apiKey = Constants.expoConfig?.extra?.NEWS_API_KEY ?? "434eadc323bb4afab1cd061737d62897";
  }

  async fetchNews(query: string = "business"): Promise<Article[]> {
    const url = `${this.baseUrl}?country=us&category=${encodeURIComponent(query)}&apiKey=${this.apiKey}`;

    console.log("🔗 URL chamada:", url); // Debug opcional

    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json();
      console.log("❌ Erro no response:", error);
      throw new Error("Erro ao carregar notícias: " + error.message);
    }

    const data = await response.json();
    return data.articles as Article[];
  }
}

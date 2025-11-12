export type ArticleSource = {
  id: string | null;
  name: string;
};

export type Article = {
  source: ArticleSource;
  author?: string | null;
  title: string;
  description?: string | null;
  url: string;
  urlToImage?: string | null;
  publishedAt?: string | null;
  content?: string | null;
};

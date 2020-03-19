import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { lightGreen } from "../../utils/colors";
import { NEWS_API_URL } from "../../utils/config";
import NewsCard from "../NewsCard";
import { getFormattedDate } from "../../utils/helper";

const QUERY = "COVID-19";

export interface Article {
  source: string;
  title: string;
  description: string;
  url: string;
  imgUrl?: string;
  publishedAt: string;
}

interface Props {
  onViewItem(postUrl: string): void;
}

function NewsContainer({ onViewItem }: Props) {
  const [news, setNews] = useState<Article[]>([]);
  const [isFetchingNews, setIsFetchingNews] = useState<boolean>(false);

  const fetchNews = async () => {
    try {
      setIsFetchingNews(true);
      const res = await fetch(
        `${NEWS_API_URL}&q=${QUERY}&from=${getFormattedDate()}&language=en&pageSize=30`
      );
      const data = await res.json();
      setIsFetchingNews(false);
      if (data == null) return;
      const { articles } = data;
      setNews(
        articles.map(
          ({ title, description, url, urlToImage, publishedAt }) => ({
            title,
            description,
            url,
            imgUrl: urlToImage,
            publishedAt
          })
        )
      );
    } catch (err) {
      setIsFetchingNews(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const errorMarkup = (
    <View style={styles.container}>
      <Text style={styles.emptyTextStyle}>Unable to fetch news articles</Text>
      <Text style={styles.emptyTextStyle}>Pull to Refresh</Text>
    </View>
  );

  return isFetchingNews ? (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={lightGreen} />
    </View>
  ) : (
    <View style={{ marginBottom: 300, flexGrow: 1 }}>
      <FlatList
        data={news}
        refreshing={isFetchingNews}
        onRefresh={fetchNews}
        renderItem={({ item }) => (
          <NewsCard
            source={item.source}
            description={item.description}
            publishedAt={item.publishedAt}
            title={item.title}
            imgUrl={item.imgUrl}
            url={item.url}
            onPress={onViewItem}
          />
        )}
        keyExtractor={item => item.title}
      />
    </View>
  );
}

export const MemoizedNewsContainer = React.memo(NewsContainer);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16
  },
  emptyTextStyle: { textAlign: "center", color: "#95a5a6" }
});

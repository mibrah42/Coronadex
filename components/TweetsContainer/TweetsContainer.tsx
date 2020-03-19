import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { lightGreen } from "../../utils/colors";
import { TWITTER_API_URL } from "../../utils/config";
import TweetCard from "../TweetCard";

const QUERY = "COVID-19";
const COUNT = 30;

export interface Tweet {
  id: string;
  text: string;
  createdAt: string;
  userName?: string;
  screenName: string;
  userImage: string;
  postUrl?: string;
}

interface Props {
  onViewItem(postUrl: string): void;
}

function TweetsContainer({ onViewItem }: Props) {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isFetchingTweets, setIsFetchingTweets] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const fetchTweets = async () => {
    try {
      setIsFetchingTweets(true);
      const res = await fetch(
        `${TWITTER_API_URL}?query=${QUERY}&lang=en&count=${COUNT}`
      );
      const data = await res.json();
      setIsFetchingTweets(false);
      if (data == null) return;
      setTweets(data);
    } catch (err) {
      setIsFetchingTweets(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const handleLoadMore = async () => {
    if (tweets.length === 0) return;
    console.log({ tweets });
    console.log({ id: tweets[tweets.length - 1]["id"] });
    try {
      setIsLoadingMore(true);
      const res = await fetch(
        `${TWITTER_API_URL}?query=${QUERY}&lang=en&count=${COUNT}&since_id=${
          tweets[tweets.length - 1]["id"]
        }`
      );
      const data = await res.json();
      setIsLoadingMore(false);
      if (data == null) return;
      setTweets([...tweets, ...data]);
    } catch (err) {
      setIsLoadingMore(false);
      console.log(err);
    }
  };

  const footerMarkup = () => (
    <View style={styles.footer}>
      <Button
        theme={{ colors: { primary: lightGreen } }}
        onPress={handleLoadMore}
        loading={isLoadingMore}
      >
        LOAD MORE
      </Button>
    </View>
  );

  const errorMarkup = (
    <View style={styles.container}>
      <Text style={styles.emptyTextStyle}>Unable to fetch tweets</Text>
      <Text style={styles.emptyTextStyle}>Pull to Refresh</Text>
    </View>
  );

  return isFetchingTweets ? (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={lightGreen} />
    </View>
  ) : (
    <View style={{ marginBottom: 300, flexGrow: 1 }}>
      <FlatList
        data={tweets}
        refreshing={isFetchingTweets}
        onRefresh={fetchTweets}
        renderItem={({ item }) => (
          <TweetCard
            id={item.id}
            text={item.text}
            createdAt={item.createdAt}
            userName={item.userName}
            screenName={item.screenName}
            userImage={item.userImage}
            postUrl={item.postUrl}
            onPress={onViewItem}
          />
        )}
        ListFooterComponent={footerMarkup}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

export const MemoizedTweetsContainer = React.memo(TweetsContainer);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 16
  },
  emptyTextStyle: { textAlign: "center", color: "#95a5a6" }
});

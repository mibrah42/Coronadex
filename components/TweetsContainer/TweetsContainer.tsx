import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { lightGreen } from "../../utils/colors";
import { TWITTER_API_URL } from "../../utils/config";
import TweetCard from "../TweetCard";

const QUERY = "COVID-19";
const COUNT = 100;

export interface Tweet {
  text: string;
  createdAt: string;
  userName?: string;
  screenName: string;
  userImage: string;
  postUrl?: string;
}

interface Props {
  onViewTweet(postUrl: string): void;
}

function TweetsContainer({ onViewTweet }: Props) {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isFetchingTweets, setIsFetchingTweets] = useState<boolean>(false);

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

  return isFetchingTweets ? (
    <View style={styles.indicatorView}>
      <ActivityIndicator animating={true} color={lightGreen} />
    </View>
  ) : (
    <View style={{ marginBottom: 300, flexGrow: 1 }}>
      <FlatList
        data={tweets}
        renderItem={({ item }) => (
          <TweetCard
            text={item.text}
            createdAt={item.createdAt}
            userName={item.userName}
            screenName={item.screenName}
            userImage={item.userImage}
            postUrl={item.postUrl}
            onPress={onViewTweet}
          />
        )}
        keyExtractor={item => item.text + item.screenName}
      />
    </View>
  );
}

export const MemoizedTweetsContainer = React.memo(TweetsContainer);

const styles = StyleSheet.create({
  indicatorView: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16
  }
});

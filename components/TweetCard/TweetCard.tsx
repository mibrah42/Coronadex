import React from "react";
import { Card, Text } from "react-native-paper";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { lightGreen, darkBlueLight } from "../../utils/colors";
import { Tweet } from "../TweetsContainer/TweetsContainer";

interface TweetCardProps extends Tweet {
  onPress: (url: string) => void;
}

const TweetCard = ({
  text,
  createdAt,
  screenName,
  userImage,
  postUrl,
  onPress
}: TweetCardProps) => (
  <Card style={styles.container}>
    <View style={styles.header}>
      <Image style={styles.userImage} source={{ uri: userImage }} />
      <View>
        <Text style={styles.screenName}>{screenName}</Text>
        <Text style={styles.createdAt}>
          {new Date(createdAt).toDateString()}
        </Text>
      </View>
    </View>
    <Text style={styles.textStyle}>{text}</Text>
    {postUrl == null ? null : (
      <TouchableOpacity onPress={() => onPress(postUrl)}>
        <Text style={styles.viewTweetButton}>VIEW TWEET</Text>
      </TouchableOpacity>
    )}
  </Card>
);

export const MemoizedTweetCard = React.memo(TweetCard);

const styles = StyleSheet.create({
  viewTweetButton: {
    fontSize: 12,
    color: lightGreen,
    fontWeight: "bold",
    marginTop: 8
  },
  container: {
    backgroundColor: darkBlueLight,
    padding: 16,
    alignItems: "flex-start",
    marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: "center"
  },
  textStyle: {
    color: "white",
    fontSize: 14,
    marginBottom: 8,
    textAlignVertical: "center"
  },
  header: {
    flexDirection: "row",
    marginBottom: 16
  },
  userImage: { width: 30, height: 30, borderRadius: 15, marginRight: 8 },
  screenName: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4
  },
  createdAt: {
    color: "white",
    fontSize: 11
  }
});

import React from "react";
import { Card, Text } from "react-native-paper";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { lightGreen, darkBlueLight } from "../../utils/colors";
import { Article } from "../NewsContainer/NewsContainer";

interface NewsCardProps extends Article {
  onPress: (url: string) => void;
}

const NewsCard = ({
  title,
  description,
  imgUrl,
  url,
  publishedAt,
  onPress
}: NewsCardProps) => (
  <Card style={styles.container}>
    {imgUrl == null || imgUrl == "" ? null : (
      <View style={styles.articleView}>
        <Image style={styles.articleImage} source={{ uri: imgUrl }} />
      </View>
    )}
    <View style={styles.content}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.createdAt}>
          {new Date(publishedAt).toDateString()}
        </Text>
        <Text style={styles.textStyle}>{description}</Text>
      </View>
    </View>

    {url == null ? null : (
      <TouchableOpacity onPress={() => onPress(url)}>
        <Text style={styles.viewTweetButton}>READ ARTICLE</Text>
      </TouchableOpacity>
    )}
  </Card>
);

export const MemoizedNewsCard = React.memo(NewsCard);

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
    alignItems: "center",
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
  content: {
    flexDirection: "row",
    marginBottom: 8
  },
  articleView: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16
  },
  articleImage: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 8
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4
  },
  createdAt: {
    color: "white",
    fontSize: 11,
    marginBottom: 8
  }
});

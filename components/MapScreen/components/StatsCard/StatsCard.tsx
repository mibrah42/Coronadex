import React from "react";
import { StyleSheet, Text } from "react-native";
import { Card } from "react-native-paper";
import { numberWithCommas } from "../../../../utils/helper";

interface Props {
  title: string;
  value: number;
  color: string;
}

function StatsCard({ title, value, color }: Props) {
  const modifiedValue = numberWithCommas(value);
  return (
    <Card elevation={3} style={{ ...styles.container, backgroundColor: color }}>
      <Text style={styles.titleStyle}>{title}</Text>
      <Text style={styles.valueStyle}>{modifiedValue}</Text>
    </Card>
  );
}

export const MemoizedStatsCard = React.memo(StatsCard);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
    margin: 8
  },
  titleStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 8,
    textAlign: "center"
  },
  valueStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center"
  }
});

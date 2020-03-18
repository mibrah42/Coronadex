import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card } from "react-native-paper";
import {
  darkBlueLight,
  lightGreen,
  lightYellow,
  lightRed
} from "../../../../utils/colors";
import { numberWithCommas } from "../../../../utils/helper";

export interface CountryData {
  id: string;
  countryRegion: string;
  provinceState: string | null;
  lastUpdate: number;
  lat: number;
  long: number;
  confirmed: number;
  recovered: number;
  deaths: number;
}

function CountryListItem({
  countryRegion,
  provinceState,
  lastUpdate,
  confirmed,
  recovered,
  deaths
}: CountryData) {
  const date = new Date(lastUpdate);
  return (
    <Card elevation={3} style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%"
        }}
      >
        <Text style={styles.titleStyle}>
          {provinceState != null && countryRegion !== provinceState
            ? `${provinceState}, `
            : null}
          {countryRegion}
        </Text>
        <Text style={styles.valueStyle}>{date.toDateString()}</Text>
      </View>
      <View style={styles.statsContainer}>
        <Text style={{ ...styles.statsValue, color: lightGreen }}>
          {numberWithCommas(recovered)}
        </Text>
        <Text style={{ ...styles.statsValue, color: lightYellow }}>
          {numberWithCommas(confirmed)}
        </Text>
        <Text style={{ ...styles.statsValue, color: lightRed }}>
          {numberWithCommas(deaths)}
        </Text>
      </View>
    </Card>
  );
}

export const MemoizedCountryListItem = React.memo(CountryListItem);

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkBlueLight,
    padding: 16,
    alignItems: "flex-start",
    marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: "center"
  },
  titleStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 8,
    textAlignVertical: "center"
  },
  valueStyle: {
    color: "white",
    fontSize: 12,
    textAlignVertical: "center"
  },
  statsContainer: { flexDirection: "row" },
  statsValue: { fontWeight: "bold", marginRight: 8 }
});

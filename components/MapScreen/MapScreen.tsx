import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  StatusBar,
  Dimensions
} from "react-native";
import { ActivityIndicator, Text, Searchbar, Appbar } from "react-native-paper";
import {
  darkBlue,
  lightGreen,
  lightYellow,
  lightRed,
  darkBlueLight
} from "../../utils/colors";
import StatsCard from "./components/StatsCard";
import CountryListItem, { CountryData } from "./components/CountryListItem";
import Drawer from "react-native-draggable-view";
import Map from "../Map";
import TweetsContainer from "../TweetsContainer";
import { DATA_API_URL } from "../../utils/config";
import TabItem from "../TabItem";

export enum StatusType {
  confirmed = "confirmed",
  recovered = "recovered",
  deaths = "deaths"
}

enum Tabs {
  countries = "COUNTRIES",
  tweets = "TWEETS"
}

interface stats {
  confirmed: number;
  recovered: number;
  deaths: number;
  lastUpdate: string;
}

export function MapScreen({ navigation }) {
  const [stats, setStats] = useState<stats | null>(null);
  const [countriesData, setCountriesData] = useState<CountryData[]>([]);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.countries);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${DATA_API_URL}`);
      const data = await res.json();
      const { confirmed, recovered, deaths, lastUpdate } = data;
      setStats({
        confirmed: confirmed.value,
        recovered: recovered.value,
        deaths: deaths.value,
        lastUpdate
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCountriesData = async (status: StatusType) => {
    try {
      const res = await fetch(`${DATA_API_URL}/${status}`);
      const data = await res.json();
      const countries = data.map(
        (
          {
            countryRegion,
            provinceState,
            lat,
            long,
            recovered,
            deaths,
            confirmed,
            lastUpdate
          },
          index
        ) => ({
          id: countryRegion + index,
          countryRegion,
          provinceState,
          lat,
          long,
          recovered,
          deaths,
          confirmed,
          lastUpdate
        })
      );
      countries.sort((a, b) => a.countryRegion > b.countryRegion);
      setCountriesData(countries);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchCountriesData(StatusType.confirmed);
  }, []);

  const filteredCountries =
    query == ""
      ? countriesData
      : countriesData.filter(({ countryRegion, provinceState }) => {
          const existsInCountries = countryRegion
            .toLowerCase()
            .includes(query.toLowerCase());
          const existsInStates =
            provinceState == null
              ? false
              : provinceState.toLowerCase().includes(query.toLowerCase());
          return existsInCountries || existsInStates;
        });

  const cardsContainer =
    stats == null ? (
      <View style={styles.indicatorView}>
        <ActivityIndicator animating={true} color={lightYellow} />
      </View>
    ) : (
      <ScrollView horizontal contentContainerStyle={styles.cardsScrollView}>
        <View style={styles.cardsContainer}>
          <StatsCard
            title="Recovered"
            value={stats.recovered}
            color={lightGreen}
          />
          <StatsCard
            title="Infected"
            value={stats.confirmed}
            color={lightYellow}
          />
          <StatsCard title="Deaths" value={stats.deaths} color={lightRed} />
        </View>
      </ScrollView>
    );

  const countriesContainer =
    countriesData == null || activeTab !== Tabs.countries ? null : (
      <View style={{ marginBottom: 300, flexGrow: 1 }}>
        <FlatList
          data={filteredCountries}
          renderItem={({ item }) => (
            <CountryListItem
              key={item.id}
              id={item.id}
              countryRegion={item.countryRegion}
              provinceState={item.provinceState}
              lastUpdate={item.lastUpdate}
              lat={item.lat}
              long={item.long}
              recovered={item.recovered}
              deaths={item.deaths}
              confirmed={item.confirmed}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );

  const handleOnViewTweet = useCallback((postUrl: string) => {
    navigation.navigate("TweetScreen", {
      url: postUrl
    });
  }, []);

  const Tweets =
    activeTab !== Tabs.tweets ? null : (
      <TweetsContainer onViewTweet={handleOnViewTweet} />
    );

  const updatedDate =
    stats == null ? null : (
      <Text style={styles.updatedDateTextStyle}>
        Last updated: {new Date(stats.lastUpdate).toDateString()}
      </Text>
    );

  return (
    <Drawer
      initialDrawerSize={0.3}
      finalDrawerHeight={150}
      autoDrawerUp={1} // 1 to auto up, 0 to auto down
      renderContainerView={() => (
        <View>
          <View style={styles.searchBarContainer}>
            <Searchbar
              placeholderTextColor="white"
              placeholder="Search for country"
              theme={{ colors: { primary: "white" } }}
              style={styles.searchbar}
              inputStyle={{ color: "white" }}
              iconColor="white"
              onChangeText={query => {
                setQuery(query);
              }}
              value={query}
            />
          </View>
          <Map countriesData={filteredCountries} />
        </View>
      )}
      renderDrawerView={() => (
        <View style={styles.countriesView}>
          <Appbar
            style={{
              backgroundColor: darkBlue,
              elevation: 0,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TabItem
              title={Tabs.countries}
              onPress={() => setActiveTab(Tabs.countries)}
              selected={activeTab === Tabs.countries}
            />
            <TabItem
              title={Tabs.tweets}
              onPress={() => setActiveTab(Tabs.tweets)}
              selected={activeTab === Tabs.tweets}
            />
          </Appbar>
          {countriesContainer}
          {Tweets}
        </View>
      )}
      renderInitDrawerView={() => (
        <View style={styles.initDrawerView}>
          <StatusBar hidden={false} />
          <View style={styles.draggableBarView}>
            <View style={styles.draggableBar}></View>
          </View>
          {cardsContainer}
          {updatedDate}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkBlue
  },
  initDrawerView: {
    backgroundColor: darkBlue
  },
  draggableBarView: {
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  draggableBar: {
    backgroundColor: darkBlueLight,
    height: 5,
    width: "30%",
    borderRadius: 2.5
  },
  cardsContainer: {
    flexDirection: "row"
  },
  searchBarContainer: {
    position: "absolute",
    zIndex: 20,
    elevation: 1,
    shadowOpacity: 0,
    top: 0,
    left: 0,
    height: 100,
    width: Dimensions.get("window").width - 32,
    alignItems: "center",
    justifyContent: "flex-end",
    marginHorizontal: 16
  },
  countriesView: {
    backgroundColor: darkBlue,
    paddingTop: 8,
    flexGrow: 1
  },
  updatedDateTextStyle: { textAlign: "center", color: "#95a5a6" },
  cardsScrollView: { flexGrow: 1, justifyContent: "center" },
  indicatorView: { alignItems: "center", justifyContent: "center" },
  searchbar: {
    backgroundColor: darkBlue,
    opacity: 0.8,
    borderRadius: 50
  }
});

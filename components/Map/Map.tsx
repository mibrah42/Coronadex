import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { View, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import {
  lightRed,
  lightGreen,
  lightYellow,
  darkBlueLight
} from "../../utils/colors";
import StatsCard from "../MapScreen/components/StatsCard";
import { CountryData } from "../MapScreen";

interface Props {
  countriesData: CountryData[];
}

function Map({ countriesData }: Props) {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
      }}
      initialRegion={{
        latitude: 0,
        longitude: 0,
        latitudeDelta: 100,
        longitudeDelta: 100
      }}
      customMapStyle={mapStyle}
    >
      {countriesData.map(
        ({
          lat,
          long,
          countryRegion,
          provinceState,
          confirmed,
          recovered,
          deaths,
          id
        }) => {
          const title =
            provinceState == null || provinceState === countryRegion
              ? countryRegion
              : `${provinceState}, ${countryRegion}`;

          return (
            <Marker
              key={id}
              coordinate={{
                latitude: lat,
                longitude: long
              }}
              title={title}
            >
              <Callout
                tooltip
                style={{
                  backgroundColor: darkBlueLight,
                  paddingTop: 8,
                  borderRadius: 4
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    paddingHorizontal: 8
                  }}
                >
                  {title}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <StatsCard
                    title="Recovered"
                    value={recovered}
                    color={lightGreen}
                  />
                  <StatsCard
                    title="Infected"
                    value={confirmed}
                    color={lightYellow}
                  />
                  <StatsCard title="Deaths" value={deaths} color={lightRed} />
                </View>
              </Callout>
            </Marker>
          );
        }
      )}
    </MapView>
  );
}

export const MemoizedMap = React.memo(Map);

const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8ec3b9"
      }
    ]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1a3646"
      }
    ]
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#64779e"
      }
    ]
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878"
      }
    ]
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#334e87"
      }
    ]
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#023e58"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#283d6a"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6f9ba5"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#023e58"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3C7680"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#304a7d"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#2c6675"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#255763"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#b0d5ce"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#023e58"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    featureType: "transit.line",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#283d6a"
      }
    ]
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#3a4762"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#0e1626"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#4e6d70"
      }
    ]
  }
];

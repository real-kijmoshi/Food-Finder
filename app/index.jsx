import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { StyleSheet, View, Text, FlatList, SafeAreaView } from "react-native";
import SearchBar from "../components/SearchBar";
import yelp from "../api/yelp";
import RestaurantCard from "../components/RestaruantCard";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  const [search, setSearch] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState(null);

  const router = useRouter();

  const searchRequest = async () => {
    try {
      if (location === null) {
        setRestaurants([]);
        return;
      }

      const response = await yelp.get("/search", {
        params: {
          term: search,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          limit: 50,
          categories: "restaurants,food",
        },
      });

      setRestaurants(response.data.businesses);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      setRestaurants([]);
    }
  };

  useEffect(() => {
    searchRequest();
  }, [search, location]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Location permission not granted");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            header: () => (
              <LinearGradient
                colors={["#FF6F61", "#FFA07A"]}
                style={{
                  paddingTop: 60,
                  height: 120,
                  justifyContent: "flex-end",
                  paddingHorizontal: 20,
                  paddingBottom: 15,
                  elevation: 4,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 24,
                    fontWeight: "bold",
                  }}
                >
                  Food Finder
                </Text>
              </LinearGradient>
            ),
            headerStyle: {
              backgroundColor: "transparent",
            },
          }}
        />

        <SearchBar setSearch={setSearch} />

        <Text>
          {location
            ? `Location: ${location.coords.latitude}, ${location.coords.longitude}`
            : "Loading location..."}
        </Text>

        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={restaurants}
          renderItem={({ item }) => (
            <RestaurantCard
              restaurant={item}
              onPress={() => router.push(`/restaurants/${item.id}`)}
              key={item.id}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  list: {
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  listContent: {
    paddingBottom: 40,
  },
});

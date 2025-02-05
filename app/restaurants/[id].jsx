import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import restaurantsApi from "../../api/yelp";

export default function Restaurant() {
  const { id } = useLocalSearchParams();
  const [restaurant, setRestaurant] = useState(null);

  const router = useRouter();

  useEffect(() => {
    restaurantsApi
      .get(`/${id}`)
      .then((response) => {
        setRestaurant(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!restaurant) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: restaurant?.name || "Restaurant",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "600",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text
                style={{
                  color: "#007AFF",
                  fontSize: 16,
                  marginLeft: 8,
                }}
              >
                Home
              </Text>
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerShadowVisible: false,
        }}
      />

      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: restaurant.image_url }}
          style={styles.headerImage}
        />
        <View style={styles.headerOverlay} />
        <Text style={styles.headerTitle}>{restaurant.name}</Text>
      </View>

      {/* Restaurant Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.address}>
          {restaurant.location?.address1}, {restaurant.location?.city}
        </Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text style={styles.ratingText}>
            {restaurant.rating} ({restaurant.review_count} Reviews)
          </Text>
        </View>
        <Text style={styles.phone}>📞 {restaurant.display_phone}</Text>
      </View>

      {/* Categories */}
      {restaurant.categories && (
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesList}>
            {restaurant.categories.map((category) => (
              <View key={category.title} style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{category.title}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Menu Section */}
      {restaurant.categories && (
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Popular Items</Text>
          {restaurant.categories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.menuItemContainer}>
              <Ionicons name="fast-food-outline" size={24} color="#ff6347" />
              <View style={styles.menuItemTextContainer}>
                <Text style={styles.menuItemName}>{category.title}</Text>
                <Text style={styles.menuItemDescription}>
                  Delicious {category.title} dishes available.
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: 250,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 250,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    position: "absolute",
    bottom: 20,
    left: 20,
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  infoContainer: {
    padding: 20,
  },
  address: {
    fontSize: 16,
    color: "#666",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 5,
    color: "#333",
  },
  phone: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  categoriesList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryBadge: {
    backgroundColor: "#ff6347",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryText: {
    color: "#fff",
    fontWeight: "bold",
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 15,
  },
  menuItemTextContainer: {
    marginLeft: 10,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  menuItemDescription: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#777",
  },
});

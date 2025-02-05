import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function RestaurantCard({ restaurant, onPress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: restaurant.image_url }} style={styles.image} />

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{restaurant.name}</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.rating}>{restaurant.rating} ⭐</Text>
          <Text style={styles.distance}>
            {(restaurant.distance / 1000).toFixed(1)}km away
          </Text>
          <Text style={styles.price}>{restaurant.price}</Text>
        </View>

        <View style={styles.addressContainer}>
          <Text style={styles.address}>{restaurant.location.address1}</Text>
          <Text style={styles.address}>
            {restaurant.location.city}, {restaurant.location.state}{" "}
            {restaurant.location.zip_code}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 30,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    padding: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFD700",
    marginRight: 10,
  },
  distance: {
    fontSize: 14,
    color: "#666",
    marginRight: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  addressContainer: {
    marginTop: 5,
  },
  address: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});

import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}>
			<Text className="font-bold text-3xl font-rubik-extrabold text-center my-10">
				Welcome to the ReState
			</Text>
		</View>
	);
}

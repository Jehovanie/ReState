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
			<Text>Hello World...</Text>
			<Text>I'm coming again...</Text>

			<Link href="/sign-in">Sign In</Link>
			<Link href="/explore">Explore</Link>
			<Link href="/profile">Profile</Link>
			<Link href="/properties/777">Properties</Link>
		</View>
	);
}

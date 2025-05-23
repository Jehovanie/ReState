import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResult";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
	const { user } = useGlobalContext();
	const params = useLocalSearchParams<{ query?: string; filter?: string }>();

	const { data: latestProperties, loading: lastestPropertiesLoading } = useAppwrite({ fn: getLatestProperties });

	const {
		data: properties,
		loading,
		refetch,
	} = useAppwrite({
		fn: getProperties,
		params: {
			query: params.query!,
			filter: params.filter!,
			limit: 6,
		},
	});

	const handleCardPress = (id: string) => router.push(`/properties/${id}`);

	useEffect(() => {
		refetch({
			query: params.query!,
			filter: params.filter!,
			limit: 6,
		});
	}, [params.query, params.filter]);


	return (
		<SafeAreaView className="bg-white f-full">
			<FlatList
				data={properties}
				renderItem={({ item }) => <Card item={item} onPress={() => handleCardPress(item.$id)} />}
				keyExtractor={(item) => item.$id.toString()}
				numColumns={2}
				contentContainerClassName="pb-32"
				columnWrapperClassName="flex gap-5 px-5"
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={
					loading ? <ActivityIndicator size="large" className="text-primary-300 mt-5" /> : <NoResults />
				}
				ListHeaderComponent={
					<View className="px-5">
						<View className="flex flex-row items-center justify-between mt-5">
							<View className="flex flex-row items-center">
								<Image source={{ uri: user?.avatar }} className="size-12 rounded-full" />
								<View className="flex flex-col items-start ml-2 justify-center">
									<Text className="text-xs font-rubik">Good Morning</Text>
									<Text className="text-base font-rubik-medium text-black-300">
										{user?.name || "User"}
									</Text>
								</View>
							</View>
							<Image source={icons.bell} className="size-6" />
						</View>
						<Search />
						<View className="my-5">
							<View className="flex flex-row items-center justify-between">
								<Text className="text-xl font-rubik-bold text-black-300">Featured</Text>
								<TouchableOpacity>
									<Text className="text-base font-rubik-bold text-primary-300">See all</Text>
								</TouchableOpacity>
							</View>

							{lastestPropertiesLoading ? (
								<ActivityIndicator size="large" className="text-primary-300 mt-5" />
							) : !latestProperties || latestProperties.length === 0 ? (
								<NoResults />
							) : (
								<FlatList
									data={latestProperties}
									renderItem={({ item }) => (
										<FeaturedCard item={item} onPress={() => handleCardPress(item.$id)} />
									)}
									keyExtractor={(item) => item.$id.toString()}
									horizontal
									bounces={false}
									showsHorizontalScrollIndicator={false}
									contentContainerClassName="gap-5 mt-5"
								/>
							)}
						</View>

						<View className="flex flex-row items-center justify-between">
							<Text className="text-xl font-rubik-bold text-black-300">Our Recomendation</Text>
							<TouchableOpacity>
								<Text className="text-base font-rubik-bold text-primary-300">See all</Text>
							</TouchableOpacity>
						</View>

						<Filters />
					</View>
				}
			/>
		</SafeAreaView>
	);
}

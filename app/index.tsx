import React from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import { JobDataProps, useFetch } from "../hook/useFetch";

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const { isLoading, error, data } = useFetch("search", {
    query: "React developer",
    num_pages: 1,
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.menu}
              onPress={() => router.push("Menu")}
              dimension="60%"
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={images.profile}
              onPress={() => router.push("Search")}
              dimension="60%"
            />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleOnPress={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`)
                setSearchTerm("");
              };
            }}
          />
          <Popularjobs
            isLoading={isLoading}
            error={error}
            data={data as JobDataProps[]}
          />
          <Nearbyjobs
            isLoading={isLoading}
            error={error}
            data={data as JobDataProps[]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  ImageURISource,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import { JobDataProps, useFetch } from "../../hook/useFetch";

const tabs = ["About", "Qualifications", "Responsibilities"];

const displayTabContent = (tab: string, data: JobDataProps[]) => {
  switch (tab) {
    case "About":
      return (
        <JobAbout
          info={data?.[0].job_description ?? "No description provided"}
        />
      );
    case "Qualifications":
      return (
        <Specifics
          title="Qualifications"
          points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
        />
      );
    case "Responsibilities":
      return (
        <Specifics
          title="Responsibilities"
          points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
        />
      );
    default:
      break;
  }
};

export default function JobDetails() {
  const params = useSearchParams();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [activeTabs, setActiveTabs] = useState<string>(tabs[0]);

  const { isLoading, error, data } = useFetch("job-details", {
    job_id: params.id,
  });

  const onRefresh = useCallback(() => {}, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              onPress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong!!!</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data?.[0]?.employer_logo as string}
                jobTitle={data?.[0].job_title as string}
                companyName={data?.[0].employer_name as string}
                location={data?.[0].job_country as string}
              />
              <JobTabs
                tabs={tabs}
                activeTabs={activeTabs}
                setActiveTabs={setActiveTabs}
              />

              {displayTabContent(activeTabs, data as JobDataProps[])}
            </View>
          )}
        </ScrollView>
        <JobFooter
          url={
            data?.[0].job_google_link ??
            "https://careers.google.com/jobs/result"
          }
        />
      </>
    </SafeAreaView>
  );
}

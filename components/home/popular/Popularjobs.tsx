import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

import PopularJobCard from "../../../components/common/cards/popular/PopularJobCard";
import { COLORS, icons, SIZES } from "../../../constants";
import { JobDataProps, useFetch } from "../../../hook/useFetch";

import styles from "./popularjobs.style";

interface PopularjobsProps {
  isLoading: boolean;
  error: string | null;
  data: JobDataProps[];
}

const Popularjobs = ({ isLoading, error, data }: PopularjobsProps) => {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = React.useState<string>(data?.at(0)?.job_id || "");
  // console.log("🚀 ~ file: Popularjobs.tsx:24 ~ Popularjobs ~ data:", data)

  const handleCardPress = (job: JobDataProps) => {
    router.push(`/job-details/${job.job_id}`);
    setSelectedJob(job.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrongh!!!</Text>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;

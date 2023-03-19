import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

import NearbyJobCard from "../../../components/common/cards/nearby/NearbyJobCard";
import { COLORS,  } from "../../../constants";
import { JobDataProps, useFetch } from "../../../hook/useFetch";

import styles from "./nearbyjobs.style";

interface NearbyjobsProps {
  isLoading: boolean;
  error: string | null;
  data: JobDataProps[];
}

const Nearbyjobs = ({ isLoading, error, data}: NearbyjobsProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong!!!</Text>
        ) : (
          data?.map((job) => {
            return (
              <NearbyJobCard
                key={`nearby-job-${job.job_id}`}
                job={job}
                handleNavigate={() => {
                  router.push(`/job-details/${job.job_id}`);
                }}
              />
            );
          })
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;

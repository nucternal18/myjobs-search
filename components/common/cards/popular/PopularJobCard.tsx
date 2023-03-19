import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./popularjobcard.style";
import { JobDataProps } from "../../../../hook/useFetch";
import { checkImageURL } from "../../../../utils";

interface PopularJobCardProps {
  item: JobDataProps;
  selectedJob: string;
  handleCardPress: (job: JobDataProps) => void;
}

const PopularJobCard = ({
  item,
  selectedJob,
  handleCardPress,
}: PopularJobCardProps) => {
  return (
    <TouchableOpacity
      style={styles().container}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles().logoContainer}>
        <Image
          source={{
            uri: checkImageURL(item.employer_logo)
              ? item.employer_logo
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqz05H.jpg",
          }}
          resizeMode="contain"
          style={styles().logoImage}
        />
      </TouchableOpacity>
      <Text style={styles(selectedJob, item).companyName} numberOfLines={1}>
        {item.employer_name}
      </Text>
      <View style={styles(selectedJob, item).infoContainer}>
        <Text style={styles(selectedJob, item).jobName} numberOfLines={1}>
          {item.job_title}
        </Text>
        <Text style={styles().location}>{item.job_country}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;

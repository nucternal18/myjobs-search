import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

const jobTypes = [ "Full Time", "Part Time", "Contract", "Freelance", "Internship"]

interface WelcomeProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleOnPress: () => void;
}

const Welcome = ({searchTerm, setSearchTerm, handleOnPress}: WelcomeProps) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = React.useState<string>(jobTypes[0]);
  return (
    <View>
      <View style={styles().container}>
        <Text style={styles().userName}>Welcome back</Text>
        <Text style={styles().welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles().searchContainer}>
        <View style={styles().searchWrapper}>
          <TextInput
            style={styles().searchInput}
            placeholder="Search for jobs"
            value={searchTerm}
            onChange={(text) => setSearchTerm(text.nativeEvent.text)}
          />
        </View>
        <TouchableOpacity style={styles().searchBtn} onPress={handleOnPress}>
          <Image source={icons.search} style={styles().searchBtnImage} />
        </TouchableOpacity>
      </View>

      <View style={styles().tabsContainer}>
        <FlatList 
          data={jobTypes}
          keyExtractor={item => item}
          contentContainerStyle={{columnGap: SIZES.small}}
          horizontal
          renderItem={({item}) => (
            <TouchableOpacity style={styles(activeJobType, item).tab} onPress={() => {
              setActiveJobType(item)
              router.push(`/search/${item}`)
              }}>
              <Text style={styles(item).tabText}>{item}</Text>
            </TouchableOpacity>
          )}
        />

      </View>
    </View>
  );
};

export default Welcome;

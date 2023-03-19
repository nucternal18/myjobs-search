import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'

import styles from './tabs.style'
import { SIZES } from '../../../constants'

interface TabsProps {
  tabs: string[]
  activeTabs: string
  setActiveTabs: React.Dispatch<React.SetStateAction<string>>
}

const Tabs = ({tabs, activeTabs, setActiveTabs}: TabsProps) => {
  return (
    <View style={styles().container}>
      <FlatList 
      data={tabs}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{columnGap: SIZES.small / 2}}
      keyExtractor={item => item}
      renderItem={({item}) => (
        <TouchableOpacity style={styles(item, activeTabs).btn} onPress={() => setActiveTabs(item)} >
          <Text style={styles().btnText}>{item}</Text>
        </TouchableOpacity>
      )}
      />
    </View>
  )
}

export default Tabs
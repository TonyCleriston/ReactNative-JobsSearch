import {useState} from 'react'
import { View, Text , TextInput,Image, TouchableOpacity,FlatList } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './welcome.style'
import { icons, SIZES} from '../../../constants'
const jobTypes = ['Tempo integral', 'Meio Turno', 'Freelance', 'Estágio']

const Welcome = ({searchTerm, setSearchTerm, handleClick}) => {
  const router = useRouter()
  const [activeJobType, setActiveJobType] = useState('Full-time')
  
  return (
    <View>
      <View style={styles.container}>
      <Text style={styles.userName}>Olá Gabriel</Text>
      <Text style={styles.welcomeMessage}>Encontre seu trabalho dos sonhos</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
        <TextInput placeholder='O que você procura?' value={searchTerm} onChangeText={(text) => setSearchTerm(text)} style={styles.searchInput}/>
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image source={icons.search} resizeMode='contain' style={styles.searchBtnImage}/>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
      <FlatList
       data={jobTypes}
       renderItem={({item}) => (
         <TouchableOpacity style={styles.tab(activeJobType, item)} onPress={() => {setActiveJobType(item); router.push(`/search/${item}`) }}>
          <Text style={styles.tabText(activeJobType, item)}>
            {item}
          </Text>
         </TouchableOpacity>
       )}
       keyExtractor={item => item}
       contentContainerStyle={{columnGap:SIZES.small}}
       horizontal
      />
      </View>
    </View>
  )
}

export default Welcome
import {Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl} from 'react-native'
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router'
import { useCallback, useState } from 'react'
import {Company,JobAbout,JobFooter,JobTabs,ScreenHeaderBtn, Specifics} from '../../components'
import { COLORS, icons, SIZES} from '../../constants'
import useFetch from '../../hook/useFetch'

const tabs = ['Detalhes', 'Qualificações', 'Reponsabilidades']


const JobDetails = () => {
    const params = useGlobalSearchParams()
    const router = useRouter()
    console.log(params)
    const {data, isLoading, error, refetch} = useFetch('job-details', {
        job_id: params.id
        
    })
    const [activeTab, setActiveTab] = useState(tabs[0])
    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = useCallback(() => {
        setRefreshing(true)
        refetch();
        setRefreshing(false)
    })
    const dislayTabContent = () => {
        switch(activeTab){
            case 'Detalhes':
                return <JobAbout info={data[0].job_description ?? 'Detalhes não encontrados'}/>
            case 'Qualificações':
                return <Specifics title='Qualificações' points={data[0].job_highlights?.Qualifications ?? ['Qualificações não encontradas']}/>
            case 'Reponsabilidades':
                return <Specifics title='Responsabilidades' points={data[0].job_highlights?.Responsibilities ?? ['Responsabilidades não informadas']}/>
        }
    }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
        <Stack.Screen
        options={{
            headerStyle: {backgroundColor: COLORS.lightWhite},
            headerShadowVisible: false,
            headerBackVisible: false,
            headerLeft: () => (
                <ScreenHeaderBtn iconUrl={icons.left} dimension='60%' handlePress={() => router.back()} />
            ),
            headerRight: () => (
                <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
            ),
            headerTitle: ''
        }}
        />
        <>
            <ScrollView showsVerticalScrollIndicator={false} onRefresh={onRefresh} refreshControl={<RefreshControl refreshing={refreshing} />}>
                {isLoading ? (
                    <ActivityIndicator size='large' color={COLORS.primary} />
                ) : error ? (
                    <Text>Alogo de errado ocorreu</Text>
                ) : data.length === 0 ? (
                    <Text>Nenhum resultado encontrado</Text>
                ) : (
                    <View style={{padding: SIZES.medium, paddingBottom: 100}}>
                        <Company
                         companyLogo={data[0].employer_logo}
                         jobTitle={data[0].job_title}
                         companyName={data[0].employer_name}
                         location={data[0].job_country}
                         />
                        <JobTabs
                        tabs={tabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        />

                        {dislayTabContent()}
                    </View>
                )}

            </ScrollView>

            <JobFooter
            url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'}
            />
        </>

    </SafeAreaView>
  )
}

export default JobDetails
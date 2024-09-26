import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated } from 'react-native';
import CustomButton from '@/Components/Utility/CustomButton';
import { AppText } from '@/Components/Utility/AppText';
import { router, useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import MemberCard from '@/Components/Cards/MemberCard';
import DiscussionCard from '@/Components/Cards/DiscussionCard';
import BackDirectionSvg from '@/Components/Svg/BackDirectionSvg';
import LocationIconSvg from '@/Components/Svg/LocationIconSvg'
import DateIconSvg from '@/Components/Svg/DateIconSvg';
import TimeIconSvg from '@/Components/Svg/TimeIconSvg';
import Colors from '@/constants/Colors';
import React, { useState, useEffect } from 'react';


interface AboutTabProps {
}

interface MembersTabProps {
}

interface DiscussionsTabProps {
}

const AboutTab: React.FC<AboutTabProps> = ({}) => {
    return (
        <View>
            
        </View>
    )
}

const DiscussionsTab: React.FC<DiscussionsTabProps> = ({}) => {
    return (
        <View>
            
        </View>
    )
}

const MembersTab: React.FC<MembersTabProps> = ({}) => {
    return (
        <View>
            
        </View>
    )
}

const GroupDetails = () => {
    const { uniqueURL, tab } = useLocalSearchParams<{ uniqueURL: string, tab: string }>();
    const [activeTab, setActiveTab] = useState('');
    const navigation = useNavigation();
    // About section data
    const [description, setDescription] = useState("Picture this: A vibrant community nestled in the heart of the United Kingdom, uniting individuals who are passionate about spreading the contagious spirit of positivity. Here, we're not just enthusiasts; we're advocates, champions, and connoisseurs of all things uplifting. In the Positivity Lovers Club, we've created a haven for those who believe that positivity isn't just a mindset; it's a way of life. We're the ones who look for silver linings on even the cloudiest of days, and we've turned 'glass half full' into an art form. So, if you're a lover of sunny dispositions, a connoisseur of good vibes, and a collector of heartwarming stories, the Positivity Lovers Club in the UK is the perfect place for you. Join us in our quest to connect, inspire, and uplift, because we know that together, we can make the world a brighter, more cheerful place. 🌟💖Picture this: A vibrant community nestled in the heart of the United Kingdom, uniting individuals who are passionate about spreading the contagious spirit of positivity. Here, we're not just enthusiasts; we're advocates, champions, and connoisseurs of all things uplifting. In the Positivity Lovers Club, we've created a haven for those who believe that positivity isn't just a mindset; it's a way of life. We're the ones who look for silver linings on even the cloudiest of days, and we've turned 'glass half full' into an art form.  So, if you're a lover of sunny dispositions, a connoisseur of good vibes, and a collector of heartwarming stories, the Positivity Lovers Club in the UK is the perfect place for you. Join us in our quest to connect, inspire, and uplift, because we know that together, we can make the world a brighter, more cheerful place. 🌟💖'");
    const [location, setLocation] = useState("London, UK");
    const [date, setDate] = useState("24 Sep, 2023");
    const [time, setTime] = useState("10:00 AM");
    // Members section data
    const [members, setMembers] = useState([]);

    const handleBackPress = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            router.push("/")
        }
    };

    const switchTab = (tab: string) => {
        router.setParams({ tab })
    };
    
    const checkTab = () => {
        if (tab) {
            setActiveTab(tab);
        } else {
            router.setParams({ tab: 'details' })
        }
    };

    useEffect(() => {
        checkTab();
    }, [tab]);

    return (
        <View style={styles.fullFlex}>
            <ScrollView>
                <View style={styles.miniHeader}>
                    <TouchableOpacity onPress={handleBackPress} style={styles.backHeaderButton}>
                        <BackDirectionSvg />
                    </TouchableOpacity>
                </View>

                <View style={styles.imageContainer}>
                    <View style={styles.imageMain}>
                        <Image style={styles.imageItself} source={require('@/assets/images/game_com.png')} />
                    </View>
                </View>

                <View>
                    <Text>{uniqueURL}</Text>
                </View>

                {/* <View style={styles.tabLinks}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity onPress={() => switchTab('about')} style={styles.tabLink}>
                            <View style={styles.tabLinkTextContainer}>
                                <AppText style={[styles.tabLinkText, tab === 'about'? styles.tabLinkTextActive : {}]}>About</AppText>
                            </View>
                            <View style={[styles.tabLinkBottomLine, tab === 'about'? styles.tabLinkBottomLineActive : {}]}></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => switchTab('events')} style={styles.tabLink}>
                            <View style={styles.tabLinkTextContainer}>
                                <AppText style={[styles.tabLinkText, tab === 'events'? styles.tabLinkTextActive : {}]}>Events</AppText>
                            </View>
                            <View style={[styles.tabLinkBottomLine, tab === 'events'? styles.tabLinkBottomLineActive : {}]}></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => switchTab('discussions')} style={styles.tabLink}>
                            <View style={styles.tabLinkTextContainer}>
                                <AppText style={[styles.tabLinkText, tab === 'discussions'? styles.tabLinkTextActive : {}]}>Discussions</AppText>
                            </View>
                            <View style={[styles.tabLinkBottomLine, tab === 'discussions'? styles.tabLinkBottomLineActive : {}]}></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => switchTab('members')} style={styles.tabLink}>
                            <View style={styles.tabLinkTextContainer}>
                                <AppText style={[styles.tabLinkText, tab === 'members'? styles.tabLinkTextActive : {}]}>Members</AppText>
                            </View>
                            <View style={[styles.tabLinkBottomLine, tab === 'members'? styles.tabLinkBottomLineActive : {}]}></View>
                        </TouchableOpacity>
                    </ScrollView>
                </View> */}

                {activeTab === 'about' && <AboutTab />}
                {activeTab === 'discussions' && <DiscussionsTab />}
                {activeTab === 'members' && <MembersTab />}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    fullFlex: {
        flex: 1,
        backgroundColor: Colors.colorWhite,
    },

    miniHeader: {
        width: '100%',
        height: 80,
        paddingVertical: 16,
        paddingHorizontal: 24,
        marginBottom: 8,
        backgroundColor: Colors.colorWhite,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    backHeaderButton: {
        width: 32,
        height: 32,
        borderRadius: 8,
        borderWidth: 1.2,
        borderColor: Colors.colorWhiteTwo,
        backgroundColor: Colors.colorWhite,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    imageContainer: {
        width: '100%',
        height: 200,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },

    imageMain: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },

    imageItself: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
})
export default GroupDetails
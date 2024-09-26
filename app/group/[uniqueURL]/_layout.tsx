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
    description?: string;
    location?: string;
    date?: string;
    time?: string;
}

interface MembersTabProps {
    members?: any;
}

interface DiscussionsTabProps {
    discussions?: any;
}

const AboutTab: React.FC<AboutTabProps> = ({ description, location, date, time }) => {
    return (
        <View style={styles.generalOverallContainer}>
            <View style={styles.generalChildContainer}>
                <Text style={styles.generalTitle}>Group description</Text>
                <AppText style={styles.generalText}>{description}</AppText>
            </View>
            <View style={styles.generalChildContainer}>
                <Text style={styles.generalTitle}>Meeting times</Text>
                <View style={styles.generalDateTime}>
                    <View style={styles.dateTimeCard}>
                        <View style={styles.dateTimeCardIcon}>
                            <LocationIconSvg />
                        </View>
                        <View style={styles.dateTimeCardText}>
                            <AppText style={styles.genDateAndTimeTitle}>Location</AppText>
                            <AppText style={styles.genDateAndTimeText}>{location}</AppText>
                        </View>
                    </View>
                    <View style={styles.dateTimeCard}>
                        <View style={styles.dateTimeCardIcon}>
                            <DateIconSvg />
                        </View>
                        <View style={styles.dateTimeCardText}>
                            <AppText style={styles.genDateAndTimeTitle}>Date</AppText>
                            <AppText style={styles.genDateAndTimeText}>{date}</AppText>
                        </View>
                    </View>
                    <View style={styles.dateTimeCard}>
                        <View style={styles.dateTimeCardIcon}>
                            <TimeIconSvg />
                        </View>
                        <View style={styles.dateTimeCardText}>
                            <AppText style={styles.genDateAndTimeTitle}>Time</AppText>
                            <AppText style={styles.genDateAndTimeText}>{time}</AppText>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const DiscussionsTab: React.FC<DiscussionsTabProps> = ({ discussions }) => {
    return (
        <View style={styles.altOverallContainer}>
            <Text style={styles.altTitle}>Discussions (0)</Text>
            <View style={styles.generalMemberCards}>
                <DiscussionCard />
            </View>
        </View>
    )
}

const MembersTab: React.FC<MembersTabProps> = ({ members }) => {
    return (
        <View style={styles.generalOverallContainer}>
            <View style={styles.generalChildContainer}>
                <Text style={styles.generalTitle}>ORGANIZERS</Text>
                <View style={styles.generalMemberCards}>
                    <MemberCard />
                </View>
            </View>
            <View style={styles.generalChildContainer}>
                <Text style={styles.generalTitle}>OTHER MEMBERS</Text>
                <View style={styles.generalMemberCards}>
                    <MemberCard />
                </View>
            </View>
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

    const shareGroup = () => {
        console.log('====================================');
        console.log('shareGroup');
        console.log('====================================');
    };

    const joinGroup = () => {
        console.log('====================================');
        console.log('joinGroup');
        console.log('====================================');
    };

    const switchTab = (tab: string) => {
        router.setParams({ tab })
    };
    
    const checkTab = () => {
        if (tab) {
            setActiveTab(tab);
        } else {
            router.setParams({ tab: 'about' })
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

                <View style={styles.basicDetails}>
                    <View style={styles.basicDetailsText}>
                        <View style={styles.basicDetailsInner}>
                            <View style={styles.basicIntroText}>
                                <Text style={styles.groupTitle}>Positivity lovers club</Text>
                                {/* public or private */}
                            </View>
                            <AppText style={styles.groupTagLine}>Connecting positivity lovers in the UK together</AppText>
                        </View>
                        
                        <View style={styles.locationAndMembers}>
                            {/* <AppText>London, UK</AppText>
                            <AppText>10 members</AppText> */}
                        </View>
                    </View>
                    <View style={styles.basicDetailsButton}>
                        <CustomButton onPress={joinGroup} coloring="defaultColoring" size='defaultSize'>Join group</CustomButton>
                        <CustomButton onPress={shareGroup} coloring="inverseColoring" size='defaultSize'>Share</CustomButton>
                    </View>
                </View>

                <View style={styles.tabLinks}>
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
                </View>

                {activeTab === 'about' && <AboutTab 
                    description={description}
                    location={location}
                    date={date}
                    time={time}/>}

                {activeTab === 'discussions' && <DiscussionsTab />}
                {activeTab === 'members' && <MembersTab 
                    members={members}/>}
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

    basicDetails: {
        width: '100%',
        paddingHorizontal: 24,
        paddingVertical: 32,
        gap: 24,
        alignItems: 'flex-start',
    },

    basicDetailsText: {
        width: '100%',
        alignItems: 'flex-start',
        gap: 12,
    },

    basicDetailsInner: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 2,
    },

    basicIntroText: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 8,
    },

    groupTitle: {
        fontFamily: 'GTWalsheimProMedium',
        fontWeight: '500',
        fontSize: 22,
        lineHeight: 29.7,
        letterSpacing: -0.44,
        color: Colors.colorDarkOne,
    },

    groupTagLine: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 16.8,
        letterSpacing: -0.28,
        color: Colors.colorGrayTwo,
    },

    locationAndMembers: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 16,
    },

    basicDetailsButton: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
    },

    tabLinks: {
        width: '100%',
        height: 40,
        backgroundColor: Colors.colorWhiteFour,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: Colors.colorWhiteTwo,
        zIndex: 0,
    },

    tabLink: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 24,
    },

    tabLinkTextContainer: {
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 2,
    },

    tabLinkText: {
        fontSize: 14,
        lineHeight: 18.9,
        letterSpacing: -0.28,
        color: Colors.colorGrayTwo,
    },

    tabLinkTextActive: {
        color: Colors.mainColor,
    },

    tabLinkBottomLine: {
        width: '100%',
        height: 2,
        borderRadius: 100,
        backgroundColor: Colors.colorWhiteFour,
        zIndex: 1,
    },

    tabLinkBottomLineActive: {
        fontFamily: 'GTWalsheimProMedium',
        fontWeight: '500',
        backgroundColor: Colors.mainColor,
    },

    generalOverallContainer: {
        width: '100%',
        paddingHorizontal: 24,
        paddingVertical: 32,
        gap: 24,
        alignItems: 'flex-start',
    },

    generalChildContainer: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 12,
        paddingVertical: 24,
        paddingHorizontal: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: Colors.colorWhiteTwo,
    },

    generalTitle: {
        fontFamily: 'GTWalsheimProMedium',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 14,
        letterSpacing: 0.28,
        color: Colors.colorText,
        textTransform: 'uppercase',
    },

    generalText: {
        fontSize: 14,
        lineHeight: 18.9,
        letterSpacing: -0.28,
        color: Colors.colorTextInput,
    },

    generalDateTime: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 16,
    },

    dateTimeCard: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
    },

    dateTimeCardIcon: {
        width: 24,
        height: 24,
        borderRadius: 100,
        backgroundColor: Colors.colorWhiteNine,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },

    dateTimeCardText: {
        width: '100%',
        alignItems: 'flex-start',
        paddingVertical: 4,
        gap: 6,
    },

    genDateAndTimeTitle: {
        fontSize: 14,
        lineHeight: 14,
        letterSpacing: -0.14,
        color: Colors.colorGrayTwo,
    },

    genDateAndTimeText: {
        fontSize: 14,
        lineHeight: 18.9,
        letterSpacing: -0.28,
        color: Colors.colorTextInput,
    },

    generalMemberCards: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 24,
    },

    altOverallContainer: {
        width: '100%',
        paddingHorizontal: 24,
        paddingVertical: 40,
        gap: 16,
        alignItems: 'flex-start',
    },

    altTitle: {
        fontFamily: 'GTWalsheimProMedium',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 14,
        letterSpacing: -0.28,
        color: Colors.colorDarkTwo,
    },
})
export default GroupDetails
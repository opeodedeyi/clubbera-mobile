import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { AppText } from '@/Components/Utility/AppText';
import Colors from '@/constants/Colors';
import ToolkitIconSvg from '@/Components/Svg/ToolkitIconSvg';
import React from 'react';


interface MemberCardProps {
    imageSrc?: any;
    name?: string;
    content?: string;
    timeCommented?: string;
    likesCount?: number;
    replyCount?: number;
}

const MemberCard: React.FC<MemberCardProps> = ({ imageSrc, name, content, timeCommented, likesCount, replyCount }) => {
    const handlePress = () => {
        console.log('Pressed');
    };

    const commentAction = (action: string) => {
        console.log(action);
    };

    return (
        <View style={styles.cardContainer} >
            <View style={styles.mainDetails}>
                <View style={styles.profileDetails}>
                    <View style={styles.profileSection}>
                        <View style={styles.profileImage}>
                            <Image style={styles.imageItself} source={require('@/assets/images/game_com.png')} />
                        </View>
                        <View style={styles.nameAndTimeText}>
                            <Text style={styles.nameText}>Daniel Roberts</Text>
                            <AppText style={styles.roleText}>•</AppText>
                            <AppText style={styles.roleText}>2 hours ago</AppText>
                        </View>
                    </View>
                    <View style={styles.commentToolkit}>
                        <ToolkitIconSvg />
                    </View>
                </View>
                <View style={styles.horizontalLine}></View>
                <AppText style={styles.contentText}>
                    Hey there, fellow positivity lovers! 😄 I hope this message finds you all in high spirits. As we've grown as a community, I've been thinking a lot about how we can take our passion for positivity beyond our club's virtual walls and make a more significant impact in the UK. 
                    So, I'd love to hear your thoughts on how we can spread the positivity bug even further. Do you have any ideas, big or small, for projects, initiatives, or collaborations that could make a difference in our local communities or across the nation?    
                </AppText>
            </View>
            <View style={styles.subDetails}>
                <View style={styles.detInformation}>
                    <AppText style={styles.infoText}>{likesCount} Likes</AppText>
                    <AppText style={styles.infoText}>•</AppText>
                    <AppText style={styles.infoText}>{replyCount} Replies</AppText>
                </View>
                <View style={styles.commentAction}>
                    <TouchableOpacity onPress={() => commentAction("like")}>
                        <Text style={styles.actionText}>Like</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => commentAction("reply")}>
                        <Text style={styles.actionText}>Reply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        alignItems: 'flex-start',
        paddingVertical: 20,
        paddingHorizontal: 16,
        gap: 16,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: Colors.colorWhiteTwo,
    },

    mainDetails: {
        width: '100%',
        alignItems: 'flex-start',
        gap: 16,
    },

    profileDetails: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    profileImage: {
        width: 24,
        height: 24,
        borderRadius: 100,
        overflow: 'hidden',
    },

    imageItself: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    nameAndTimeText: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    nameText: {
        fontFamily: 'GTWalsheimProMedium',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 18.9,
        letterSpacing: -0.14,
        color: Colors.colorTextInput,
    },

    roleText: {
        fontSize: 12,
        lineHeight: 16.2,
        letterSpacing: -0.12,
        color: Colors.colorGray,
    },

    commentToolkit: {
        width: 20,
        height: 20,
        borderRadius: 4,
        padding: 3,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },

    horizontalLine: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(244, 244, 244, 0.60)',
    },

    contentText: {
        fontSize: 14,
        lineHeight: 18.9,
        letterSpacing: -0.28,
        color: Colors.colorTextInput,
    },

    subDetails: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    detInformation: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    infoText: {
        fontSize: 14,
        lineHeight: 18.9,
        letterSpacing: -0.14,
        color: Colors.colorText,
    },

    commentAction: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 32,
    },

    actionText: {
        fontFamily: 'GTWalsheimProMedium',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 18.9,
        letterSpacing: -0.14,
        color: Colors.mainColorCard,
    },
});

export default MemberCard;

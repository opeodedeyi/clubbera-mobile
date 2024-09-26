import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { AppText } from '@/Components/Utility/AppText';
import Colors from '@/constants/Colors';
import ChatIconSvg from '@/Components/Svg/ChatIconSvg';
import React from 'react';


interface MemberCardProps {
    imageSrc?: any;
    name?: string;
    role?: string;
    dateJoined?: string;
}

const MemberCard: React.FC<MemberCardProps> = ({ imageSrc, name, role, dateJoined }) => {
    const handlePress = () => {
        console.log('Pressed');
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.cardContainer} >
            <View style={styles.mainDetails}>
                <View style={styles.profileImage}>
                    <Image style={styles.imageItself} source={require('@/assets/images/game_com.png')} />
                </View>
                <View style={styles.nameAndRoleText}>
                    <Text style={styles.nameText}>Daniel Roberts</Text>
                    <AppText style={styles.roleText}>Co-organizer • Jun 2023</AppText>
                </View>
            </View>
            <View style={styles.chatButton}>
                <ChatIconSvg />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: Colors.colorWhiteFour,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: Colors.colorWhiteSix,
    },

    mainDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    profileImage: {
        width: 28,
        height: 28,
        borderRadius: 100,
        overflow: 'hidden',
    },

    imageItself: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    nameAndRoleText: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 4,
    },

    nameText: {
        fontFamily: 'GTWalsheimProMedium',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 14,
        letterSpacing: -0.28,
        color: Colors.colorTextInput,
    },

    roleText: {
        fontSize: 12,
        lineHeight: 12,
        letterSpacing: -0.24,
        color: Colors.colorGray,
    },

    chatButton: {
        backgroundColor: Colors.colorGrayFour,
        width: 32,
        height: 32,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
    },
});

export default MemberCard;

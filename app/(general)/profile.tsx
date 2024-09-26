import { AppText } from '@/Components/Utility/AppText';
import { View, Text, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { formatBirthday } from '@/utils/dateUtils';
import { useUser } from '@/context/UserContext';
import { router } from 'expo-router';
import CustomButton from '@/Components/Utility/CustomButton';
import { ThemeColors } from '@/constants/Theme';
import { useTheme } from '@/context/ThemeContext';


interface Styles {
    profileDetails: ViewStyle;
    profileDetailsTop: ViewStyle;
    profileDetailsText: ViewStyle;
    profileImage: ImageStyle;
    profileName: TextStyle;
    profileBio: TextStyle;
    profileOther: ViewStyle;
    profileTag: ViewStyle;
    profileTagTitle: TextStyle;
    profileTagDetails: TextStyle;
}

const createStyles = (colors: ThemeColors): Styles => ({
    profileDetails: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundColor,
        paddingHorizontal: 24,
        paddingVertical: 30,
        gap: 16,
    },

    profileDetailsTop: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },

    profileDetailsText: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
    },

    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 1000,
    },

    profileName: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.textColorSecondary,
        textAlign: 'center',
    },

    profileBio: {
        fontSize: 15,
        fontWeight: '400',
        color: colors.textColor,
        textAlign: 'center',
    },

    profileOther: {
        padding: 24,
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundColor,
    },

    profileTag: {
        backgroundColor: colors.backgroundColorHover,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 8,
        gap: 4,
    },

    profileTagTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.textColorSecondary,
    },

    profileTagDetails: {
        fontSize: 15,
        fontWeight: '400',
        color: colors.textColor,
    },
});

const Profile: React.FC = () => {
    const { user } = useUser();
    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <View> 
            <View style={styles.profileDetails}>
                <View style={styles.profileDetailsTop}>
                    <Image style={styles.profileImage} source={user?.avatar ? { uri: user?.avatar } : require('@/assets/images/profile.png')} />

                    <View style={styles.profileDetailsText}>
                        <AppText style={styles.profileName}>{user?.full_name}</AppText>
                        <AppText style={styles.profileBio}>{user?.bio}</AppText>
                    </View>
                </View>

                <CustomButton onPress={() => router.push('/editprofile')} size="normalSize" coloring="inverseColoring">Edit profile</CustomButton>
            </View>

            <View style={styles.profileOther}>
                <View style={styles.profileTag}>
                    <AppText style={styles.profileTagTitle}>Gender</AppText>
                    <AppText style={styles.profileTagDetails}>{user?.gender || "-"}</AppText>
                </View>

                <View style={styles.profileTag}>
                    <AppText style={styles.profileTagTitle}>Birthday</AppText>
                    <AppText style={styles.profileTagDetails}>{formatBirthday(user?.birthday) || "-"}</AppText>
                </View>

                <View style={styles.profileTag}>
                    <AppText style={styles.profileTagTitle}>Location</AppText>
                    <AppText style={styles.profileTagDetails}>{user?.location || "not set"}</AppText>
                </View>
            </View>
        </View>
    );
};

export default Profile;
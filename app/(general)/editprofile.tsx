import { AppText } from '@/Components/Utility/AppText';
import { KeyboardAvoidingView, Platform, ScrollView, View, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import MainInput from '@/Components/Inputs/MainInput';
import MainTextarea from '@/Components/Inputs/MainTextarea';
import SelectInput from '@/Components/Inputs/SelectInput';
import DateInput from '@/Components/Inputs/DateInput';
import PasswordInput from '@/Components/Inputs/PasswordInput';
import ProfileUpload from '@/Components/Inputs/ProfileUpload';
import { EditProfileProvider, useEditProfile } from '@/context/EditProfileContext';
import { useTheme } from '@/context/ThemeContext';
import CustomButton from '@/Components/Utility/CustomButton';
import { ThemeColors } from '@/constants/Theme';


interface Styles {
    profileDetails: ViewStyle;
    profileDetailsText: ViewStyle;
    profileDetailsTitle: TextStyle;
    profileDetailsDescription: TextStyle;
    profileForm: ViewStyle;
}

const createStyles = (colors: ThemeColors): Styles => ({
    profileDetails: {
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    profileDetailsText: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 8,
    },

    profileDetailsTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: colors.textColorSecondary,
    },

    profileDetailsDescription: {
        fontSize: 15,
        color: colors.textColor,
    },

    profileForm: {
        padding: 24,
        gap: 24,
        maxWidth: 500,
    },
});

const EditProfileContent: React.FC = () => {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    const {
        step,
        fullName,
        setFullName,
        bio,
        setBio,
        birthday,
        setBirthday,
        oldPassword,
        setOldPassword,
        newPassword,
        gender,
        setGender,
        setNewPassword,
        profileImage,
        setProfileImage,
        isUploadingImage,
        saveChanges,
        goToChangePassword,
        goToChangeProfile,
        genderOptions,
    } = useEditProfile();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
                <View style={styles.profileDetails}>
                    <View style={styles.profileDetailsText}>
                        <AppText style={styles.profileDetailsTitle}>Edit Profile</AppText>
                        <AppText style={styles.profileDetailsDescription}>Make changes to your profile</AppText>
                    </View>

                    <CustomButton onPress={saveChanges} size="normalSize" coloring="defaultColoring">Save</CustomButton>
                </View>

                {   step === 1 &&
                    <View style={styles.profileForm}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <ProfileUpload
                                image={profileImage}
                                setImage={setProfileImage}
                                uploadingImage={isUploadingImage}/>
                        </View>
                        <MainInput placeholder="your full name" keyboardType="email-address" label="Full name" value={fullName} setValue={setFullName} autoComplete="email" autoCapitalize="none" />
                        <MainTextarea placeholder="Bio" label="Bio" value={bio} setValue={setBio} />
                        <SelectInput
                            label="Gender"
                            name="gender"
                            options={genderOptions}
                            value={gender}
                            onChange={setGender}
                            borderRadius={8}
                            minWidth={200}/>
                        <DateInput
                            label="Birthday"
                            name="date"
                            value={birthday}
                            onChange={setBirthday} />
                    </View>
                }

                {   step === 2 &&
                    <View style={styles.profileForm}>
                        <PasswordInput placeholder="Old password" label="Old password" value={oldPassword} setValue={setOldPassword}/>
                        <PasswordInput placeholder="New password" label="New password" value={newPassword} setValue={setNewPassword}/>
                    </View>
                }
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const EditProfile: React.FC = () => {
    return (
        <EditProfileProvider>
            <EditProfileContent />
        </EditProfileProvider>
    );
};

export default EditProfile;
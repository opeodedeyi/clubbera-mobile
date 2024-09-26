import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, ViewStyle, ImageStyle } from 'react-native';
import LoadingSpinner from '@/Components/Animation/LoadingSpinner';
import Feather from '@expo/vector-icons/Feather';
import { ThemeColors } from '@/constants/Theme';
import { useTheme } from '@/context/ThemeContext';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';


interface ProfileUploadProps {
    children?: React.ReactNode;
    image?: any;
    setImage?: any;
    uploadingImage?: boolean;
}

interface Styles {
    displayImage: ViewStyle;
    displayImageSrc: ImageStyle;
    displayImageContent: ViewStyle;
}

const createStyles = (colors: ThemeColors): Styles => ({
    displayImage: {
        position: 'relative',
        width: 150,
        height: 150,
        borderRadius: 1000,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },

    displayImageSrc: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },

    displayImageContent: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, .5)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const ProfileUpload: React.FC<ProfileUploadProps> = ({ image, setImage, uploadingImage }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const [loading, setLoading] = useState<boolean>(false);

    const selectImage = async (useLibrary: boolean) => {
        setLoading(true);
        let result;

        const options: ImagePicker.ImagePickerOptions = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        };

        if (useLibrary) {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            result = await ImagePicker.launchImageLibraryAsync(options);
        } else {
            await ImagePicker.requestCameraPermissionsAsync();
            result = await ImagePicker.launchCameraAsync(options);
        }

        if (!result.canceled) {
            saveImage(result.assets[0].uri);
        } else {
            setLoading(false);
        }
    };

    const saveImage = async (uri: string) => {
        try {
            const imageInfo = await ImageManipulator.manipulateAsync(uri, []);
            let manipResult;
            if (imageInfo.width > 1920) {
                manipResult = await ImageManipulator.manipulateAsync(
                    uri,
                    [{ resize: { width: 1920 } }],
                    { compress: 0.75, format: ImageManipulator.SaveFormat.JPEG, base64: true }
                );
            } else {
                manipResult = await ImageManipulator.manipulateAsync(
                    uri,
                    [],
                    { compress: 0.75, format: ImageManipulator.SaveFormat.JPEG, base64: true }
                );
            }

            const base64Image = `data:image/jpeg;base64,${manipResult.base64}`;
            const filename = manipResult.uri.split('/').pop();
            setImage(base64Image);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <TouchableOpacity style={styles.displayImage} onPress={() => selectImage(true)}>
            <Image source={{ uri: image }} style={styles.displayImageSrc}/>
            <View style={styles.displayImageContent}>
                {
                    ( loading || uploadingImage ) ?
                        <LoadingSpinner backgroundColor={colors.colorWhite}/>
                    :
                        <Feather name="camera" size={24} color={colors.colorWhite} />
                }
            </View>
        </TouchableOpacity>
    );
};

export default ProfileUpload;

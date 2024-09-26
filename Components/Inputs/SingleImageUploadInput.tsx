import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AppText } from '@/Components/Utility/AppText';
import Colors from '@/constants/Colors';
import ImageUploadSvg from '@/Components/Svg/ImageUploadSvg';
import TrashSvg from '@/Components/Svg/TrashSvg';
import { shortenString } from '@/utils/shortenString';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';


interface SingleImageUploadInputProps {
    children?: React.ReactNode;
    image?: any;
    setImage?: any;
    imageName?: string;
    setImageName?: any;
    imageSize?: string;
    setImageSize?: any;
    deleteImage: () => void;
}

const SingleImageUploadInput: React.FC<SingleImageUploadInputProps> = ({ children, image, setImage, imageName, setImageName, imageSize, setImageSize, deleteImage }) => {
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
            setImageName(filename);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const removeImage = async () => {
        deleteImage();
    }

    return (
        <View style={styles.container}>
            {children &&  <AppText style={styles.label}>{children}</AppText>}
            <View style={styles.imageUploadContainer}>
                {!image? (
                    <TouchableOpacity style={styles.noImageSelector} onPress={() => selectImage(true)}>
                        <ImageUploadSvg />
                        <AppText style={styles.noImageSelectorText}>Click to upload</AppText>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.displayImage}>
                        <Image source={{ uri: image }} style={styles.displayImageSrc}/>
                        <View style={styles.displayImageContent}>
                            <View>
                                <AppText style={styles.imageName}>{shortenString(imageName, 25)}</AppText>
                            </View>
                            <TouchableOpacity onPress={() => removeImage()} style={styles.deletePhotoButton} >
                                <TrashSvg />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: 500,
        gap: 8,
    },

    label: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18.9,
        letterSpacing: -0.28,
        color: Colors.colorDarkTwo,
    },

    imageUploadContainer: {
        width: '100%',
    },

    noImageSelector: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        gap: 10,
        backgroundColor: "transparent",
        borderRadius: 8,
        borderWidth: 2,
        borderColor: Colors.colorWhiteSeven,
        borderStyle: 'dashed',
    },

    noImageSelectorText: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 18.9,
        letterSpacing: -0.28,
        color: Colors.colorGrayTwo,
    },

    displayImage: {
        position: 'relative',
        width: '100%',
        height: 180,
        borderRadius: 8,
        backgroundColor: Colors.colorWhiteSeven,
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
        height: 61,
        backgroundColor: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(27deg, #000 0.43%, rgba(251, 186, 186, 0.00) 164.31%)',
        padding: 11,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    imageName: {
        fontSize: 15,
        lineHeight: 18.9,
        letterSpacing: -0.28,
        color: Colors.colorWhiteTwo,
    },

    imageSize: {
        fontSize: 12,
        lineHeight: 16.2,
        letterSpacing: -0.24,
        color: Colors.colorGrayThree,
    },

    deletePhotoButton: {
        width: 32,
        height: 32,
        borderRadius: 100,
        backgroundColor: Colors.colorWhiteEight,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SingleImageUploadInput;

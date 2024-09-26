import React, { createContext, useContext, useState } from 'react';
import { useUser } from '@/context/UserContext';

interface EditProfileContextType {
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    fullName: string;
    setFullName: React.Dispatch<React.SetStateAction<string>>;
    bio: string;
    setBio: React.Dispatch<React.SetStateAction<string>>;
    birthday: string | undefined;
    setBirthday: React.Dispatch<React.SetStateAction<string | undefined>>;
    gender: string | undefined;
    setGender: React.Dispatch<React.SetStateAction<string | undefined>>;
    oldPassword: string;
    setOldPassword: React.Dispatch<React.SetStateAction<string>>;
    newPassword: string;
    setNewPassword: React.Dispatch<React.SetStateAction<string>>;
    profileImage: number | undefined;
    setProfileImage: React.Dispatch<React.SetStateAction<number | undefined>>;
    isUploadingImage: boolean;
    saveChanges: () => void;
    goToChangePassword: () => void;
    goToChangeProfile: () => void;
    genderOptions: { label: string; value: string }[];
}

const EditProfileContext = createContext<EditProfileContextType | undefined>(undefined);

export const useEditProfile = (): EditProfileContextType => {
    const context = useContext(EditProfileContext);
    if (!context) {
        throw new Error('useEditProfile must be used within an EditProfileProvider');
    }
    return context;
};

interface EditProfileProviderProps {
    children: React.ReactNode;
}

export const EditProfileProvider: React.FC<EditProfileProviderProps> = ({ children }) => {
    const { user } = useUser();
    const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);
    const [profileImage, setProfileImage] = useState<number | undefined>(user?.avatar || undefined);
    const [fullName, setFullName] = useState<string>(user?.full_name || '');
    const [bio, setBio] = useState<string>(user?.bio || '');
    const [birthday, setBirthday] = useState<string | undefined>(user?.birthday || undefined);
    const [gender, setGender] = useState<string | undefined>(user?.gender || undefined);
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const genderOptions = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
    ];

    console.log('====================================');
    console.log(user);
    console.log('====================================');

    const goToChangePassword = () => {
        setStep(2);
    }

    const goToChangeProfile = () => {
        setStep(1);
    }

    const saveChanges = () => {
        if (step === 1) {
            // Save full name and bio
            console.log('Save full name and bio');
        } else if (step === 2) {
            // Save password
            console.log('Save password');
        }
    }

    return (
        <EditProfileContext.Provider
            value={{
                step,
                setStep,
                fullName,
                setFullName,
                bio,
                setBio,
                birthday,
                setBirthday,
                gender,
                setGender,
                oldPassword,
                setOldPassword,
                newPassword,
                setNewPassword,
                profileImage,
                setProfileImage,
                isUploadingImage,
                saveChanges,
                goToChangePassword,
                goToChangeProfile,
                genderOptions,
            }}>
            {children}
        </EditProfileContext.Provider>
    );
};

export default EditProfileContext;

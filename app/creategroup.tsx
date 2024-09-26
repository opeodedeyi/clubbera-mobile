import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CreateHeader from '@/Components/Header/CreateHeader';
import CustomButton from '@/Components/Utility/CustomButton';
import MainTip from '@/Components/Utility/MainTip';
import MainInput from '@/Components/Inputs/MainInput';
import MainTextarea from '@/Components/Inputs/MainTextarea';
import BinaryOptionInput from '@/Components/Inputs/BinaryOptionInput';
import SingleImageUploadInput from '@/Components/Inputs/SingleImageUploadInput';
import CustomTag from '@/Components/Inputs/CustomTag';
import Colors from '@/constants/Colors';
import WelcomeSvg from '@/Components/Svg/WelcomeSvg';
import CommunityCreatedSvg from '@/Components/Svg/CommunityCreatedSvg';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { AppText } from '@/Components/Utility/AppText';


interface IntroStepProps {
    onPress: () => void;
    onSkipPress: () => void;
}

interface StepOneProps {
    fullName: string;
    setFullName: any;
}

interface StepTwoProps {
    presetTopics: string[];
    setPresetTopics: any;
    selectedTopics: string[];
    setSelectedTopics: any;
}

interface StepThreeProps {
    groupTitle: string;
    setGroupTitle: any;
    groupDescription: string;
    setGroupDescription: any;
}

interface StepFourProps {
    boolValue: any;
    setBoolValue: any;
    image: any;
    setImage: any;
    imageName: string;
    setImageName: any;
    imageSize: string;
    setImageSize: any;
    deleteImage: () => void;
}

interface FinishStepProps {
    onPress: () => void;
    groupTitle: string;
}

const IntroStep: React.FC<IntroStepProps> = ({ onPress, onSkipPress }) => {
    return (
        <View style={styles.tro}>
            <View style={styles.troContent}>
                <View style={styles.troImage}>
                    <WelcomeSvg />
                </View>
                <View style={styles.troTexts}>
                    <Text style={styles.TroTextTitle}>Welcome to Clubbera! Create your community now.</Text>
                    <AppText style={styles.TroTextSub}>Create your community in four (4) simple steps: Choose a location, select topics, add description and other key details, and you're done!</AppText>
                </View>
            </View>
            <View style={styles.troButton}>
                <CustomButton size="fullWidthSize" coloring="defaultColoring" onPress={onPress}>Create now</CustomButton>
                <CustomButton size="buttonNoButtonSize" coloring="buttonNoButtonColoring" onPress={onSkipPress}>Skip</CustomButton>
            </View>
        </View>
    )
}

const CreateGroupStepOne: React.FC<StepOneProps> = ({ fullName, setFullName }) => {
    return (
        <View style={styles.childContainer}>
            <View style={styles.childContainerText}>
                <Text style={styles.MainTextTitle}>First, set your location for your group</Text>
                <AppText style={styles.MainTextSub}>Begin with setting your location to help us connect with people in your area.</AppText>
            </View>
            <View style={styles.childContainerForm}>
                <MainInput placeholder="Enter location" keyboardType="default" value={fullName} setValue={setFullName} autoComplete="name" />
            </View>
        </View>
    )
}

const CreateGroupStepTwo: React.FC<StepTwoProps> = ({ presetTopics, setPresetTopics, selectedTopics, setSelectedTopics }) => {
    const handleTopicClick = (topic:string): () => void => {
        return () => {
            if (selectedTopics.includes(topic)) {
                setSelectedTopics((prevTopics:[]) => prevTopics.filter(prevTopic => prevTopic !== topic));
            } else {
                setSelectedTopics((prevTopics:[]) => [...prevTopics, topic]);
            }
        }
    };

    const stylesStepTwo = StyleSheet.create({
        formTags: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "flex-start",
            gap: 8,
            flexWrap: "wrap",
        },
    })

    return (
        <View style={styles.childContainer}>
            <View style={styles.childContainerText}>
                <Text style={styles.MainTextTitle}>Choose topics for your group</Text>
                <AppText style={styles.MainTextSub}>Set the topics for your group, select at least 3 topics before moving onto the next step.</AppText>
            </View>
            <View style={styles.childContainerForm}>
                {/* searchbar */}
                    
                <View style={stylesStepTwo.formTags}>
                    {presetTopics.map((topic, index) => (
                        <CustomTag key={index} selected={selectedTopics.includes(topic) ? 'isSelected' : 'isNotSelected'} onPress={handleTopicClick(topic)}>
                            {topic}
                        </CustomTag>
                    ))}
                </View>
            </View>
        </View>
    )
}

const CreateGroupStepThree: React.FC<StepThreeProps> = ({ groupTitle, setGroupTitle, groupDescription, setGroupDescription }) => {
    return (
        <View style={styles.childContainer}>
            <View style={styles.childContainerText}>
                <Text style={styles.MainTextTitle}>Describe group</Text>
                <AppText style={styles.MainTextSub}>Choose a name that will give people a clear idea of what the group is about. You can edit this later if you change your mind.</AppText>
            </View>
            <MainTip>We value human connection and review groups to ensure they meet our guidelines. Consider your group's goal, audience, and event activities.</MainTip>
            <View style={styles.childContainerForm}>
                <MainInput placeholder="Enter name" label="Group name" keyboardType="default" value={groupTitle} setValue={setGroupTitle} />
                <MainTextarea placeholder="Enter description" label="Description" value={groupDescription} setValue={setGroupDescription} />
            </View>
        </View>
    )
}

const CreateGroupStepFour: React.FC<StepFourProps> = ({ boolValue, setBoolValue, image, setImage, imageName, setImageName, imageSize, setImageSize, deleteImage }) => {
    return (
        <View style={styles.childContainer}>
            <View style={styles.childContainerText}>
                <Text style={styles.MainTextTitle}>Complete setup</Text>
                <AppText style={styles.MainTextSub}>Configure the privacy settings and upload an image that best describes your group.</AppText>
            </View>
            <View style={styles.childContainerForm}>
                <BinaryOptionInput truthyPlaceholder="Private" falseyPlaceholder="Public" boolValue={boolValue} setBoolValue={setBoolValue}>Is this group a Private or Public Group?</BinaryOptionInput>
                <SingleImageUploadInput
                    image={image}
                    setImage={setImage}
                    imageName={imageName}
                    setImageName={setImageName}
                    imageSize={imageSize}
                    setImageSize={setImageSize}
                    deleteImage={deleteImage}>
                        Upload image
                </SingleImageUploadInput>
            </View>
        </View>
    )
}

const FinishStep: React.FC<FinishStepProps> = ({ onPress, groupTitle }) => {
    return (
        <View style={styles.tro}>
            <View style={styles.troContent}>
                <View style={styles.troTexts}>
                    <Text style={styles.TroTextTitle}>Your group is all set up 🎉</Text>
                    <AppText style={styles.TroTextSub}>Congratulations. You have successfully created a community group - &lsquo;{groupTitle}&rsquo;. Kindly proceed to your dashboard</AppText>
                </View>
                <View style={styles.troImage}>
                    <CommunityCreatedSvg />
                </View>
            </View>
            <View style={styles.troButton}>
                <CustomButton size="fullWidthSize" coloring="defaultColoring" onPress={onPress}>Go to Dashboard</CustomButton>
            </View>
        </View>
    )
}

const creategroup = () => {
    const navigation = useNavigation();
    const [step, setStep] = useState(0);
    const [presetTopics, setPresetTopics] = useState(["writing", "singing", "guitar lessons", "playstation", "chess", "architecture", "dancing", "new to town", "graphics design"]);
    const [topicSearch, setTopicSearch] = useState("");
    const [fullName, setFullName] = useState("");
    const [groupTitle, setGroupTitle] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [isPrivate, setIsPrivate] = useState(null);
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('');
    const [imageSize, setImageSize] = useState('');

    const handleBackPress = () => {
        if (step <= 1 || step === 5) {
            if (navigation.canGoBack()) {
                navigation.goBack();
            } else {
                router.push("/")
            }
        } else {
            setStep(prevStep => prevStep - 1);
        }
    };

    const handleNext = () => {
        if (step < 5) {
            setStep(step + 1)
        } else {
            router.push("/")
        }
    };

    const deleteImage = async () => {
        setImage(null);
        setImageName('');
        setImageSize('');
    }

    const disableNextPage = () => {
        switch (step) {
            case 1:
                return !fullName;
            case 2:
                return selectedTopics.length === 0;
            case 3:
                return !groupTitle || !groupDescription;
            case 4:
                return isPrivate === null;
            default:
                return false;
        }
    };

    return (
        <View style={styles.fullFlex}>
            <CreateHeader onPress={handleBackPress} progress={step}/>
            <ScrollView>
                <View style={styles.overallContainer}>
                    <View style={styles.mainContainer}>
                        {step === 0 && <IntroStep 
                                            onPress={handleNext}
                                            onSkipPress={handleBackPress}/>}
                        {step === 1 && <CreateGroupStepOne 
                                            fullName={fullName} 
                                            setFullName={setFullName} />}
                        {step === 2 && <CreateGroupStepTwo 
                                            presetTopics={presetTopics} 
                                            setPresetTopics={setPresetTopics} 
                                            selectedTopics={selectedTopics} 
                                            setSelectedTopics={setSelectedTopics} />}
                        {step === 3 && <CreateGroupStepThree 
                                            groupTitle={groupTitle} 
                                            setGroupTitle={setGroupTitle} 
                                            groupDescription={groupDescription} 
                                            setGroupDescription={setGroupDescription} />}
                        {step === 4 && <CreateGroupStepFour
                                            boolValue={isPrivate}
                                            setBoolValue={setIsPrivate}
                                            image={image}
                                            setImage={setImage}
                                            imageName={imageName}
                                            setImageName={setImageName}
                                            imageSize={imageSize}
                                            setImageSize={setImageSize}
                                            deleteImage={deleteImage} />}
                        {step === 5 && <FinishStep 
                                            onPress={handleNext}
                                            groupTitle={groupTitle} />}
                                            

                        {step > 0 && step < 5 &&
                            <View style={styles.mainButtonContainer}>
                                <CustomButton size="normalSize" coloring="defaultColoring" onPress={handleNext} isDisabled={disableNextPage()}>
                                    {step < 4 ? 'Proceed' : 'Complete'}
                                </CustomButton>
                            </View>
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
        
    )
}

const styles = StyleSheet.create({
    fullFlex: {
        flex: 1,
        backgroundColor: Colors.colorWhite,
    },

    overallContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.colorWhite,
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 100,
    },

    mainContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 32,
        borderWidth: 1,
        borderColor: Colors.colorGrayFour,
        borderRadius: 8,
        paddingVertical: 32,
        paddingHorizontal: 24,
    },

    mainButtonContainer: {
        width: '100%',
        gap: 24,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    childContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 24,
    },

    childContainerText: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 8,
    },

    childContainerForm: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 16,
    },

    MainTextTitle: {
        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'GTWalsheimProMedium',
        color: Colors.colorTextInput,
        lineHeight: 22.5,
        letterSpacing: -0.36,
    },

    MainTextSub: {
        fontSize: 14,
        fontWeight: '400',
        color: Colors.colorGrayTwo,
        lineHeight: 18.9,
        letterSpacing: -0.28,
    },

    tro: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
    },

    troContent: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
    },

    troImage: {
        width: 180,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },

    troTexts: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },

    troButton: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },

    TroTextTitle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'GTWalsheimProMedium',
        color: Colors.colorTextInput,
        lineHeight: 22.5,
        letterSpacing: -0.36,
    },

    TroTextSub: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '400',
        color: Colors.colorGrayTwo,
        lineHeight: 18.9,
        letterSpacing: -0.28,
    },
})

export default creategroup
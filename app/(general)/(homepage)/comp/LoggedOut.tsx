import { AppText } from '@/Components/Utility/AppText';
import { View, Text, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { router } from 'expo-router';
import CustomButton from '@/Components/Utility/CustomButton';
import HorizontalDeck from '@/app/(general)/(homepage)/comp/HorizontalDeck';
import WorkCard from '@/app/(general)/(homepage)/comp/WorkCard';
import { ThemeColors } from '@/constants/Theme';
import { useTheme } from '@/context/ThemeContext';


interface Styles {
    heroContainer: ViewStyle;
    heroContainerText: ViewStyle;
    heroButtons: ViewStyle;
    heroImages: ViewStyle;
    heroImageOne: ImageStyle;
    heroImageTwo: ImageStyle;
    howItWorks: ViewStyle;
    howItWorksText: ViewStyle;
    howItWorksCards: ViewStyle;
    createGroupHero: ViewStyle;
    createGroupHeroTop: ViewStyle;
    taglineAndSlogan: ViewStyle;
    numberOne: TextStyle;
    tagLine: TextStyle;
    italicNantes: TextStyle;
    textGreen: TextStyle;
    slogan: TextStyle;
    howItWorksDescription: TextStyle;
}

const createStyles = (colors: ThemeColors): Styles => ({
    heroContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundColor,
        paddingHorizontal: 24,
        paddingTop: 48.5,
        paddingBottom: 56.5,
        gap: 28,
    },

    heroContainerText: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },

    numberOne: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 18.9,
        letterSpacing: -0.42,
        color: colors.textColor,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderColor: colors.borderColor,
        borderWidth: 1,
    },

    taglineAndSlogan: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },

    tagLine: {
        fontFamily: 'GTWalsheimProMedium',
        fontSize: 40,
        fontWeight: '500',
        lineHeight: 44,
        letterSpacing: -0.8,
        color: colors.textColor,
        textAlign: 'center',
    },

    slogan: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 18.9,
        letterSpacing: -0.28,
        color: colors.textColor,
        textAlign: 'center',
    },

    textGreen: {
        color: colors.mainColor,
    },

    italicNantes: {
        fontFamily: 'NantesBoldItalic',
    },

    heroButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18,
    },

    heroImages: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        height: 224,
        overflow: 'hidden',
        backgroundColor: colors.backgroundColor,
    },

    heroImageOne: {
        position: 'absolute',
        top: 0,
        left: -44,
        width: 290,
        height: 290,
        borderRadius: 1000,
    },

    heroImageTwo: {
        position: 'absolute',
        top: 0,
        right: -43.25,
        width: 280,
        height: 280,
        borderRadius: 1000,
    },

    howItWorks: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundColor,
        paddingHorizontal: 24,
        paddingVertical: 60,
        gap: 40,
    },

    howItWorksText: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },

    howItWorksDescription: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 18.9,
        letterSpacing: -0.28,
        color: colors.textColor,
        textAlign: 'center',
    },

    howItWorksCards: {
        alignItems: 'center',
        gap: 24,
        width: '100%',
    },

    createGroupHero: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundColor,
        paddingVertical: 60,
        gap: 40,
    },

    createGroupHeroTop: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        paddingHorizontal: 24,
    },
});

const LoggedOutPage: React.FC = () => {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <View> 
            <View style={styles.heroContainer}>
                <View style={styles.heroContainerText}>
                    <AppText style={styles.numberOne}>Your number one community 🥇</AppText>
                    <View style={styles.taglineAndSlogan}>
                        <Text style={styles.tagLine}>Discover, Connect {'\n'} and Thrive <Text style={styles.italicNantes}>with</Text> {'\n'} <Text style={styles.textGreen}>Clubbera</Text></Text>
                        <AppText style={styles.slogan}>Connecting people with local communities</AppText>
                    </View>
                </View>
                <View style={styles.heroButtons}>
                    <CustomButton onPress={() => router.push("/(auth)/signup")} size="normalSize" coloring="defaultColoring">Join Clubbera</CustomButton>
                </View>
            </View>
            <View style={styles.heroImages}>
                <Image style={styles.heroImageOne} source={require('@/assets/homepage/basketball.jpg')} />
                <Image style={styles.heroImageTwo} source={require('@/assets/homepage/yoga.jpg')} />
            </View>
            <View style={styles.howItWorks}>
                <View style={styles.howItWorksText}>
                    <Text style={styles.tagLine}>How Clubbera {'\n'} <Text style={styles.italicNantes}>works</Text></Text>
                    <AppText style={styles.howItWorksDescription}>Ready to break free from the virtual world and make some real-life connections? Clubbera is here to help you do just that! Our platform is all about bringing people together through shared interests and unforgettable experiences.</AppText>
                </View>
                <View style={styles.howItWorksCards}>
                    <WorkCard
                        image={require('@/assets/homepage/explore.jpg')}
                        title='Discover Communities & Events'
                        description="Start exploring the amazing communities and events on Clubbera. Search for keywords that match your interests, or browse through our curated categories. From hiking adventures to cooking classes, there's something for everyone!"/>

                    <WorkCard
                        image={require('@/assets/homepage/attend.jpg')}
                        title='Attend Events & Make Connections'
                        description="Now for the fun part – attending events and meeting new people! Clubbera events are all about forming genuine connections through shared experiences. So go ahead, strike up a conversation, and let the good times roll!"/>

                    <WorkCard
                        image={require('@/assets/homepage/create.jpg')}
                        title='Create Your Own Community or Event'
                        description="Can't find a community or event that matches your interests? No problem – create your own! It's completely free to start a new community on Clubbera. Plus, you'll have the satisfaction of bringing people together and watching your community grow."/>
                </View>
            </View>
            <View style={styles.createGroupHero}>
                <View style={styles.createGroupHeroTop}>
                    <View style={styles.taglineAndSlogan}>
                        <Text style={styles.tagLine}>Create Your <Text style={styles.italicNantes}>Free </Text>Community Today!</Text>
                        <AppText style={styles.slogan}>Ready to bring people together around what matters to you? Create your own community on Clubbera for free and start building your tribe today!</AppText>
                    </View>
                    <CustomButton onPress={() => router.push("/(auth)/signup")} size="normalSize" coloring="defaultColoring">Start creating</CustomButton>
                </View>
                
                <HorizontalDeck/>
            </View>
        </View>
    );
};

export default LoggedOutPage;
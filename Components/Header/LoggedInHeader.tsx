import { View, ViewStyle, Image, ImageStyle, TouchableWithoutFeedback } from 'react-native';
import NavigationMenu from '@/Components/Header/NavigationMenu';
import { ThemeColors } from '@/constants/Theme';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { useState } from 'react';


interface Styles {
    container: ViewStyle;
    headerContainer: ViewStyle;
    btnPad: ViewStyle;
    headerItems: ViewStyle;
    profileImage: ImageStyle;
}

const createStyles = (colors: ThemeColors): Styles => ({
    container: {
        backgroundColor: colors.backgroundColor,
    },

    headerContainer: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
    },

    btnPad: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerItems: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },

    profileImage: {
        width: 32,
        height: 32,
        borderRadius: 100,
    },
})

const LoggedInHeader: React.FC = () => {
    const { user } = useUser();
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const [showSearch, setShowSearch] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const toggleSearch = () => {
        setShowSearch((prev) => !prev);
    }

    const openMenu = () => {
        setShowMenu((prev) => !prev);
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableWithoutFeedback onPress={openMenu}>
                    <View style={styles.btnPad}>
                        <Feather name="menu" size={24} color={colors.textColor}/>
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.headerItems}>
                    <TouchableWithoutFeedback onPress={toggleSearch}>
                        <View style={styles.btnPad}>
                            <AntDesign name="search1" size={22} color={colors.textColor} />
                        </View>
                    </TouchableWithoutFeedback>

                    <Image style={styles.profileImage} source={user.avatar ? { uri: user.avatar } : require('@/assets/images/profile.png')} />
                </View>
            </View>
            {
                showSearch && (
                    <View style={styles.headerContainer}>
                        {/* search goes here */}
                    </View>
                )
            }

            <NavigationMenu isVisible={showMenu} onClose={openMenu} />
        </View>
    )
}

export default LoggedInHeader
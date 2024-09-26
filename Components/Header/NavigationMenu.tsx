import { useRef, useEffect } from 'react';
import { AppText } from '@/Components/Utility/AppText';
import { View, Text, Image, Dimensions, Animated, TouchableWithoutFeedback, TextStyle, ViewStyle, ImageStyle } from 'react-native';
import { router } from 'expo-router';
import { ThemeColors } from '@/constants/Theme';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';


const screenWidth = Dimensions.get('window').width;


interface NavigationMenuProps {
    isVisible: boolean;
    onClose: () => void;
};

interface Styles {
    overlay: ViewStyle;
    overlayBackground: ViewStyle;
    menuContainer: ViewStyle;
    menuHeader: ViewStyle;
    menuHeaderButton: ViewStyle;
    menuUserProfile: ViewStyle;
    menuUserProfileImage: ImageStyle;
    menuUserProfileName: TextStyle;
    menuContent: ViewStyle;
    menuItems: ViewStyle;
    menuItem: ViewStyle;
    menuItemMain: ViewStyle;
    menuItemMainIcon: ImageStyle;
    menuItemText: TextStyle;
};

const createStyles = (colors: ThemeColors): Styles => ({
    overlay: {
        position: 'relative',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },

    overlayBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    menuContainer: {
        width: '100%',
        height: '100%',
        maxWidth: 450,
        backgroundColor: colors.backgroundColor,
        paddingVertical: 16,
        paddingHorizontal: 24,
        gap: 36,
    },

    menuHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    menuHeaderButton: {
        width: 36,
        height: 36,
        borderRadius: 8,
        borderColor: colors.textColor,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    menuUserProfile: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },

    menuUserProfileImage: {
        width: 120,
        height: 120,
        borderRadius: 1000,
    },

    menuUserProfileName: {
        fontSize: 18,
        color: colors.textColor,
        fontWeight: '500',
    },

    menuContent: {
        flex: 1,
    },

    menuItems: {
        gap: 16,
    },

    menuItem: {
        height: 36,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    menuItemMain: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    menuItemMainIcon: {
        width: 32,
        height: 32,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    menuItemText: {
        fontSize: 16,
        color: colors.textColor,
    },
});


const NavigationMenu: React.FC<NavigationMenuProps> = ({ isVisible, onClose }) => {
    const { user } = useUser();
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const translateX = useRef(new Animated.Value(-screenWidth)).current;

    useEffect(() => {
        if (isVisible) {
            Animated.timing(translateX, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(translateX, {
                toValue: -screenWidth,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible]);

    return isVisible ? (
        <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlayBackground} />
            </TouchableWithoutFeedback>

            <Animated.View style={[styles.menuContainer, { transform: [{ translateX }] }]}>
                <View style={styles.menuHeader}>
                    <TouchableWithoutFeedback onPress={onClose}>
                        <View style={styles.menuHeaderButton}>
                            <Ionicons name="chevron-back-outline" size={18} color={colors.textColor} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={styles.menuUserProfile}>
                    <Image style={styles.menuUserProfileImage} source={user.avatar ? { uri: user.avatar } : require('@/assets/images/profile.png')} />

                    <View>
                        <AppText style={styles.menuUserProfileName}>{user.full_name}</AppText>
                    </View>
                </View>

                <View style={styles.menuContent}>
                    <View style={styles.menuItems}>
                        {/* Home */}
                        <TouchableWithoutFeedback onPress={() => router.push("/")}>
                            <View style={styles.menuItem}>
                                <View style={styles.menuItemMain}>
                                    <View style={styles.menuItemMainIcon}>
                                        <Feather name="home" size={16} color={colors.textColor} />
                                    </View>
                                    <AppText style={styles.menuItemText}>Home</AppText>
                                </View>

                                <Ionicons name="chevron-forward-outline" size={16} color={colors.textColor} />
                            </View>
                        </TouchableWithoutFeedback>

                        {/* Profile */}
                        <TouchableWithoutFeedback onPress={() => router.push("/profile")}>
                            <View style={styles.menuItem}>
                                <View style={styles.menuItemMain}>
                                    <View style={styles.menuItemMainIcon}>
                                        <Ionicons name="person-outline" size={16} color={colors.textColor} />
                                    </View>
                                    <AppText style={styles.menuItemText}>View profile</AppText>
                                </View>

                                <Ionicons name="chevron-forward-outline" size={16} color={colors.textColor} />
                            </View>
                        </TouchableWithoutFeedback>

                        {/* Manage Communities */}
                        <View style={styles.menuItem}>
                            <View style={styles.menuItemMain}>
                                <View style={styles.menuItemMainIcon}>
                                    <AntDesign name="addusergroup" size={16} color={colors.textColor} />
                                </View>
                                <AppText style={styles.menuItemText}>Manage communities</AppText>
                            </View>

                            <Ionicons name="chevron-forward-outline" size={16} color={colors.textColor} />
                        </View>

                        {/* Your Communities */}
                        <View style={styles.menuItem}>
                            <View style={styles.menuItemMain}>
                                <View style={styles.menuItemMainIcon}>
                                <MaterialCommunityIcons name="account-group-outline" size={16} color={colors.textColor} />
                                </View>
                                <AppText style={styles.menuItemText}>Your communities</AppText>
                            </View>

                            <Ionicons name="chevron-forward-outline" size={16} color={colors.textColor} />
                        </View>

                        {/* Logout */}
                        <View style={styles.menuItem}>
                            <View style={styles.menuItemMain}>
                                <View style={styles.menuItemMainIcon}>
                                    <MaterialIcons name="logout" size={16} color={colors.textColor} />
                                </View>
                                <AppText style={styles.menuItemText}>Logout</AppText>
                            </View>

                            {/* <Ionicons name="chevron-forward-outline" size={16} color={colors.textColor} /> */}
                        </View>
                    </View>
                </View>
            </Animated.View>
        </View>
    ) : null;
};

export default NavigationMenu;

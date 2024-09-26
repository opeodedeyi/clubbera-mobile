import { ColorSchemeName } from 'react-native';

const commonColors = {
    mainColor: '#228B22',
    mainColorCard: '#1E7B1D',
    mainColorHover: '#196B18',
    mainColorDark: '#034703',
    mainColorGlow: '#A5E2AB',
    mainColorLight: '#D1FFD9',
    mainColorTip: '#EEFAEE',
    mainColorCardDanger: '#D03C38',
    mainColorTipDanger: 'rgba(208, 60, 56, 0.06)',
    mainColorCardMild: '#773800',
    mainColorTipMild: '#FFF6EE',
    mainColorCardCalm: '#003581',
    mainColorTipCalm: '#EEF5FF',
    colorWhite: '#F0F3F5',
};

const lightColors = {
    ...commonColors,
    backgroundColor: '#FFFFFF',
    backgroundColorHover: '#F4F4F4',
    borderColor: '#F4F4F4',
    borderColorBright: 'rgba(202, 201, 201, 0.10)',
    borderShadow: 'rgba(235, 235, 235, 0.25)',
    textColor: '#777474',
    textColorSecondary: '#241F1F',
    textColorAlternate: '#8C8A8A',
    textColorSub: '#4D4A4A',
    placeholder: '#A19F9F',
    brightColorBackground: '#F4F4F4',
    brightColorText: '#DEDEDE',
    brightColorTextSecondary: '#F4F4F4',
    reactiveBrandColor: '#228B22',
    reactiveBrandAlternate: '#228B22',
    colorOnBrand: '#F0F3F5',
    svgSubColor: '#4D4A4A',
};

const darkColors = {
    ...commonColors,
    backgroundColor: '#020900',
    backgroundColorHover: '#030D00',
    borderColor: '#212923',
    borderColorBright: 'rgba(202, 201, 201, 0.05)',
    borderShadow: 'rgba(17, 1, 1, 0.25)',
    textColor: '#B4C2B7',
    textColorSecondary: '#DEF3E2',
    textColorAlternate: '#BECCC1',
    placeholder: '#9EAEA2',
    brightColorText: '#B4C2B7',
    brightColorTextSecondary: '#DEF3E2',
    reactiveBrandColor: '#030B01',
    reactiveBrandAlternate: '#D1FFD9',
    mainColor: '#196B18',
    mainColorCard: '#1E7B1D',
    mainColorHover: '#228B22',
};

export type ThemeColors = typeof lightColors;

export const getThemeColors = (colorScheme: ColorSchemeName): ThemeColors => {
    return colorScheme === 'dark' ? darkColors as ThemeColors : lightColors;
};
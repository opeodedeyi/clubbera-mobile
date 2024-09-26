import * as SecureStore from 'expo-secure-store';

export async function saveAuthToken(token: string) {
    await SecureStore.setItemAsync('userToken', token);
}

export async function getAuthToken() {
    return SecureStore.getItemAsync('userToken');
}

export async function deleteToken(tokenName: string) {
    return SecureStore.deleteItemAsync(tokenName);
}
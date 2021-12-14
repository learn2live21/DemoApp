import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
    webClientId:
        '534884668940-5ss1rjfiatqg5ekgu9u696q6rb9og0ni.apps.googleusercontent.com',
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});
export const GetCurrentUserInfo = async () => {
    try {
        let userInfo;
        await GoogleSignin.hasPlayServices();
        userInfo = await GoogleSignin.signIn();
        let userdata = userInfo.user;
        const jsonValue = JSON.stringify(userdata);
        AsyncStorage.setItem('UserData', jsonValue);
        return userdata;
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
            ToastAndroid.show('User has not signed in yet', ToastAndroid.LONG);
        } else {
            ToastAndroid.show("Something went wrong. Unable to get user's info", ToastAndroid.LONG);
        }
    }
};

export async function GetUserData() {
    try {
        const jsonValue = await AsyncStorage.getItem('UserData');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}

export async function LogOutUser() {
    try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        ToastAndroid.show('Logged Out Successfully ', ToastAndroid.LONG);
        await AsyncStorage.removeItem('UserData');
        await AsyncStorage.clear();
    } catch (err) {
        ToastAndroid.show('Unable to Log out', ToastAndroid.LONG);
    }
}
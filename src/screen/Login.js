import React from 'react';
import { View, Text } from 'react-native';

import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { getCurrentUserInfo, getUserData } from '../api/service';
// import auth from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database';
GoogleSignin.configure({
    webClientId:
        '534884668940-5ss1rjfiatqg5ekgu9u696q6rb9og0ni.apps.googleusercontent.com',
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});

const Login = (props) => {
    const signIn = async () => {
        try {
            // await GoogleSignin.hasPlayServices();
            // const userInfo = await GoogleSignin.signIn();
            // const googleCredential = auth.GoogleAuthProvider.credential(
            //     userInfo.idToken,
            // );
            // await auth().signInWithCredential(googleCredential);
            // let data = await UserAdd(userInfo.user, selectedUser);
            let data = await getUserData();
            if (data === undefined)
                data = getCurrentUserInfo();
            // console.log(userInfo)
            console.log('data', data)
            props.navigation.navigate('Home')
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
                disabled={false}
            />
        </View>
    );
};

const gmailLoginHandler = async () => {
    try {
        const userInfo = await getCurrentUserInfo(selectedUser);
        if (userInfo && userInfo.userExists && !(userInfo.userType === selectedUser)) {
            ToastAndroid.show(
                'You are already registered as ' +
                userInfo.userType +
                '  Please select a different email id',
                ToastAndroid.LONG,
            );
            await signOut();
            return false;
        }
        if (userInfo && !userInfo.userExists) {
            props.navigation.navigate('Register', {
                user: selectedUser,
                // userId: userInfo.userId,
            });
        } else if (userInfo && userInfo.userExists) {
            props.navigation.navigate(selectedUser);
        }
    } catch (error) { }
};

export default Login;

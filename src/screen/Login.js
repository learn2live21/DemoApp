import React from 'react';
import { View, Text } from 'react-native';

import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { GetCurrentUserInfo, GetUserData } from '../api/service';
// import auth from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database';


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
            let data = await GetUserData();
            if (data === undefined || data === null)
                data = await GetCurrentUserInfo();
            if (data)
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

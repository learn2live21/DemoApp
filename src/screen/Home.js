import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GetUserData, LogOutUser } from '../api/service';

const Home = (props) => {
    const userinfo = GetUserData()

    const logout = async () => {
        try {
            await LogOutUser()
            props.navigation.navigate('Login')
        } catch (error) {
            console.log(error)
        }
    }
    console.log(userinfo)
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>WELCOME {userinfo.id}</Text>
            <TouchableOpacity onPress={logout} style={{ backgroundColor: '#ccc', padding: 15, marginVertical: 35 }}><Text style={{ fontSize: 20 }}>LOGOUT</Text></TouchableOpacity>
        </View>
    );
};

export default Home;

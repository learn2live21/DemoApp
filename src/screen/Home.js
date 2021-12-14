import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getUserData, LogOutUser } from '../api/service';

const Home = (props) => {
    const userinfo = getUserData()

    const logout = async () => {
        await LogOutUser()
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

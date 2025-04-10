import 'react-native-gesture-handler'
import { Drawer } from "expo-router/drawer";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import GroupSelection from "../Components/GroupSelection";
import { TouchableOpacity, View, Text, Button } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import { supabase } from '../Utils/supabase';

export default function HomeDrawerLayout() {
    const { user } = useContext(UserContext)

    async function signOut() {
        await supabase.auth.signOut()
        router.replace('/(Pages)/Auth')
    }
    function CustomDrawer(props: any) {
        console.log('user data')
        console.log(user)

        return (
            <DrawerContentScrollView {...props}>
                <GroupSelection />
                {user?.username &&
                    <View style={{ padding: 20 }}>
                        <TouchableOpacity style={{ gap: 5 }}>
                            <Text>User:</Text>
                            <Text>{user?.username}</Text>
                        </TouchableOpacity>
                    </View>}
                <View style={{ padding: 5 }}>
                    <DrawerItemList {...props} />
                </View>
                <Button onPress={signOut} title='Sign Out' />
            </DrawerContentScrollView>
        );
    };
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer drawerContent={CustomDrawer}>
                <Drawer.Screen name="(ExpenseTab)" options={{
                    drawerLabel: 'Expenses',
                    headerTitle: 'Expenses',
                }} />
            </Drawer>
        </GestureHandlerRootView>
    );
}
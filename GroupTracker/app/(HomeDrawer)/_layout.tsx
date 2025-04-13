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
import { COLORS } from '../Globals/GlobalConstants';

export default function HomeDrawerLayout() {
    const { user } = useContext(UserContext)

    function manageGroupPress() {
        router.navigate("/(HomeDrawer)/(GroupsTab)/InviteGroup")
    }

    async function signOut() {
        await supabase.auth.signOut()
        router.replace('/(Pages)/Auth')
    }
    function CustomDrawer(props: any) {
        console.log('user data')
        console.log(user)

        return (
            <DrawerContentScrollView {...props}>
                <View style={{ gap: 20, paddingTop: 20 }}>
                    {user?.username &&
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20 }}>{user?.username}</Text>
                        </View>}
                    <GroupSelection />
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 10
                        }}
                        onPress={manageGroupPress}
                    >
                        <Text>Manage Groups</Text>
                    </TouchableOpacity>
                    {/* hide drawer items
                <View style={{ padding: 5 }}>
                    <DrawerItemList {...props} />
                </View> */}
                    <TouchableOpacity style={{
                        padding: 10,
                        borderRadius: 10,
                        backgroundColor: COLORS.RED,
                        alignItems: 'center'
                    }} onPress={signOut}>
                        <Text>Sign Out</Text>
                    </TouchableOpacity>
                </View>
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
                <Drawer.Screen name="(GroupsTab)" options={{
                    drawerLabel: 'Groups',
                    headerTitle: 'Groups',
                }} />
            </Drawer>
        </GestureHandlerRootView>
    );
}
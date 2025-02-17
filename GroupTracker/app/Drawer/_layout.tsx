import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Expense from './Expense';
import { Text, TouchableOpacity, View } from 'react-native';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import GroupSelection from '../Components/GroupSelection';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
    const { user } = useContext(UserContext)

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
            </DrawerContentScrollView>
        );
    };


    return (
        <Drawer.Navigator initialRouteName='Expense' drawerContent={props => <CustomDrawer {...props} />}>
            <Drawer.Screen name="Expense" component={Expense} />
        </Drawer.Navigator>
    );
}
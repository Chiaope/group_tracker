import Icon from 'react-native-vector-icons/FontAwesome6';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function ExpenseTabLayout() {
    return <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name='InviteGroup' options={{
            tabBarIcon: () => {
                return <View style={{ flex: 1 }}>
                    <Icon name='envelope-open-text' size={25} />
                </View>
            },
            tabBarLabel: 'Invite'
        }} />
        <Tabs.Screen name='JoinGroup' options={{
            tabBarIcon: () => {
                return <View style={{ flex: 1 }}>
                    <Icon name='people-line' size={25} />
                </View>
            },
            tabBarLabel: 'Join'
        }} />
    </Tabs>
}
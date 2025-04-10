import Icon from 'react-native-vector-icons/FontAwesome6';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function ExpenseTabLayout(){
    return <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name='ExpensePage' options={{
            tabBarIcon: () => {
                return <View style={{flex:1}}>
                <Icon name='money-bill' size={25}/>
            </View>
            },
            tabBarLabel: 'Expense'
        }}/>
        <Tabs.Screen name='ScheduledExpensePage' options={{
            tabBarIcon: () => {
                return <View style={{flex:1}}>
                <Icon name='money-bill-transfer' size={25}/>
            </View>
            },
            tabBarLabel: 'Scheduled Expense'
        }}/>
    </Tabs>
}
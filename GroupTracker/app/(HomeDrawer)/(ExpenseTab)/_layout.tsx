import Icon from 'react-native-vector-icons/FontAwesome6';
import { Tabs } from 'expo-router';

export default function ExpenseTabLayout(){
    return <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name='ExpensePage' options={{
            tabBarIcon: () => {
                return <Icon name='money-bills'/>
            },
            tabBarLabel: 'Expense'
        }}/>
        <Tabs.Screen name='ScheduledExpensePage' options={{
            tabBarIcon: () => {
                return <Icon name='money-bill-transfer'/>
            },
            tabBarLabel: 'Scheduled Expense'
        }}/>
    </Tabs>
}
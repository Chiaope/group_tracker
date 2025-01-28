import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExpensePage from '../Pages/ExpensePage';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { View } from 'react-native';
import ScheduledExpensePage from '../Pages/ScheduledExpensePage';

const ExpenseTabs = createBottomTabNavigator();

export default function MyExpenseTabs() {
    return (
        <ExpenseTabs.Navigator initialRouteName='Expenses' screenOptions={{ headerShown: false }}>
            <ExpenseTabs.Screen
                name="Expenses"
                component={ExpensePage}
                options={{
                    tabBarIcon: () => {
                        return <View style={{flex:1}}>
                            <Icon name='money-bills' size={25}/>
                        </View>
                    },
                }} />
                <ExpenseTabs.Screen
                name="Scheduled Expenses"
                component={ScheduledExpensePage}
                options={{
                    tabBarIcon: () => {
                        return <View style={{flex:1}}>
                            <Icon name='money-bill-transfer' size={25}/>
                        </View>
                    },
                }} />
        </ExpenseTabs.Navigator>
    );
}
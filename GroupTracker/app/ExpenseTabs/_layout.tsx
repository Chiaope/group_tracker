import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExpensePage from '../Pages/ExpensePage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';
import { Text } from 'react-native';

const ExpenseTabs = createBottomTabNavigator();

export default function MyExpenseTabs() {
    return (
        <ExpenseTabs.Navigator initialRouteName='Expense' screenOptions={{ headerShown: false }}>
            <ExpenseTabs.Screen
                name="Expense"
                component={ExpensePage}
                options={{
                    tabBarIcon: () => {
                        return <View style={{flex:1}}>
                            <Icon name='list-alt' size={25}/>
                        </View>
                    },
                }} />
        </ExpenseTabs.Navigator>
    );
}
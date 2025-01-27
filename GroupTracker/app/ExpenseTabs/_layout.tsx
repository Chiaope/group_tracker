import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExpensePage from '../Pages/ExpensePage';

const ExpenseTabs = createBottomTabNavigator();

export default function MyExpenseTabs() {
    return (
        <ExpenseTabs.Navigator initialRouteName='Home'>
            <ExpenseTabs.Screen name="Home" component={ExpensePage} />
        </ExpenseTabs.Navigator>
    );
}
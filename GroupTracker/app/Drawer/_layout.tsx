import { createDrawerNavigator } from '@react-navigation/drawer';
import ExpensesPage from './expense';
import Index from '.';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
    return (
        <Drawer.Navigator initialRouteName='Home'>
            <Drawer.Screen name="Home" component={Index} />
            <Drawer.Screen name="Expense" component={ExpensesPage} />
        </Drawer.Navigator>
    );
}
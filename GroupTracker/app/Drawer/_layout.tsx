import { createDrawerNavigator } from '@react-navigation/drawer';
import Expense from './Expense';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
    return (
        <Drawer.Navigator initialRouteName='Expense'>
            <Drawer.Screen name="Expense" component={Expense} />
        </Drawer.Navigator>
    );
}
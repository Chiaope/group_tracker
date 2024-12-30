import { createDrawerNavigator } from '@react-navigation/drawer';
// import TodoPage from './todo';
import Home from './Home';
import Expense from './Expense';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
    return (
        <Drawer.Navigator initialRouteName='Home'>
            <Drawer.Screen name="Home" component={Home} />
            {/* <Drawer.Screen name="Todo" component={TodoPage} /> */}
            <Drawer.Screen name="Expense" component={Expense} />
        </Drawer.Navigator>
    );
}
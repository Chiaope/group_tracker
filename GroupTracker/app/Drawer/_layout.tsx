import { createDrawerNavigator } from '@react-navigation/drawer';
import TodoPage from './todo';
import Index from '.';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
    return (
        <Drawer.Navigator initialRouteName='Home'>
            <Drawer.Screen name="Home" component={Index} />
            <Drawer.Screen name="Todo" component={TodoPage} />
        </Drawer.Navigator>
    );
}
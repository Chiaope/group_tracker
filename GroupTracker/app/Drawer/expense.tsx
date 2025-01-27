import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExpensePage from "@/app/Pages/ExpensePage";
import ExpenseForm from "@/app/Pages/ExpenseForm";

const Stack = createNativeStackNavigator();

export default function Expense() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Expense Page" component={ExpensePage} />
            <Stack.Screen name="Expense Form" component={ExpenseForm} />
        </Stack.Navigator>
    )
}
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExpensePage from "@/app/Components/ExpensePage";
import ExpenseForm from "@/app/Components/ExpenseForm";

const Stack = createNativeStackNavigator();

export default function Expense() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Expense" component={ExpensePage} />
            <Stack.Screen name="Expense Form" component={ExpenseForm} />
        </Stack.Navigator>
    )
}
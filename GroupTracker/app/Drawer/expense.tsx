import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExpenseForm from "@/app/Pages/ExpenseForm";
import MyExpenseTabs from "../ExpenseTabs/_layout";
import ScheduleExpenseForm from "../Pages/ScheduleExpenseForm";

const Stack = createNativeStackNavigator();

export default function Expense() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Expense Page" component={MyExpenseTabs} />
            <Stack.Screen name="Expense Form" component={ExpenseForm} />
            <Stack.Screen name="Schedule Expense Form" component={ScheduleExpenseForm} />
        </Stack.Navigator>
    )
}
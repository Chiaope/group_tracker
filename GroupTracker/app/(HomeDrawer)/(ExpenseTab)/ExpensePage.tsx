import { Button, FlatList, View, Text, RefreshControl, TouchableOpacity, ActivityIndicator } from "react-native"
import { useDeleteExpense, useGetAllExpense } from "@/app/Services/ExpenseServices"
import { useCallback, useContext, useEffect, useState } from "react"
import Icon from 'react-native-vector-icons/FontAwesome';
import { UserContext } from "@/app/Context/UserContext";
import { useShowToast } from "@/app/Components/CustomToast";
import ExpenseListItem from "@/app/Components/ExpenseListItem";
import { router, useFocusEffect } from "expo-router";
import { COLORS } from "@/app/Globals/GlobalConstants";

export default function ExpensePage() {
    console.log("~~~~~ Expense Page ~~~~~")
    const { user } = useContext(UserContext)
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const getAllExpenseService = useGetAllExpense()
    const deleteExpenseService = useDeleteExpense()
    const toast = useShowToast()
    const [addedExpense, setAddedExpense] = useState(false)

    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short" };
    let formattedDate = new Intl.DateTimeFormat('en-US', options).format(selectedDate);

    useFocusEffect(useCallback(() => {
        let refDate = new Date(selectedDate)
        let startDate = new Date(refDate.setDate(1))
        let endDate = new Date(refDate.setFullYear(refDate.getFullYear(), refDate.getMonth() + 1, 1))
        getAllExpenseService.getAllExpense(user.selectedGroup, startDate, endDate)
    }, [user]))

    useEffect(() => {
        let refDate = new Date(selectedDate)
        let startDate = new Date(refDate.setDate(1))
        let endDate = new Date(refDate.setFullYear(refDate.getFullYear(), refDate.getMonth() + 1, 1))
        getAllExpenseService.getAllExpense(user.selectedGroup, startDate, endDate)
        console.log('running use effect')
    }, [deleteExpenseService.deleted, selectedDate, addedExpense, user.selectedGroup])


    useEffect(() => {
        if (!deleteExpenseService.loading) {
            console.log('Delete expense loading')
            if (deleteExpenseService.error) {
                console.log(deleteExpenseService.error)
                toast.showToast("error", "Failed to delete expense.")
            } else {
                if (deleteExpenseService.deleted) {
                    console.log('Deleted successfully')
                    toast.showToast("success", "Successfully deleted expense.")
                }
            }
        }
    }, [deleteExpenseService.loading, deleteExpenseService.deleted, deleteExpenseService.error])

    function onRefresh() {
        let refDate = new Date(selectedDate)
        let startDate = new Date(refDate.setDate(1))
        let endDate = new Date(refDate.setFullYear(refDate.getFullYear(), refDate.getMonth() + 1, 1))
        getAllExpenseService.getAllExpense(user.selectedGroup, startDate, endDate)
    }


    const deleteFunction = useCallback(async (id: number) => {
        await deleteExpenseService.deleteExpense(id)
    }, []);


    function addButtonPressed() {
        console.log('add button pressed')
        setAddedExpense(false)
        router.navigate("/(Pages)/ExpenseForm")
        
    }

    function prevMonthPressed() {
        const updatedDate = new Date(selectedDate.setMonth(selectedDate.getMonth() - 1))
        setSelectedDate(updatedDate)
    }

    function nextMonthPressed() {
        const updatedDate = new Date(selectedDate.setMonth(selectedDate.getMonth() + 1))
        setSelectedDate(updatedDate)
    }

    let totalSpent = getAllExpenseService.allExpense.reduce((accumulator, current) => accumulator + current.amount_cents, 0)

    if (getAllExpenseService.error) {
        console.log('Error getting all expense:')
        console.log(getAllExpenseService.error)
    }

    return (
        <>
            {getAllExpenseService.loading ? <View style={{ padding: 25, position: 'absolute', top: 0, left: 0, right: 0 }}>
                  <ActivityIndicator size="large" color={COLORS.SPINNER} />
                </View> :
                (
                    getAllExpenseService.error ?
                        <Text>{getAllExpenseService.error.error.message}</Text> :
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: "center",
                        }}>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "stretch",
                                    margin: 5,
                                    maxWidth: 500
                                }}>
                                <View style={{
                                    flexDirection: "row",
                                    gap: 5,
                                    width: "100%",
                                    justifyContent: "space-between",
                                    padding: 10
                                }}>
                                    <Text style={{ flex: 1, textAlignVertical: 'center' }}>${(totalSpent / 100).toFixed(2)}</Text>
                                    <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', flexDirection: "row", gap: 10 }}>
                                        <TouchableOpacity onPress={prevMonthPressed}><Icon name='caret-left' size={25} /></TouchableOpacity>
                                        <Text >{formattedDate}</Text>
                                        <TouchableOpacity onPress={nextMonthPressed}><Icon name='caret-right' size={25} /></TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 1, alignContent: 'center', alignItems: "flex-end" }}>
                                        <Button title="Add" onPress={addButtonPressed} />
                                    </View>
                                </View>
                                <FlatList
                                    ItemSeparatorComponent={() => <View style={{ marginBottom: 5 }} />}
                                    data={getAllExpenseService.allExpense}
                                    renderItem={({ item }) => {
                                        return <ExpenseListItem expenseData={item} deleteFunction={deleteFunction} />
                                    }}
                                    refreshControl={<RefreshControl refreshing={getAllExpenseService.loading || deleteExpenseService.loading} onRefresh={onRefresh} />}
                                />
                            </View>
                        </View>
                )
            }
        </>
    )
}
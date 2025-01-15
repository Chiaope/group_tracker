import { Button, FlatList, View, Text, RefreshControl, TouchableOpacity } from "react-native"
import ExpenseListItem from "./ExpenseListItem"
import { useDeleteExpense, useGetAllExpense } from "@/app/Services/ExpenseServices"
import { useNavigation } from "@react-navigation/native"
import { useCallback, useEffect, useState } from "react"
import { Toast, ToastDescription, ToastTitle, useToast } from "@/components/ui/toast"
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ExpensePage() {
    console.log("~~~~~ Expense Page ~~~~~")
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const getAllExpenseService = useGetAllExpense()
    const deleteExpenseService = useDeleteExpense()
    const toast = useToast()

    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short" };
    let formattedDate = new Intl.DateTimeFormat('en-US', options).format(selectedDate);

    console.log('All Expense')
    console.log(getAllExpenseService.allExpense)

    useEffect(() => {
        let refDate = new Date(selectedDate)
        let startDate = new Date(refDate.setDate(1))
        let endDate = new Date(refDate.setFullYear(refDate.getFullYear(), refDate.getMonth()+1, 0))
        getAllExpenseService.getAllExpense(startDate, endDate)
        console.log('running use effect')
    }, [deleteExpenseService.deleted, selectedDate])


    useEffect(() => {
        if (!deleteExpenseService.loading) {
            console.log('Delete loading')
            if (deleteExpenseService.error) {
                console.log(deleteExpenseService.error)
                showNewToast("error", "Failed to delete expense.")
            } else {
                if (deleteExpenseService.deleted) {
                    console.log('Deleted successfully')
                    showNewToast("success", "Successfully deleted expense.")
                }
            }
        }
    }, [deleteExpenseService.loading, deleteExpenseService.deleted, deleteExpenseService.error])

    function showNewToast(action: any, message: string) {
        const newId = Math.random().toString()
        toast.show({
            id: newId,
            placement: "top",
            duration: 3000,
            render: ({ id }) => {
                const uniqueToastId = "toast-" + id
                return (
                    <Toast nativeID={uniqueToastId} action={action} variant="solid">
                        <ToastTitle>Status:</ToastTitle>
                        <ToastDescription>
                            {message}
                        </ToastDescription>
                    </Toast>
                )
            },
        })
    }

    const onRefresh = useCallback(() => {
        getAllExpenseService.getAllExpense()
    }, []);


    const deleteFunction = useCallback(async (id: number) => {
        const deleteResponse = await deleteExpenseService.deleteExpense(id)
    }, []);


    const navigation = useNavigation<any>();

    function addButtonPressed() {
        console.log('add button pressed')
        navigation.navigate('Expense Form')
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
            {getAllExpenseService.loading ? <View>
                <Text>Loading</Text>
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
                                    <Text style={{ flex: 1, textAlignVertical: 'center' }}>${totalSpent / 100}</Text>
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
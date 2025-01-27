import { useCallback, useState } from "react"
import { supabase } from "../Utils/supabase";
import { ExpenseData } from "@/app/Components/ExpenseListItem";


const env = process.env.EXPO_PUBLIC_ENV || ""

let getAllExpenseSQLFunction: any
let insertExpenseSQLFunction: any
let deleteExpenseSQLFunction: any
let getAllScheduledExpenseSQLFunction: any
let scheduleExpenseSQLFunction: any

if (env == 'local') {
    getAllExpenseSQLFunction = 'get_all_test_expense'
    insertExpenseSQLFunction = 'fake_insert_expense'
    deleteExpenseSQLFunction = 'fake_delete_expense'
    getAllScheduledExpenseSQLFunction = 'get_all_scheduled_test_expense'
    scheduleExpenseSQLFunction = 'fake_schedule_expense'
} else {
    getAllExpenseSQLFunction = 'get_all_expense'
    insertExpenseSQLFunction = 'insert_expense'
    deleteExpenseSQLFunction = 'delete_expense'
    getAllScheduledExpenseSQLFunction = 'get_all_scheduled_expense'
    scheduleExpenseSQLFunction = 'schedule_expense'
}




function useGetAllExpense() {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)
    const [allExpense, setAllExpense] = useState<ExpenseData[]>([])

    const getAllExpense = useCallback(async function (startDate: undefined | Date = undefined, endDate: undefined | Date = undefined) {
        console.log('Get all expense')
        try {
            setLoading(true)
            setError(null)
            setAllExpense([])
            let allExpenseResponse
            if (typeof startDate != 'undefined' && typeof endDate != 'undefined') {
                let startDateStr = startDate.toISOString().split('T')[0]
                let endDateStr = endDate.toISOString().split('T')[0]
                console.log("date str info")
                console.log(startDateStr)
                console.log(endDateStr)
                allExpenseResponse = await supabase.rpc(getAllExpenseSQLFunction, { 'start_date': startDateStr, 'end_date': endDateStr })
            } else {
                console.log(getAllExpenseSQLFunction)
                allExpenseResponse = await supabase.rpc(getAllExpenseSQLFunction)
            }
            if (allExpenseResponse.error) {
                console.log('Add expense error:')
                console.log(allExpenseResponse.error.message)
                console.log(allExpenseResponse.status)
                console.log(allExpenseResponse.statusText)
                setError(
                    {
                        "error": allExpenseResponse.error,
                        "status": allExpenseResponse.status,
                        "statusText": allExpenseResponse.statusText
                    }
                )
                throw allExpenseResponse.error
            }
            setAllExpense(allExpenseResponse.data)
        } catch (error: any) { } finally {
            setLoading(false)
        }
    }, [])

    return { getAllExpense, loading, allExpense, error } as const
}

function useAddExpense() {
    const [loading, setLoading] = useState<any>(false)
    const [inserted, setInserted] = useState(false)
    const [error, setError] = useState<any>(null)

    const addExpense = useCallback(async function (expenseData: ExpenseData) {
        console.log('Add expense')
        console.log(expenseData)
        try {
            setInserted(false)
            setLoading(true)
            setError(null)
            let insertData = {
                'amount_cents_input': expenseData.amount_cents,
                'title_input': expenseData.title,
                'category_input': expenseData.category,
                'group_input': 1,
                'created_by_input': 'ME',
                'description_input': expenseData.description
            }
            const addExpenseResponse = await supabase.rpc(insertExpenseSQLFunction, insertData)
            console.log(addExpenseResponse.data)
            if (addExpenseResponse.error) {
                console.log('Add expense error:')
                console.log(addExpenseResponse.error.message)
                console.log(addExpenseResponse.status)
                console.log(addExpenseResponse.statusText)
                setError(
                    {
                        "error": addExpenseResponse.error,
                        "status": addExpenseResponse.status,
                        "statusText": addExpenseResponse.statusText
                    }
                )
                throw addExpenseResponse.error
            } else {
                setInserted(true)
            }
        } catch (error: any) { } finally {
            setLoading(false)
        }
    }, [])
    return { addExpense, loading, inserted, error } as const
}

function useDeleteExpense() {
    const [loading, setLoading] = useState<any>(false)
    const [deleted, setDeleted] = useState(false)
    const [error, setError] = useState<any>(null)

    const deleteExpense = useCallback(async function (id: number) {
        console.log('Delete expense id:')
        console.log(id)
        try {
            setDeleted(false)
            setLoading(true)
            const deleteExpenseResponse = await supabase.rpc(deleteExpenseSQLFunction, { 'expense_id': id })
            console.log(deleteExpenseResponse.data)
            if (deleteExpenseResponse.error) {
                console.log('Delete expense error:')
                console.log(deleteExpenseResponse.error.message)
                console.log(deleteExpenseResponse.status)
                console.log(deleteExpenseResponse.statusText)
                setError(
                    {
                        "error": deleteExpenseResponse.error,
                        "status": deleteExpenseResponse.status,
                        "statusText": deleteExpenseResponse.statusText
                    }
                )
                throw deleteExpenseResponse.error
            } else {
                setDeleted(true)
            }
        } catch (error: any) { } finally {
            setLoading(false)
        }
    }, [])
    return { deleteExpense, loading, deleted, error } as const
}


function useScheduleExpense() {
    const [loading, setLoading] = useState<any>(false)
    const [scheduled, setScheduled] = useState(false)
    const [error, setError] = useState<any>(null)

    const scheduleExpense = useCallback(async function (expenseData: ExpenseData, cron_input: string) {
        console.log('Schedule Expense')
        console.log(expenseData)
        console.log(cron_input)
        try {
            setScheduled(false)
            setLoading(true)
            setError(null)
            let scheduletData = {
                'cron_input': cron_input,
                'amount_cents_input': expenseData.amount_cents,
                'title_input': expenseData.title,
                'category_input': expenseData.category,
                'group_input': 1,
                'created_by_input': 'ME',
                'end_date_input': expenseData.end_date
            }
            const scheduleExpenseResponse = await supabase.rpc(scheduleExpenseSQLFunction, scheduletData)
            console.log(scheduleExpenseResponse.data)
            if (scheduleExpenseResponse.error) {
                console.log('Schedule expense error:')
                console.log(scheduleExpenseResponse.error.message)
                console.log(scheduleExpenseResponse.status)
                console.log(scheduleExpenseResponse.statusText)
                setError(
                    {
                        "error": scheduleExpenseResponse.error,
                        "status": scheduleExpenseResponse.status,
                        "statusText": scheduleExpenseResponse.statusText
                    }
                )
                throw scheduleExpenseResponse.error
            } else {
                setScheduled(true)
            }
        } catch (error: any) { } finally {
            setLoading(false)
        }
    }, [])
    return { scheduleExpense, loading, scheduled, error } as const
}

export { useGetAllExpense, useAddExpense, useDeleteExpense, useScheduleExpense }
import { useEffect, useState } from "react"
import { supabase } from "../Utils/supabase";

function useGetAllExpense() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [allExpense, setAllExpense] = useState<any>([])

    useEffect(() => {
        async function getAllExpense() {
            console.log('Get all expense')
            try {
                const allExpense = await supabase.from('expense_item_t').select()
                if (allExpense.error) {
                    throw allExpense.error
                }
                setAllExpense(allExpense)
            } catch (error: any) {
                console.log('this is error')
                setError(error)
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }
        getAllExpense()
    }, [])
    return [loading, allExpense, error]
}

export { useGetAllExpense }
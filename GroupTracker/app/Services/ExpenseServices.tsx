import { useEffect, useState } from "react"
import { supabase } from "../Utils/supabase";

function useGetAllExpense() {
    const [loading, setLoading] = useState(true)
    const [allExpense, setAllExpense] = useState<any>([])

    useEffect(() => {
        async function getAllExpense() {
            console.log('Get all expense')
            try {
                const allExpense = await supabase.from('expense_item_t').select()
                setAllExpense(allExpense)
            } catch (error: any) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }
        getAllExpense()
    }, [])
    return [loading, allExpense]
}

export { useGetAllExpense }
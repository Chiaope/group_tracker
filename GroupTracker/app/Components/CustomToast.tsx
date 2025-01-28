import { Toast, useToast,ToastTitle, ToastDescription } from "@/components/ui/toast"
import { useCallback } from "react"

function useShowToast() {
    const toast = useToast()
    const newId = Math.random().toString()

    const showToast = useCallback(function(action: any, message: string) {
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
    }, [])
    return { showToast } as const
}
export {useShowToast}
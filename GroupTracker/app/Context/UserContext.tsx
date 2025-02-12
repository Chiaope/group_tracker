import { createContext, useEffect, useState } from 'react';
import { supabase } from '../Utils/supabase';
import { Session } from '@supabase/supabase-js';
import { useShowToast } from '../Components/CustomToast';

export const UserContext = createContext<any>({
    id: '',
    username: '',
    email: ''
  });

export default function UserContextProvider({ children }: any) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({})
    const [session, setSession] = useState<Session | null>(null)

    const toast = useShowToast()

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    useEffect(() => {
        console.log('help me please')
        if (session) getProfile()
    }, [session])


    async function getProfile() {
        console.log('getting profile')
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            const { data, error, status } = await supabase
                .from('profiles')
                .select(`id, username, email`)
                .eq('id', session?.user.id)
                .single()
            if (error && status !== 406) {
                throw error
            }

            if (data) {
                console.log('user data')
                console.log(data)
                setUser(data)
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.showToast("error", error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return <UserContext.Provider value={{user}}>
        {children}
    </UserContext.Provider>
}
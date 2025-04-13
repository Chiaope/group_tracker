import { createContext, useEffect, useState } from 'react';
import { supabase } from '../Utils/supabase';
import { Session } from '@supabase/supabase-js';
import { useShowToast } from '../Components/CustomToast';
import { useGetUserData, useGetUserGroupData } from '../Services/UserServices';

export const UserContext = createContext<any>({});

export default function UserContextProvider({ children }: any) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({})
    const [session, setSession] = useState<Session | null>(null)
    const { userGroupData, getUserGroupData } = useGetUserGroupData()
    const { userData, getUserData } = useGetUserData()

    const toast = useShowToast()

    function refreshData() {
        getProfile()
    }

    useEffect(() => {
        setLoading(true)
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
        setLoading(false)
    }, [])

    useEffect(() => {
        if (session) getProfile()
    }, [session])

    useEffect(() => {
        console.log('Updating user info')
        if (session?.user?.id && userGroupData && userData) {
            console.log('this is user data')
            console.log(userData)
            let updatedUserData = {
                ...user,
                ...userData,
                'userGroupData': userGroupData
            }
            if (userGroupData.length > 0) {
                updatedUserData = { ...updatedUserData, 'selectedGroup': userGroupData[0].group_id }
            }
            setUser(updatedUserData)
        }
    }, [userGroupData, userData, session?.user?.id])


    async function getProfile() {
        console.log('getting profile')
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')
            if (session?.user?.id) {
                await getUserGroupData(session.user.id)
                await getUserData(session.user.id)
            }


        } catch (error) {
            if (error instanceof Error) {
                toast.showToast("error", error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return <UserContext.Provider value={{ user, setUser, loading, refreshData }}>
        {children}
    </UserContext.Provider>
}
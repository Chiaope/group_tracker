import { Text } from 'react-native';
import { CustomDropDown } from './CustomInputs';
import { useContext, useState } from 'react';
import { UserGroupData } from '../Services/UserServices';
import { UserContext } from '../Context/UserContext';

export default function GroupSelection() {
    const [open, setOpen] = useState(false)
    const { user, setUser } = useContext(UserContext)

    return (<>
        <Text>Group:</Text>
        <CustomDropDown
            value={user.selectedGroup}
            searchable={true}
            items={user.userGroupData.map((groupData: UserGroupData) => { return { 'label': groupData.group_name, 'value': groupData.group_id } })}
            open={open}
            setOpen={setOpen}
            onSelectItem={(value: { value: any }) => {
                setUser({ ...user, 'selectedGroup': value.value })
            }}
        />
    </>)

}
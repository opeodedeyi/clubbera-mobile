import { useUser } from '@/context/UserContext';
import { View, Text, ScrollView } from 'react-native';
import LoggedOutPage from './comp/LoggedOut';


const index = () => {
    const { user } = useUser();

    if (user) {
        return (
            <ScrollView>
                <LoggedOutPage/>
            </ScrollView>
        )
    }
    
    return (
        <ScrollView>
            <LoggedOutPage/>
        </ScrollView>
    );
};

export default index

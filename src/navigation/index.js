import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabBar from './tabBar';
import { AuthStack } from './stackNav';

export const Navigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name='Auth'
                    component={AuthStack} />
                <Stack.Screen
                    name='HomeNav'
                    component={TabBar} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
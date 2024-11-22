import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/components/home';
import { ServiceScreen } from './src/components/services';

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};


function DetailsScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>

    </View>
  );
}
const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Service" component={ServiceScreen}  />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return <RootStack />;
}
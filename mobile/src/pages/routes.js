import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Incidents from './Incidents';
import Detail from './Detail';

/*criação das rotas do App
    Name App.Screen name="nome da rota/Cabeçalho da Rota no App" component={Componente importado o qual será direcionado pela rota}
    *UTILIZAR o screenOptions no Navigator das rotas, para desabilitar o Cabeçalho automático criado pelo Screen
    screenOptions ={{headerShown: false}}
*/

function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions ={{headerShown: false}}>
                <AppStack.Screen name="Incidents" component={Incidents}></AppStack.Screen>
                <AppStack.Screen name="Detail" component={Detail}></AppStack.Screen>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}


export default Routes;
import React , { useState, useEffect } from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import { View, FlatList, Image, Text , TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

function Incidents(){

    const [incidents, setIncidents] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1); //*Scroll Infinito
    const [loading, setLoading] = useState(false); //*Scroll Infinito

    const navigation = useNavigation();

    function navigateDatail(incident){
        navigation.navigate('Detail', {incident});
    }

    async function loadIncidents(){
        
        if (loading)
            {

                return;
            }
        
        if (totalItems > 0 && incidents.length == total) //*Scroll Infinito
        {
            return;
        }

        setLoading(true); //*Scroll Infinito

        //const response = await api.get('incidents');
        //Paginação 1
        //const response = await api.get(`'incidents?page=${page}`);
        //Paginação 2
        const response = await api.get('incidents'), { params: { page } }; //*Scroll Infinito

        //todos os valores dos incidents + os que retorna o response.data
        setIncidents([... incidents, ...response.data]); //anexar 2 vetores no react  //*Scroll Infinito
        setTotalItems(response.headers['x-total-count']);
        setPage( page + 1 ); //*Scroll Infinito
        setLoading(false); //*Scroll Infinito
    }

    useEffect(() =>{
        loadIncidents();
    }, []);

   //Intl.NumberFormat('pt-BR'
   //, { style: 'currency',
   //currency: 'BRL'}).format(incident.value)} 

    return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Image source={logoImg}></Image>
            <Text style={styles.headerText}>
                Total de <Text sytele={styles.headerTextBold}> {totalItems} casos </Text> .
            </Text>
        </View>
        <Text style={styles.title}>
            Bem-Vindo                
        </Text>
        <Text style={styles.description}>
            Escolha um dos casos abaixo e salve o dia.
        </Text>
        <FlatList 
            data={incidents}
            style={styles.incidentList}
            keyExtractor={incident => String(incident.id)}
            showsHorizontalScrollIndicator={false}
            onEndReached={loadIncidents} //função disparada automaticamente quando o usuário chegar ao final da lista //*Scroll Infinito
            onEndReachedThreshold={0.2} //Quantos % do final da lista o usuario precisa estar para carregar novos items //*Scroll Infinito
            renderItem={({ item: incident }) => (
             <View style={styles.incident}>
                <Text style={styles.incidentProperty}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>{incident.value}</Text>

                <TouchableOpacity 
                    style={styles.detailsButton} 
                    onPress={() => navigateDatail(incident)}>
                    <Text style={styles.detailButtonText} >Ver mais detalhes</Text>
                    <Feather name="arrow-right" size={16} color="#E02041"></Feather>
                </TouchableOpacity>
            </View>
            )}
        />

    </View>

    );
}

export default Incidents;
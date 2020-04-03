import React from 'react';
import { useNavigation , useRoute } from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';
import { View, Image, Text , TouchableOpacity, Linking} from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';
import logoImg from '../../assets/logo.png';


function Detail(){

    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;

    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor ${incident.value}`;

    function navigateBack(){
        navigation.goBack();
    }

    function sendEmail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
       });
    } 

    //via API: https://api.whatsapp.com/
    //via APP: whatsapp://send?phone=+5547991283367&text=${message}
    //via APP:https://wa.me/whatsappphonenumber/?text=urlencodedtext
    function sendWhatsApp(){
        //Verifica se o whatsApp está instalado , senão está envia via api
        Linking.canOpenURL("whatsapp://send?text=oi").then(supported => {
        if (supported) 
            {
                return Linking.openURL(`whatsapp://send?text=${message}&phone=+${incident.whatsapp}`);
            } 
        else 
            {
                return Linking.openURL(`https://api.whatsapp.com/send?text=${message}&phone=+${incident.whatsapp}`);
            }
        });
    }   

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}></Image>
                <TouchableOpacity 
                    style={styles.detailsButton} 
                    onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E02041"></Feather>
                </TouchableOpacity>
            </View>
            
            <View style={styles.incident}>
                <Text style={styles.incidentProperty, {marginTop: 0}}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.description}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>{incident.value}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o Dia!</Text>
                <Text style={styles.heroTitle}>Seja o Herói desse caso.</Text>
                <Text style={styles.heroDescription}>Entre em contato</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendEmail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>

    );
}

export default Detail;
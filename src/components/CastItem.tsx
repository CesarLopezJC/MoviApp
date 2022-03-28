import React from 'react'
import { Cast } from '../interces/credistInterface';
import { Image, StyleSheet, Text, View } from 'react-native';

interface Props{
    actor: Cast,
}

export const CastItem = ({actor} : Props) => {

    const uri= `https://image.tmdb.org/t/p/w500/${actor.profile_path}`;
    return (
        <View style={{...styles.actorCard}}>
            {
                actor.profile_path && (<Image source={{uri}} style={{width: 50, height: 50, borderRadius:10}}/>)
            }
            
            <View style={{marginLeft:5,marginTop:3,marginRight:10}} >
                <Text style={{fontSize:18, fontWeight:'bold'}}>
                    {actor.name}
                </Text>
                <Text>
                    {actor.character}
                </Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{

    },
    actorCard:{
        borderRadius:10,
        shadowColor: "#000",
        // backgroundColor:'#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 10,
        flexDirection:'row',
        backgroundColor:'#fff',
        marginRight:20,
        height:50,
    }
});

import React from 'react'
import { Text, View, FlatList } from 'react-native';
import { MovieFull } from '../interces/movieInterface';
import { Cast } from '../interces/credistInterface';
import  Icon  from 'react-native-vector-icons/Ionicons';
import currencyFormatter  from "currency-formatter";
import { CastItem } from './CastItem';
import { ScrollView } from 'react-native-gesture-handler';
import { HorizontalSlider } from './HorizontalSlider';

interface Props {
    movieFull: MovieFull,
    cast: Cast[]
}

export const MovieDatails = ({movieFull, cast} : Props) => {
    return (
        <>
            {/* Detalles */}
            <View style={{flexDirection:'row'}} >
                <Icon 
                name="star-outline"
                color="grey"
                size={16}
                />
                <Text> {movieFull.vote_average} </Text>
                <Text> 
                    - {movieFull.genres.map(g => g.name).join(', ')}
                </Text>
                
            </View>
            <Text style={{marginTop:20,fontSize:23,fontWeight: 'bold',}}>Historia</Text>
            <Text style={{marginTop:0,fontSize:16,}}>{movieFull.overview}</Text>
            <Text style={{marginTop:20,fontSize:23,fontWeight: 'bold',}}>Presupuesto</Text>
            <Text style={{marginTop:0,fontSize:18,}}>{ currencyFormatter.format(movieFull.budget, { code: 'USD' })}</Text>

            {/* Casting */}
            
            <View style={{marginBottom:40}}>
                <Text style={{marginTop:20,fontSize:23,fontWeight: 'bold',}}>Actores</Text>

                <FlatList data={cast} keyExtractor={(item)=> item.id.toString()} renderItem={({item}) => <CastItem actor={item} />} horizontal={true}
                showsHorizontalScrollIndicator={false} style={{marginTop:10,height:70}} />
                {/* <CastItem actor={cast[0]}/> */}
            </View>



        </>
    )
}

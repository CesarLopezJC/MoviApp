import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Image, StyleSheet,  TouchableOpacity, View } from 'react-native';
import { Result } from '../interces/movieInterface';

interface Props{
    movie: Result;
    height?:number;
    width?:number;
}

export const MoviePoster = ({movie,height = 420,width=300}: Props) => {

    const uri= `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    const navigation = useNavigation();

    // console.log(movie.poster_path);

    return (
        <TouchableOpacity 
        onPress={ () => navigation.navigate("DatailScreen",movie) }
        activeOpacity={0.8}
        style={{
            width, height, marginHorizontal:5
        }}>

            <View style={styles.imageContainer}>
                <Image
                    source={{uri}}
                    style={styles.image}
                />
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    image:{
        flex:1,
        borderRadius:18,
        
    },
    imageContainer:{
        flex:1,
        borderRadius:18,
        shadowColor: "#000",
        backgroundColor:'#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 10,
    }
});
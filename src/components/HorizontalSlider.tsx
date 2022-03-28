import React from 'react'
import { FlatList, Text, View } from 'react-native';
import { MovieDBNowPlaying, Result } from '../interces/movieInterface';
import { MoviePoster } from './MoviePoster';

interface Props{
    movie:Result[];
    title?:string;
}


export const HorizontalSlider = ({movie,title = ''}: Props) => {
    return (
        <View style={(title!='')? {height:250}:{height:217}}>
            {
                (title!='')&&  <Text style={{fontSize:25, fontWeight:'bold',marginLeft:10}}>{title}</Text>
            }
            
            <FlatList
                data={movie}
                renderItem={( ({item}: any)=> 
                (
                <MoviePoster movie={item} width={140} height={200}/>
                )
                // <Text>{peliculasCine[item]}</Text> 
                )}
                keyExtractor={(item) =>item.id.toString()}

                horizontal={true}
                showsHorizontalScrollIndicator={false}

            />
        </View>
    )
}

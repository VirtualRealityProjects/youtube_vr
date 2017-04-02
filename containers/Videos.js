import React from 'react';
import { View, Text } from 'react-vr';

import Video from '../components/Video';

export default class Videos extends React.Component{

    render(){
        console.log(this.props.items);
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    width: 4,
                    layoutOrigin: [0.5, 0.5],
                    transform: [{translate: [0,-0.7,-5]}]
                }}
            >
                {this.props.items.map((video, key) => <Video {...video} animationKey={key} key={key} />)}
            </View>
        )
    }
}
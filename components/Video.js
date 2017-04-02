import React from 'react';
import { View, Text, Animated, Image, asset, Video as VideoYT } from 'react-vr';

export default class Video extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            rotateX: new Animated.Value(0),
            rotateY: new Animated.Value(0),
            scale: new Animated.Value(1),
            opacity: new Animated.Value(0),
            display: false
        }

        this.onEnterHandler = this.onEnterHandler.bind(this);
        this.onExitHandler = this.onExitHandler.bind(this);
        this.onInputHandler = this.onInputHandler.bind(this);
    }

    onEnterHandler(){
        Animated.parallel([          
            Animated.timing(this.state.scale, {toValue: 1.1, duration: 200}),
            Animated.timing(this.state.rotateX, {toValue: -5, duration: 200}),
            Animated.timing(this.state.rotateY, {toValue: 5, duration: 200})
        ]).start()
    }

    onExitHandler(){
        Animated.parallel([          
            Animated.timing(this.state.scale, {toValue: 1}),
            Animated.timing(this.state.rotateX, {toValue: 0}),
            Animated.timing(this.state.rotateY, {toValue: 0})
        ]).start()
    }

    onInputHandler(e){
        const event = e.nativeEvent.inputEvent;

        switch(event.eventType){
            case 'click':
                this.setState({ display: true });
                break;
        }
    }

    render(){
        
        const thumbnail = this.props.snippet.thumbnails.default;

        return (
            <View>
                <Animated.View
                    onEnter={this.onEnterHandler}
                    onExit={this.onExitHandler}
                    onInput={this.onInputHandler}
                    style={{
                        paddingBottom: 0.2,
                        marginRight: 0.2,
                        backgroundColor: 'white',
                        transform: [
                            {scale: this.state.scale}, 
                            {rotateX : this.state.rotateX}, 
                            {rotateY : this.state.rotateY}
                        ],
                        opacity: this.state.opacity
                    }}
                >
                    <Image
                        source={asset(thumbnail.url)}
                        style={{ width: 1.1, height: 0.7 }}
                    />

                    <Text
                        style={{
                            textAlign: "center",
                            color: "black"
                        }}
                    >{this.props.snippet.title}</Text>
                </Animated.View>

                {this.state.display &&
                    <VideoYT style={{width: 6.0, height:3.0, transform: [{translateY: 1}]}} source={asset('disiz.mp4')}/>  
                }

            </View>
        )
    }

    componentDidMount() {
        Animated.timing(this.state.opacity, {toValue: 1, delay: this.props.animationKey * 400}).start();
    }
}

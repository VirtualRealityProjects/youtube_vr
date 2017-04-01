import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  VrButton
} from 'react-vr';

export default class demo_youtube extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isFocus: false,
			isEnter: false,
			text: ''
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		if (!event || event.eventType !== 'keydown' || !this.state.isFocus || (event.keyCode === 8 && this.state.text.trim() === '' )) {
			return;
		}
		this.setState({
			text: (event.keyCode === 8) ? this.state.text.slice(0, -1) : this.state.text + String.fromCharCode(event.keyCode)
		});
	}

  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        <View onInput={(e) => this.handleChange(e.nativeEvent.inputEvent)} style={{
          width: 4,
          backgroundColor: '#e74c3c',
          flexDirection: 'row',
          paddingTop: 0.1,
          paddingLeft: 0.1,
          paddingRight: 0.1,
          paddingBottom: 0.1,
          alignItems: 'stretch',
        }}>
          <VrButton
            onInput={(e) => console.log(e)}
            onClick={() => this.setState({ isFocus: true })}
            onEnter={() => this.setState({ isEnter: true })}
            onExit={() => this.setState({ isEnter: false, isFocus: false })}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'stretch',
              justifyContent: 'space-around',
              layoutOrigin: [0.5, 0.5],
              transform: [{ translate: [0, -0.2, -5] }],
              width: 3,
              backgroundColor: '#ffffff',
              opacity: (this.state.isEnter) ? 1 : 0.5,
              borderWidth : 0.02,
              borderColor: (this.state.isFocus) ? '#333333' : '#ffffff',
              paddingTop: 0.1,
              paddingLeft: 0.1,
              paddingRight: 0.1,
              paddingBottom: 0.1,
              marginTop: 0.1,
              marginBottom: 0.1
            }}
          >
            <Text 
              style={{ textAlign: 'left', color: 'black' }}
            >
              {(this.state.text.trim() !== '') ? this.state.text : 'Search a VR video ...'}
            </Text>
          </VrButton>			
        </View>
      </View>
    );
  }
};

AppRegistry.registerComponent('demo_youtube', () => demo_youtube);

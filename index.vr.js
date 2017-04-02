import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  VrButton, 
  Video
} from 'react-vr';

import Videos from './containers/Videos';

const YTSearchResult = require('./fakeYTSearchResults');

export default class demo_youtube extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isFocus: false,
			isEnter: false,
			text: '',
      isButtonEnter: false,
      YTSearchResult
		}
		this.handleChange = this.handleChange.bind(this);
		this.search = this.search.bind(this);
	}

	handleChange(event) {
		if (!event || 
      event.eventType !== 'keydown' || 
      !this.state.isFocus || 
      (event.keyCode === 8 && this.state.text.trim() === '' ) || 
      (event.keyCode === 32 && this.state.text.trim() === '') ||
      ((event.keyCode < 32 || event.keyCode > 126)) && event.keyCode !== 8) {
			return;
		}
		this.setState({
			text: (event.keyCode === 8) ? this.state.text.slice(0, -1) : this.state.text + String.fromCharCode(event.keyCode)
		});
	}

  search() {
    
  }

  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        <View 
        onEnter={() => this.setState({ isEnter: true })}
        onInput={(e) => this.handleChange(e.nativeEvent.inputEvent)} 
        onExit={() => this.setState({ isEnter: false, isFocus: false })}
        style={{
          width: 4,
          flexDirection: 'row',
          alignItems: 'stretch',
          layoutOrigin: [0.5, 0.5],
          marginTop: 0.1,
          marginBottom: 0.1,
          transform: [{ translate: [0, -0.2, -5] }]
        }}>
          <VrButton
            onInput={(e) => console.log(e)}
            onClick={() => this.setState({ isFocus: true })}
            style={{
              width: 3,
              alignItems: 'stretch',
              backgroundColor: '#ffffff',
              opacity: (this.state.isEnter) ? 1 : 0.5,
              borderWidth : 0.02,
              borderColor: (this.state.isFocus) ? '#34495e' : '#ffffff',
              paddingTop: 0.1,
              paddingLeft: 0.1,
              paddingRight: 0.1,
              paddingBottom: 0.1
            }}
          >
            <Text 
              style={{ textAlign: 'left', opacity: (this.state.text.trim() === '') ? 0.7 : 1,  color: 'black' }}
            >
              {(this.state.text.trim() !== '') ? this.state.text : 'Search a VR video ...'}
            </Text>
          </VrButton>			
          <VrButton
            onEnter={() => this.setState({ isButtonEnter: true })}
            onExit={() => this.setState({ isButtonEnter: false })}
            onClick={this.search}
            style={{
              width: 1,
              alignItems: 'stretch',
              backgroundColor: (this.state.isButtonEnter) ? '#2c3e50' : '#34495e',
              opacity: (this.state.isEnter) ? 1 : 0.5,
              paddingTop: 0.1,
              paddingLeft: 0.1,
              paddingRight: 0.1,
              paddingBottom: 0.1
            }}
          >
            <Text 
              style={{ textAlign: 'center', color: 'white' }}
            >
              SEARCH
            </Text>
          </VrButton>	
        </View>

        <Videos {...YTSearchResult}/>
      </View>
    );
  }
};

AppRegistry.registerComponent('demo_youtube', () => demo_youtube);

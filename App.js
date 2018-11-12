import React from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';

const customData = require('./customData.json');

const identifiers = ['Rate', 'Supersample', 'Mulisample', 'Anisotropy', 'TextureMode', 'VerticalSync', 'WindowMode', 'VideoMode']

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      result: ''
    };
    this._formatIdentifier = this._formatIdentifier.bind(this);
  }

  _formatIdentifier(identifier) {
    const formattedData = customData.subviews;
    //loop through the formatted data
    for (i = 0; i < formattedData.length; i++) { 
      for(r = 0; r < formattedData[i].subviews.length; r++) {
        for(q = 0; q < formattedData[i].subviews[r].subviews.length; q++)  {
          //make sure it exists
          if(formattedData[i].subviews[r].subviews[q].subviews) {
            for(j = 0; j < formattedData[i].subviews[r].subviews.length; j++) {
              if(formattedData[i].subviews[r].subviews[q].subviews[j]) {
                for(z = 0; z < formattedData[i].subviews[r].subviews[q].subviews[j].contentView.subviews.length; z++) {
                //this is pretty much all i can get to return 
                console.warn(formattedData[i].subviews[r].subviews[q].subviews[j].contentView.subviews[z].control.identifier);
                 if(formattedData[i].subviews[r].subviews[q].subviews[j].contentView.subviews[z].control.identifier === identifier) {
                  return this.state = { result: formattedData[i].subviews[r].subviews[q].subviews[j].contentView.subviews[z].control.identifier};
                 }
                }
              }
            }
          }
        }
      }
    }
  }


  updateField(text) {
    //i would make sure they are all lowercase to be safe
    this.setState({ text: text })
    for(i = 0; i < identifiers.length; i++) {
      if(text === identifiers[i]){
        this._formatIdentifier(text);
        this.setState({result: ''})
      }  else {
        this.setState({result: 'No results, try again'})
      } 
    }
  }
    
  
  render() {
    return (
      <View style={styles.container}>
      <Text>For some reason Rate is only being recongnized on the first try</Text>
        <Text>Type a Selector Name: Rate, Supersample, Mulisample, Anisotropy, TextureMode, VerticalSync, WindowMode, VideoMode </Text>
         <TextInput
          style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.updateField(text)}
          value={this.state.text}
       />
       <Text>{this.state.result}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

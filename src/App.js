import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import 'typeface-roboto';
import Header from './Header.js';
import ImagePicker from './ImagePicker.js';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

class App extends Component {
  componentDidMount(){
      document.title = "在线 VOC 标注"
    }
  render() {
    return (
    <MuiThemeProvider theme={theme}>
      <Header/>
      <ImagePicker />
      </MuiThemeProvider>
    );
  }
}

export default App;

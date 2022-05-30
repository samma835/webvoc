import React, { Component } from 'react';
import {Grid, Button, Card, CardContent, CardActions, Typography, Dialog,DialogTitle,DialogActions,DialogContent,DialogContentText, TextField   } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import Canvas from './Canvas.js';
import 'typeface-roboto';

const input={
  width:' 0.1',
  height: '0.1',
  opacity: '0',
  overflow: 'hidden',
  position: 'absolute',
};
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop:  2,
    paddingBottom:  2,
    background: '#FFFFFF',
    marginBottom:1,
  },
  colorText:{
    color: 'gray'
  }
});
class ImagePicker extends Component {

  state = {
    imagePicked: null,
    fileName:"",
    files:[],
    tag:null,
    dialog:false
  };


  fileChangedHandler = (event) =>{
    const file = event.target.files[0];
    console.log(event.target.files);
    console.log(event.target.files[0]);
    this.setState({imagePicked: URL.createObjectURL(file), fileName:file.name,  files:event.target.files});
  }

  onTag(){
    let TempTag=this.state.tag;
    return(
      <Dialog
        open={this.state.dialog}
        onClose={()=>{this.setState({dialog:false})}}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">设置TAG</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="standard-with-placeholder"
            label="Tag"
            placeholder={this.state.tag}
            margin="dense"
            id="name"
            type="text"
            fullWidth
            onChange={(event)=>{TempTag= event.target.value}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{this.setState({dialog:false})}} color="primary">
            取消
          </Button>
          <Button onClick={()=>{this.setState({dialog:false, tag: TempTag})}} color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    );
   }

   renderCanvas(){
    if(this.state.imagePicked){
      console.log(this.state.fileName);
      const files = [...this.state.files]
      return files.map(file =>
    <Canvas img={ URL.createObjectURL(file)} snack={true} fileName={file.name} tag={this.state.tag}/>
      );

    }
    else{
     return(
       <Card className={this.props.classes.root}>
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        >
          <CardContent>
            <Typography variant="headline" component="h1" color='inherit'>
            在线 VOC 标注
            </Typography>
            <Typography component="p" color='inherit'>
            <br/>
             使用步骤<br/>
             1. 加载图片<br/>
             2. 绘制区域 <br/>
             3. 设置 TAG <br/>
             4. 下载 XML <br/>
             <br />
            </Typography>
          </CardContent>
          <CardActions>
             <input type="file" name="file" id="file" class="input" onChange={this.fileChangedHandler} accept="image/*" style={{display: 'none'}} multiple/>
             <Button variant="extendedFab" size="large" color="primary" >
             <label  for="file">
              加载图片
              </label>
             </Button>
             <Button variant="extendedFab" size="large" color="secondary" onClick={()=> {this.setState({dialog:true})}}>
              设置默认 tag
             </Button>
           </CardActions>
         </Grid>
        </Card>);
    }
}

  render(){
    return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
      style={{paddingTop:20, paddingBottom: 20}}
    >
      {this.onTag()}
      {this.renderCanvas()}
    </Grid>
    );
  }
}

export default withStyles(styles)(ImagePicker);

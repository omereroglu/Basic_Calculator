/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';




export default class App extends Component{
  
  constructor(){
    super()
    this.state={
      inputText:"",
      resultText:"",
      previousCalculation:"",
    }

    this.operatorElements=['<--','+','-','*','/']
    this.containDot=false
    
  }


  calculateResult(){
   const text=this.state.inputText
   this.setState({
     resultText:eval(text),
     previousCalculation:text+"=",
     inputText:""
     
   })
   this.containDot=false
  }


  //final check before calculating result
  validateFinalText(){
    const text=this.state.inputText
    const lastChar=text.slice(-1)
    switch(lastChar){
      case '+':
      case '-':
      case '/':
      case '*':
      return false //if last character is an operator,do not calculation
    }

    return true
  }



//Handle number pressed event
  buttonPressed(text){
    
    if(text=='='){
     return this.validateFinalText() && this.calculateResult()
    }

    if(text=='.'){
      if(this.containDot) return
      //const lastChar=this.state.inputText.split('').pop()
      //if(lastChar=='.')return
      this.containDot=true
    }
    
    this.setState({
      inputText:  this.state.inputText+=text
    })
   
  }

  //Handle operator pressed event
  operatorPressed(operator){

      switch(operator){
      
        case '<--':
        
          let temp=this.state.inputText.split('')
          temp.pop()
          this.setState({
            inputText:temp.join('')
          })
          break
        case '+':
        case '-':
        case '*':
        case '/':
          
      if(this.state.inputText=='') return
      const lastChar=this.state.inputText.split('').pop()
      if(this.operatorElements.indexOf(lastChar)>0) return

      this.setState({
        inputText: this.state.inputText+=operator
      })
      this.containDot=false

      }

  }



  render() {

  //We gona keep every row (that is actually a view include numbers on calculator) on rows array
  let rows=[]

  //rows begins with 1 4 and 7 
  for(let i=1;i<8;i+=3){
    //every row gona keep 3 touchable opacitys(number buttons)
    let row=[]
    for(let j=0;j<3;j++){
    row.push(
    <TouchableOpacity key={j+i} style={styles.btn} onPress={()=>this.buttonPressed(j+i)}>
      <Text style={styles.btnText}>{j+i}</Text>
    </TouchableOpacity>)
    }
    rows.push(<View key={i} style={styles.row}>{row}</View>)
  }

  //That part is for last row in calculators
  let lastRow=[]
  let lastRowElements=['.','0','=']
  for(let i=0;i<lastRowElements.length;i++){
      lastRow.push(<TouchableOpacity key={i} style={styles.btn} onPress={()=>this.buttonPressed(lastRowElements[i])}>
        <Text style={styles.btnText}>{lastRowElements[i]}</Text>
      </TouchableOpacity>)
  }
  rows.push(<View key ={1}style={styles.row}>{lastRow}</View>)

  //Placing operators
  let operators=[]

  for(let i=0;i<this.operatorElements.length;i++){
    operators.push(<TouchableOpacity key={i} style={styles.btn} onPress={()=>this.operatorPressed(this.operatorElements[i])}>
      <Text style={styles.operatorText}> {this.operatorElements[i]} </Text>
    </TouchableOpacity>)
  }


    
    return (
      <View style={styles.container}>
        
       <View style= {styles.calculation}>
          <Text style={styles.calculationText}> {this.state.inputText}</Text>
       </View>

       <View style={styles.previousCalculation}> 
          <Text style={styles.previousCalcText}> {this.state.previousCalculation}</Text>
        </View>

       <View style={styles.result}>
        <Text style={styles.calculationText}> {this.state.resultText}</Text>
       </View>

       <View style={styles.buttons}>

          <View style={styles.numbers}>{rows}</View>
          <View style={styles.operators}>{operators}</View>
       
       </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  result:{
    flex:1,
    justifyContent:'center',
    alignItems:'flex-end',
    backgroundColor:'white',
    borderColor:'black',
    borderWidth:0.7,
    paddingBottom:0.5,
  },
  calculation:{
    flex:2,
    justifyContent:'center',
    alignItems:'flex-end',
    borderColor:'black',
    borderWidth:0.7,
    backgroundColor:'white',
    paddingBottom:0.5,
  },
  previousCalculation:{
    flex:1,
    justifyContent:'center',
    alignItems:'flex-end',
    backgroundColor:'white',
    borderColor:'black',
    borderWidth:0.7,
    paddingBottom:0.5,

  },
  buttons:{
    flex:7,
    flexDirection:'row',
  },
  numbers:{
    flex:3,
    backgroundColor:'#b8b4b9',
  },
  operators:{
    flex:1,
    backgroundColor:'#ff8421',
  },
  operatorText:{
    color:'white',
    fontSize:40,
  },
  calculationText:{
    color:'black',
    fontSize:40,
  },

  previousCalcText:{
    color:'gray',
    fontSize:35,
  },
 
  btnText:{
    color:'black',
    fontSize:40,
  },
  btn:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'stretch',
    borderColor:'black',
    borderWidth:1.5,
    
   
  },
  row:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
  },


});

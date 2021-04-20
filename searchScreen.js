import React from "react"
import{Text , View , Stylesheet , TextInput , TouchableOpacity } from "react-native"
import db from "../config"
import{FlatList, ScrollView }from "react-native-gesture-handler"
export default class SearchScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allTransactions:[],
            lastVisibleTransaction:null

        }
    }
    componentDidMount =async()=>{
        const query = await db.collection("transaction").limit(10).get()
        query.docs.map((doc)=>{
            this.setState({
                allTransactions:[... this.state.allTransactions, doc.data()]
            })
        })
    }
    fetchModeTransactions = async() =>{
        var text = this.state.search.toUpperCase()
        var enterText = text.split("")
        if(enterText[0].toUpperCase()== "B"){
            const query = await db.collection("transactions").where("bookid","==",text).stratAfter(this.state.lastVisibleTransaction).limit(10).get()
            transaction.docs.map((doc)=>{
                this.setState({
                    allTransactions:[...this.state.allTransactions,doc.data()],
                    lasVisibleTrasaction:doc
                })
            })
        }
        else if(enterText[0].toUpperCase()=="S"){
            const query = await db.collection("transactions").where("studentid","==",text).stratAfter(this.state.lastVisibleTransaction).limit(10).get()
            transaction.docs.map((doc)=>{
                this.setState({
                    allTransactions:[...this.state.allTransactions,doc.data()],
                    lasVisibleTrasaction:null,search:""
                })
            })
        }

    }
    searchTransaction = async(text)=>{
        var entertext = text.split("")
        if(enterText[0].toUpperCase()== "B"){
            const query = await db.collection("transactions").where("bookid","==",text).stratAfter(this.state.lastVisibleTransaction).limit(10).get()
            transaction.docs.map((doc)=>{
                this.setState({
                    allTransactions:[...this.state.allTransactions,doc.data()],
                    lasVisibleTrasaction:doc
                })
            })
        }
        else if(enterText[0].toUpperCase()=="S"){
            const query = await db.collection("transactions").where("studentid","==",text).stratAfter(this.state.lastVisibleTransaction).limit(10).get()
            transaction.docs.map((doc)=>{
                this.setState({
                    allTransactions:[...this.state.allTransactions,doc.data()],
                    lasVisibleTrasaction:doc
                })
            })
        }
    }
    render(){
        return (
            <View style = {styles.container}>
                <View style = {styles.searchbar}>
                    <TextInput
                    style = {styles.bar}
                    placeholder = "enter book id or student id"
                    onChangeText = {(text)=>{this.setState({search:text})}}/>
                    <TouchableOpacity style = {styles.searchButton} onPress = {()=>[this.searchTransaction(this.state.search)]}>
                        <Text>
                            search
                        </Text>
                    </TouchableOpacity>

                </View>


            <FlatList
            data = {this.state.allTransactions}
            renderItem = {({item})=>(
                <View key = {index} style = {{borderBottomWidth:2}}>
                <Text>{"bookid:"+ item.bookid}</Text>
                <Text>{"studentid:"+item.studentid}</Text>
                <Text>{"transactionType:"+item.transactionType}</Text>
                <Text>{"date:"+item.date.toDate()}</Text>
             
            </View>
            )}

               
            keyExtractor = {(item,index)=>index.toString()}   
            onEndReached = {this.fetchModeTransactions}     
            onEndReachedThreshold = {0.7}
                       
                    
               
           
              />
              </View>
        )
    }
}
const styles = StyleSheet.create({
     container: { flex: 1, marginTop: 20 }, 
     searchBar:{ flexDirection:'row', height:40, width:'auto', borderWidth:0.5, alignItems:'center', backgroundColor:'grey', }, 
     bar:{ borderWidth:2, height:30, width:300, paddingLeft:10, }, 
     searchButton:{ borderWidth:1, height:30, width:50, alignItems:'center', justifyContent:'center', backgroundColor:'green' } })
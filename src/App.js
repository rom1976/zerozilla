import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container,Grid,Card , Icon, Form,Image} from "semantic-ui-react";
import Home from './components/Home';
import Product from './components/Product';
import imageCircle from './components/images/redcircle.png'


function App() {
  const [productData, setProductData] = useState();
  const [count,setCount] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData,setSearchData] = useState();
 

  
  useEffect(()=>{
    axios.get('https://fakestoreapi.com/products/category/jewelery')
    .then((response)=>{
         console.log(response.data);
         setSearchData(response.data)
    })

  },[])

  const searchHandler = (e) =>{   
    setSearchTerm(e.target.value);  
      
}

  const countHandler = (count) =>{
      setCount(count);
  }

  const productHandler = (props) =>{
          setProductData(props);
          console.log('From App.js data for productPage');
          console.log(props);
  }
  return (
   <>
         <Container fluid>
           <Grid>
          <Grid.Row style={{marginTop:'25px'}} columns={3}>
                    <Grid.Column width={4}>
                    <Icon name='home' size='large' color='blue' style={{marginLeft:'30px'}}
                  
                    ></Icon>
                    </Grid.Column>
                   <Grid.Column width={7}>
                       <Form.Input 
                       style={{width:'500px'}}
                       list="browsers1" name="browser1" id="browser1"
                       onChange=
                        { searchHandler
                           
                          }
                       />
                       <datalist id="browsers1">
    
    {  searchData &&
                 searchData
                   .filter((val) => {
                     if (searchTerm === "") { 
                       return;
                     } else if (
                       val.title.toLowerCase().includes(searchTerm.toLowerCase())
                     ) {  
                       return val; 
                     }
                   })
                   .map((post) => {  
                      
                     return ( 
                       <>  
                       <option key={post.id.toString()} value={post.title}  
                         onClick={
                           searchHandler
                         }
                      />       
                     </>
                     );
                      
                   }) 
             
                  
      }
   
    </datalist>    
                   </Grid.Column>
                   <Grid.Column width={2}>

                    </Grid.Column>
                   <Grid.Column width={1} textAlign='right'>
                       <div style={{float:'left',textAlign:'center',backgroundImage:`url(${imageCircle})`,  backgroundSize: 'contain',  backgroundRepeat: 'no-repeat', color:'white'}}>{count}<br/>
                       <Icon name='shop' color='blue' size='large' style={{ zIndex:'1'}}
                      
                       />
                        </div>
                      
                       <Icon name="user circle" color='blue' size="large" />
                   </Grid.Column>
                </Grid.Row >
                <Grid>
                <Grid.Row textAlign='center'>
                  <Grid.Column style={{paddingLeft:'60px'}}> 
   <Router>
   <Routes>
    {/*
       render={routeProps => (
    <Profile routeProps={routeProps} animate={true} />
  )}
/>
    */}
   <Route path="/" element={<Home productHandler={productHandler} /> }/> 
   <Route path="/product" element={<Product product={productData} countHandler={countHandler}/>} /> 
   </Routes>
   </Router>
   </Grid.Column>
   </Grid.Row>
   </Grid>

   </Grid>
   </Container>
   </>
  );
}

export default App;
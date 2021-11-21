import { useState, useEffect } from "react";
import axios from "axios";
import { Container,Grid,Card , Icon, Form,Image} from "semantic-ui-react";
//import {Navigate} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Home = (props) =>{
    const [allCategories, setAllCategories] = useState();
    const [productByCategory, setProductByCategory] = useState();
    const [product,setProduct] = useState();
    const history = useNavigate();
   useEffect(()=>{
       axios.get('https://fakestoreapi.com/products/categories')
       .then((response)=>{
            console.log(response.data);
            const data = response.data;
            setAllCategories(data);
           
       })
   },[]);

   const categoryProductHandler = (item) =>{
    axios.get(`https://fakestoreapi.com/products/category/${item}`)
    .then((response)=>{
         console.log(response.data);
         const data = response.data;
         setProductByCategory(data);
    });

   };

   const productHandler =(id)=>{
    axios.get(`https://fakestoreapi.com/products/${id}`)
    .then((response)=>{
         console.log(response.data);
         const data = response.data;
         setProduct(data);
         props.productHandler(data);
         history("/product");

    });
   }

    
    return(
        <>
        <Container fluid>
            <Grid style={{margin:'5px'}}>
                <Grid.Row> <Grid.Column textAlign='center'><h2 > High Range of Products</h2></Grid.Column> </Grid.Row>
                <Grid.Row>
                   
                    <Card.Group>
                    {
                       allCategories && allCategories.map((item, idx)=>{
                        return(
                        <Card key={idx} onClick={categoryProductHandler.bind(this, item)}>
                              <Card.Content>
                                  {item}
                              </Card.Content>
                        </Card>
                        )})
                    
                    }
                    </Card.Group>
                </Grid.Row>
                <Grid.Row columns={6}>
                  
                         { productByCategory && productByCategory.map( (item, idx)=>{
                             return  (
                                 <Grid.Column  key={idx} style={{border:'solid thin grey', margin:'5px',padding:'5px'}} >
                                <Image
                                as='a'
                                src={item.image}
                                href='#'
                                size='medium'
                                onClick={productHandler.bind(this,item.id)}
                                
                              />
                              <div  onClick={productHandler.bind(this,item.id)}>
                              {item.title}
                              
                              </div>
                              <div  onClick={productHandler.bind(this,item.id)}>
                              {item.price}
                              </div>
                            </Grid.Column>
                          
                             //header={item.title}
                             //meta={item.price}
                            
                            
                           
                           )
                         })
                            
                         } 
                
                </Grid.Row>
            </Grid>
            

        </Container>
        </>
    )
}

export default Home;
import { useEffect, useState } from "react";
import { Container,Grid,Card , Icon, Form,Image, Button} from "semantic-ui-react";

const Product = (props) =>{
    const [productCount,setProduct] = useState(0 )
    console.log('From Product Page');
    console.log(props);
    useEffect(()=>{
        props.countHandler(productCount);
    },[productCount])

    return (
        <>
        <Container>
            <Grid>
                <Grid.Row >
                <Grid.Column width={6}>
                <Image
                    as='a'
                    src={props.product.image}
                    href='#'
                    size='medium' 
                  />
                </Grid.Column>
                <Grid.Column width={4}>
                      <div >
                         <h2> {props.product.title}</h2>
                         
                      </div>
                      <Button color='blue' onClick={()=> setProduct(productCount+1)}>Add To Cart</Button>
                </Grid.Column>
                </Grid.Row>

            </Grid>
        </Container>
        </>
    )
}

export default Product;
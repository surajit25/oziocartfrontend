import { useEffect, useState } from "react"
import Router from "next/router"

import { Container, Grid, Paper,Stack,ButtonGroup } from "@mui/material"

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
import server from "../api/apilink";

import DeleteIcon from '@mui/icons-material/Delete';
import Cookies from "js-cookie";
import Api from "../api/axioapi";

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocalMallIcon from '@mui/icons-material/LocalMall';

import { Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { Box } from "@mui/system";


function Wishlist(){

 const [Allproduct,setAllproduct] = useState([])
 const [loading,setLoading] =useState(true)

 const dispatch = useDispatch()

 useEffect(()=>{
  Api.post(`${server}/getallwhislist`,{email:Cookies.get("user")}).then(res=>{

      FetchProduct(res.data)

  }).catch(er=>{
      setAllproduct([])
      setLoading(false)
  })




},[])

const MakrefreshPage=()=>{

      Api.post(`${server}/getallwhislist`,{email:Cookies.get("user")}).then(res=>{

          FetchProduct(res.data)

      }).catch(er=>{
          setAllproduct([])
      })
  
}

const FetchProduct=(wishproduct)=>{

  Api.get(`${server}/getallproduct`).then(res=>{

          var temp = []
        

          for(var i=0;i<res.data.length;i++){

              for(var j=0;j<wishproduct.length;j++){
                  if(wishproduct[j].sku==res.data[i].sku){
                          temp.push({name:i,value:res.data[i],id:wishproduct[j].id})
                          break;
                  }
              }

          }

          setAllproduct(temp)

          setLoading(false)
      
       
  })
}




 const [carterror,setCartError] = useState(false)

 const  vertical='top'
 const horizontal='center'
 const [message,setMessage]  = useState('')


 
 
 const Addtocart =(item,id)=>{
          
  if(Cookies.get('user')){

      axios.post(`${server}/addcartandremovewishlist`,{
          email:Cookies.get('user'),
          sku:item.value.sku,
          id:id
      }).then(res=>{

      
      dispatch({
          type:'Cart',
          payload:true
      })

      setCartError(!carterror)
      setMessage(<span className="text-success">Successfully added to cart</span>)

      MakrefreshPage()

      }).catch(er=>{

      })

  }else{

      setCartError(!carterror)
      setMessage(<span className="text-danger">You are not login</span>)
  }
 

}

const handleClose=()=>{

  setCartError(!carterror)
}


const VisitPage=(item)=>{



  Router.push({pathname:`/product/${item.value.slug}`,query:{color:item.value.color,size:item.value.size}})

}

const VisitShop=(item)=>{

  Router.push({pathname:`/shop-now/`,query:{sku:item.value.sku}})
}

const VisitAllProduct=()=>{

  Router.push('/allproduct')
}


    return(
        <>
           <Box sx={{marginTop:{lg:'70px',mb:'130px',sm:'130px',xs:'130px',xl:'70px'},overflow:"hidden",mb:1,minHeight:"70vh"}}>

<Container>
 
{loading?
<Box sx={{display:"flex",justifyContent:"center",alignItems:"center",fontWeight:"600",minHeight:"70vh"}}> 

  Loading...

</Box>:

<Grid container spacing={1}>

  {Allproduct.length>0?
  <>
  
{Allproduct.map(item=>{
    return(<Grid item lg={4} xl={4} sm={12} md={12} xs={12} key={item} sx={{mb:1}} >

        <Card >

          <Box sx={{position:'relative'}}  >

       

          <CardMedia

          component="img"
          alt="green iguana"
          
          image={"https://oziocartimage.s3.amazonaws.com/media/"+item.value.proim1}
          style={{minHeight:'368px'}}
          className="col-12"
          onClick={()=>VisitPage(item)}
        />

          </Box>
     
        <CardContent>
          <Typography sx={{mb:1,fontWeight:'600'}}>
           {item.value.name} {item.value.size} {item.value.color}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           

            <Stack direction={'row'} spacing={1} >
              <Box>

                <Stack direction={'row'} spacing={1}>
                <Typography sx={{fontWeight:'600'}}>
                Price:
              </Typography>
              <Typography>
              <CurrencyRupeeIcon style={{fontSize:'13px'}} /><s>{item.value.sellingprice} </s>
              </Typography>
                </Stack>

              </Box>

              <Box>

          
              <Stack direction={'row'} spacing={1} >
              <Typography sx={{fontWeight:'600'}}>
                MRP:
              </Typography>
              <Typography>
              <CurrencyRupeeIcon style={{fontSize:'13px'}} /> {item.value.MRP}

              </Typography>
            </Stack>
           
                
              </Box>
              

            </Stack>


            <Stack direction={'row'} sx={{mb:1}} spacing={1}>
              <Box>

              <Stack sx={{mb:1}} direction={'row'} spacing={1}>
              <Typography sx={{fontWeight:"600"}}>Size:</Typography>
              <Typography>{item.value.size}</Typography>


              </Stack>

              </Box>

              <Box sx={{mb:1}}>

                <Stack direction={'row'} spacing={1}> 
                  <Typography sx={{fontWeight:'600'}}>

                      Quantity:
                  </Typography>

                  <Box>
                  <ButtonGroup variant="text" color="info" aria-label="outlined button group">
                  <Button>-</Button>
                  <Button>1</Button>
                  <Button>+</Button>
                </ButtonGroup>
                  </Box>

                </Stack>

             
                

              </Box>


            </Stack>


            <Stack direction={'row'} spacing={2} >
              <Button onClick={()=>Addtocart(item,item.id)} sx={{width:'50%',borderRadius:"50rem"}} variant="contained" color="warning" >
                Add to cart
              </Button>

              <Button onClick={()=>VisitShop(item)} sx={{width:'50%',borderRadius:'50rem'}} variant="contained" color="error" >
               Buy Now
              </Button>
            </Stack>

          </Typography>
        </CardContent>
       
       </Card>

       </Grid>

    )
})}

  
  </>
  :

<Grid sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}} item lg={12} xl={12} sm={12} md={12} xs={12}  > 


 <Typography sx={{fontWeight:"600"}}>No item </Typography>
 <Typography>
   <Button variant="contained" onClick={VisitAllProduct} sx={{bgcolor:"black",color:"white",mt:1}}>
     Continue Shopping
   </Button>
 </Typography>


</Grid>
  
}
  
</Grid>



}


</Container>

       <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={carterror}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
        autoHideDuration={3000}
        
        />


</Box>

        </>
    )
}


export default Wishlist
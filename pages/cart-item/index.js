import { Container, Paper, Typography,Divider,Alert, Grid,Stack,CardMedia } from "@mui/material"
import { useEffect, useState } from "react"

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import  Router  from "next/router";
import axios from "axios";
import Api from "../api/axioapi";
import server from "../api/apilink";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

import { Box } from "@mui/system";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function CartPage(){

    var x = [1,3,5,6,7]

    const [Product,setProduct] = useState(x)

    const [totalMRP,setTotoalMRP] = useState(0)
    const [totaldiscount,setTotalDiscount] =useState(0)
    const [Total,setTotal] = useState(0)
    const [loading,setLoading] = useState(true)
    
    const dispatch =useDispatch()

    useEffect(()=>{
        Api.post(`${server}/getallcartproduct`,{email:Cookies.get("user")}).then(res=>{

            FetchProduct(res.data)

        }).catch(er=>{
            setProduct([])
            setLoading(false)
        })


   

    },[])

    const MakrefreshPage=()=>{
     
            Api.post(`${server}/getallcartproduct`,{email:Cookies.get("user")}).then(res=>{
    
                FetchProduct(res.data)
    
            }).catch(er=>{
                setProduct([])
            })
    
        
    }

    const FetchProduct=(cartproduct)=>{

        Api.get(`${server}/getallproduct`).then(res=>{

                var temp = []
                var totalmrp= 0
                var discount = 0
              

                for(var i=0;i<res.data.length;i++){

                    

                    for(var j=0;j<cartproduct.length;j++){
                        if(cartproduct[j].sku==res.data[i].sku){

                                temp.push({name:i,value:res.data[i],quantity:cartproduct[j].quantity,id:cartproduct[j].id})

                                totalmrp+=Number(res.data[i].MRP*cartproduct[j].quantity)
                                discount +=(Number(res.data[i].MRP)-Number(res.data[i].sellingprice))*Number(cartproduct[j].quantity)

                                break;
                        }
                    }

                }

            
                
                
                var total = totalmrp-discount
              

                setProduct(temp)

                setTotalDiscount(discount)
                setTotoalMRP(totalmrp)
                setTotal(total)
                setLoading(false)
            
             
        })
    }


    const MakeIncrement=(id)=>{


        Api.post(`${server}/cartincrement`,{id:id}).then(res=>{

            MakrefreshPage()

            dispatch({
                type:"Cart",
                payload:true
            })
        })

    }

    const MakeDecrement=(id)=>{

        Api.post(`${server}/cartdecrement`,{id:id}).then(res=>{

            MakrefreshPage()
            dispatch({
                type:"Cart",
                payload:true
            })
        })

    }


    const VisitPayment=()=>{

        Router.push("/payment-page")
    }

    const RemoveProducfromCart=(id)=>{
        
        Api.post(`${server}/removefromcart`,{id:id}).then(res=>{

            MakrefreshPage()
            dispatch({
                type:"Cart",
                payload:true
            })

        })

    }

    const VisitPage=(item)=>{



        Router.push({pathname:`/product/${item.value.slug}`,query:{color:item.value.color,size:item.value.size}})
      
      }

    
const VisitAllProduct=()=>{

    Router.push('/allproduct')
  }

    return(
        <Box sx={{marginTop:{lg:'70px',mb:'120px',sm:'120px',xs:'120px',xl:'70px'},overflow:"hidden",mb:1,minHeight:"70vh"}} >

            <Container>
            
              {loading?<Box sx={{display:"flex",justifyContent:"center",alignItems:"center",fontWeight:"600",minHeight:"70vh"}}>
                Loading...
              </Box>:
              <>

                {Product.length>0?<>

              <Grid container spacing={1}>

                

                  <Grid item lg={8} xl={8} sm={12} xs={12} md={12}>

                  {Product.map((item,index)=>{
                

                return(
                <Paper key={index} sx={{p:1,mb:1,display:'flex',justifyContent:"center",alignItems:"center"}} >
                   

                    <Grid container spacing={1}>

                      <Grid item lg={4} xl={4} md={12} sm={12} xs={12}>

                        <CardMedia

                        component={'img'}

                        image={"https://oziocartimage.s3.amazonaws.com/media/"+item.value.proim1}

                        onClick={()=>VisitPage(item)}

                        />

                      </Grid>

                      <Grid item lg={4} sx={{p:2}} xl={4} md={12} sm={12} xs={12}>

                        
                      <Typography sx={{mb:1,fontWeight:'600',textTransform:"capitalize"}} >
                             <span>{item.value.name} {item.value.color} {item.value.size}</span> 
                          
                            </Typography>
                           
                                <Stack direction={"row"} spacing={1}>
                                  <Typography sx={{fontWeight:"600"}}>Price:</Typography>
                                  <Typography><s>{item.value.MRP}x{item.quantity}</s></Typography>
                                  <Typography>{item.value.sellingprice}x{item.quantity}</Typography>
                                </Stack>

                                <Stack direction={'row'} spacing={1}>
                                  <Typography sx={{fontWeight:"600"}}>Size:</Typography>
                                  <Typography>{item.value.size}</Typography>
                                </Stack>

                                <Stack direction={'row'} spacing={1}>
                                  <Typography sx={{fontWeight:"600"}}>Color:</Typography>
                                  <Typography>{item.value.color}</Typography>
                                </Stack>


                          

                      </Grid>

                      <Grid item lg={4} xl={4} md={12} sm={12} xs={12}>

                     <ButtonGroup variant="contained"  color='error' aria-label="outlined  button group">
                     <Button onClick={()=>MakeIncrement(item.id)} className="bg-dark text-white" >+</Button>
                     <Button className="bg-dark text-white mx-1" >{item.quantity}</Button>
                     <Button onClick={()=>MakeDecrement(item.id)} className="bg-dark text-white" >-</Button>
                     </ButtonGroup>


                      </Grid>

                    </Grid>


                 </Paper>
                )
                
            })}

                  </Grid>

                  <Grid item lg={4} xl={4} sm={12} xs={12} md={12}>

                  <Paper sx={{p:1}} >

<Typography sx={{textAlign:"center",fontWeight:"600",mb:1}}>Price details</Typography>

<Divider sx={{mb:1}}></Divider>

  <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",p:1,mb:1}}>

  <Typography sx={{fontWeight:"bold"}}>Price:</Typography>
  <Typography><CurrencyRupeeIcon  style={{fontSize:'13px'}}  />{totalMRP}</Typography>

  </Box>

  <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",p:1,mb:1}}>

  <Typography sx={{fontWeight:"bold"}}>Discount:</Typography>
  <Typography><CurrencyRupeeIcon  style={{fontSize:'13px'}}  />{totaldiscount}</Typography>
   </Box>

   <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",p:1,mb:1}}>

   <Typography sx={{fontWeight:"bold"}}>Delivery:</Typography>
 <Typography><s><CurrencyRupeeIcon  style={{fontSize:'13px'}}  />50</s></Typography>

   </Box>


<Divider></Divider>


<Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",p:1,mb:1}}>

<Typography sx={{fontWeight:"bold"}}>Total:</Typography>
  <Typography><CurrencyRupeeIcon  style={{fontSize:'13px'}}  />{Total} </Typography>
</Box>



<Typography>
   
    <Alert severity="info"  >Applied Extra 3% discount on prepaid order.</Alert>
  
   
</Typography>

<Box>

<Button  variant="contained" onClick={VisitPayment} sx={{mt:1,bgcolor:"black",color:"white",width:'100%',borderRadius:'50rem'}}  >
    Checkout 
</Button>

</Box>






                </Paper>



                  </Grid>

              </Grid>

              </>:

        <Grid sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}} item lg={12} xl={12} sm={12} md={12} xs={12}  > 


        <Typography sx={{fontWeight:"600"}}>No item </Typography>
        <Typography>
        <Button variant="contained" onClick={VisitAllProduct} sx={{bgcolor:"black",color:"white",mt:1}}>
            Continue Shopping
        </Button>
        </Typography>


        </Grid>

        }

              </>

        }




              
            </Container>

      
        </Box>
    )
}

export default CartPage
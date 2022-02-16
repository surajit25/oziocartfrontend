import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button, Container, Paper, Typography,Divider,Grid,Stack,CardMedia } from '@mui/material';
import { TextField } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Alert } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


import { useDispatch } from 'react-redux';

import Api from '../api/axioapi'

import server from '../api/apilink'

import Cookies from 'js-cookie';
import axios from 'axios';

import Router from 'next/router';
import { blueGrey } from '@mui/material/colors';


const steps = [
  'Address',
  'Order Details',
  'Payment',
];

export default function Paymentpage() {

  
  const [Product,setProduct] = React.useState([])

  const [totalMRP,setTotoalMRP] = React.useState(0)
  const [totaldiscount,setTotalDiscount] =React.useState(0)
  const [Total,setTotal] = React.useState(0)
  const [loading,setLoading] = React.useState(true)
  
  const dispatch =useDispatch()

  React.useEffect(()=>{
      Api.post(`${server}/getallcartproduct`,{email:Cookies.get("user")}).then(res=>{

          FetchProduct(res.data)

      }).catch(er=>{
          setProduct([])
          setLoading(false)
      })

      
    const script = document.createElement('script');

    script.src = 'https://checkout.razorpay.com/v1/checkout.js';

    script.async = true;

    document.body.appendChild(script);


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

  const [Address,setAddress] = React.useState({
    name:"",
    email:"",
    phone:"",
    address:"",
    pin:"",
    city:"",
    state:"",
    country:"",
    nameerror:"",
    emailerror:"",
    phonerror:"",
    addresserror:"",
    pinerror:"",
    countryerror:"",
    cityerror:"",
    stateerror:"",
    email2:Cookies.get("user")?Cookies.get("user"):""
  })

  



  const InputChange=(event)=>{
     
    setAddress({
      ...Address,
      [event.target.name]:event.target.value
    })
  }


  const [activestep,setActivestep] = React.useState(1)

  const handlenext=()=>{

    
    if(activestep==1){

      if(Address.name==""){
        setAddress({
          ...Address,
          nameerror:"Name not be null"
        })
      }else if(Address.email==""||Address.email.includes("@")==false||Address.email.includes(".")==false){

        setAddress({
          ...Address,
          emailerror:"Email is not valid",
          nameerror:""
        })
      }else if(Address.phone.length!=10){
        setAddress({
          ...Address,
          phonerror:"Enter valid phone number",
          emailerror:""
        })
      }else if(Address.address==""){
        setAddress({
          ...Address,
          phonerror:"",
          addresserror:"Address not be empty"
        })}
        else if(Address.pin.length!=6){
        setAddress({
          ...Address,
          pinerror:"Pin number should be 6 digit",
          phonerror:"",
          addresserror:""
        })
      }else if(Address.city==""){

        setAddress({
          ...Address,
          cityerror:"City not be empty",
          pinerror:"",
          
        })
      }else if(Address.state==""){
        setAddress({
          ...Address,
          stateerror:"State not be empty",
          cityerror:""
        })
      }else if(Address.country==""){

        setAddress({
          ...Address,
          countryerror:"Country not be empty",
          cityerror:""
        })
      }else{
        
        
        setActivestep(activestep+1)

      }


    }else{
         
    
      setActivestep(activestep+1)

    }

  }

  const handleback=()=>{

    setActivestep(activestep-1)
  }

  const [paymentmode,setPaymentmode] =React.useState('prepaid')

  const PaymentMethod=(id)=>{
     setPaymentmode(id)
  }

  const [loader,setLoader]  = React.useState(false)

  const PlaceOrder=()=>{

    setLoader(true)

    if(paymentmode=='cod'){
           CodOrder()
    }else{
          
          PrepaidOrder()
    }

  }

  const CodOrder=()=>{

    axios.post(`${server}/orderplacedcod`,{product:Product,address:Address}).then(res=>{
          
         setLoader(false) 
         Router.push("/order-success")
         DeleteCart()
    }).catch(er=>{
      
    })

  }

  const PrepaidOrder=()=>{

  axios.post(`${server}/paymentpage`,{
    name:Address.name,
    amount:Math.round(Total-Total*3/100),
    phone:Address.phone
  }).then(res=>{

            setLoader(false)

            let options = {
              "amount": res.data.payment.amount, 
              "name": "Despre.in",
              "image": '/logo.png',
              "order_id": res.data.payment.id,
              "prefill":{
                  'email':Address.email,
                  'contact':Address.phone
              },

              "readonly": { 'email': true, 'contact': true },

              "handler":function(response){
                  
                
                PaymentConfirmation(response,res.data.order.orderid)

                  
              }.bind(this)
              
          
            };

            let rzp = new window.Razorpay(options);

            rzp.on('payment.failed', function (response){
                  axios.post(`${server}/paymentfailed`,{response:response})
            });
            
          
            rzp.open()

  }).catch(er=>{
        
  })

 


  }

  const PaymentConfirmation=(response,orderid)=>{

    axios.post(`${server}/paymentsuccess`,{response:response}).then(res=>{
      PrepaidConfirm(orderid)
    }).catch(er=>{
      alert("somethis is wrong")
    })
  }


  const PrepaidConfirm=(orderid)=>{

    axios.post(`${server}/orderplacedprepaid`,{orderid:orderid,product:Product,address:Address}).then(res=>{
          
      Router.push("/order-success")
        
      DeleteCart()
    }).catch(er=>{

    })

  }

  const DeleteCart=()=>{

    axios.post(`${server}/deletecart`,{user:Cookies.get("user")}).then(res=>{

      dispatch({
        type:"Cart",
        payload:true
      })

    })
  }



  return (<>

<Box sx={{marginTop:{lg:'70px',mb:'130px',sm:'130px',xs:'130px',xl:'70px'},overflow:"hidden",mb:1,minHeight:"70vh"}}>


      <Container>
    
      
      <Grid container spacing={2}>

<Grid item lg={8} xl={8} sm={12} md={12} xs={12}>

<Box className='col-12' >
      <Stepper activeStep={activestep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

     
        <Box sx={{p:1,width:"100%"}} >
        
          {activestep==1?<Paper sx={{width:'100%'}}>

          
            <Typography sx={{fontWeight:'700',textTransform:'capitalize',textAlign:"center"}} >
                    Fill your address
                </Typography>
        
                <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",width:'100%'}} > 
        
                    <Stack direction={'column'} sx={{width:{lg:'90%',md:'100%',sm:"100%",xl:"90%",xs:"100%"},p:2}} spacing={1}>
                        <TextField
        
                           variant='outlined'
                           label='Your Name'
                           
                           sx={{mb:1,width:'100%'}}
                       

                           name='name'
                           value={Address.name}
                           onChange={InputChange}
                           
                           error={Address.nameerror!=""?Address.nameerror:""}

                           helperText={Address.nameerror!=""?Address.nameerror:""}

                        />
        
                        <TextField
        
                          variant='outlined'
        
                        label='Your Email'
                      
        
                        sx={{mb:1}}

                        name='email'
                        value={Address.email}
                        onChange={InputChange}
                        
                        error={Address.emailerror!=""?Address.emailerror:""}

                        helperText={Address.emailerror!=""?Address.emailerror:""}

                        />
        
                        <TextField
        
                        variant='outlined'
                        label='Your phone'
                        type='number'
                        sx={{mb:1}}

                        name='phone'
                        value={Address.phone}
                        onChange={InputChange}
                        
                        error={Address.phonerror!=""?Address.phonerror:""}

                        helperText={Address.phonerror!=""?Address.phonerror:""}
        
                        />


                     <TextField
                        
                        variant='outlined'
                        label='Address'

                        sx={{mb:1}}

                        
                        name='address'
                        value={Address.address}
                        onChange={InputChange}
                        
                        error={Address.addresserror!=""?Address.addresserror:""}

                        helperText={Address.addresserror!=""?Address.addresserror:""}

                        />


                            <TextField
                            
                            variant='outlined'
                            label='Pin'
                            sx={{mb:1}}

                            
                           name='pin'
                           value={Address.pin}
                           onChange={InputChange}
                           
                           error={Address.pinerror!=""?Address.pinerror:""}

                           helperText={Address.pinerror!=""?Address.pinerror:""}

                            />

                            <TextField
                            
                            variant='outlined'
                            label='City'

                            sx={{mb:1}}


                            
                           name='city'
                           value={Address.city}
                           onChange={InputChange}
                           
                           error={Address.cityerror!=""?Address.cityerror:""}

                           helperText={Address.cityerror!=""?Address.cityerror:""}

                            />


                         <TextField
                            
                            variant='outlined'
                            label='State'

                            sx={{mb:1}}

                            
                           name='state'
                           value={Address.state}
                           onChange={InputChange}
                           
                           error={Address.stateerror!=""?Address.stateerror:""}

                           helperText={Address.stateerror!=""?Address.stateerror:""}

                            />

                          <TextField
                            
                            variant='outlined'
                            label='Country'

                          sx={{mb:1}}

                            
                           name='country'
                           value={Address.country}
                           onChange={InputChange}
                           
                           error={Address.countryerror!=""?Address.countryerror:""}

                           helperText={Address.countryerror!=""?Address.countryerror:""}

                            />
        
                    </Stack>
        
        
                </Box>

          </Paper>:""}
          {activestep==2?<Paper sx={{width:'100%',p:1}}>

            <Box>
            {Product.map((item,index)=>{
                

                return(
                <Paper key={index} sx={{p:1,mb:1,display:'flex',justifyContent:"center",alignItems:"center"}} >
                   

                    <Grid container spacing={1}>

                      <Grid item lg={4} xl={4} md={12} sm={12} xs={12}>

                        <CardMedia

                        component={'img'}

                        image={"https://oziocartimage.s3.amazonaws.com/media/"+item.value.proim1}

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

                     <Button onClick={()=>MakeDecrement(item.id)} className="bg-dark text-white" >-</Button>


                     <Button className="bg-dark text-white mx-1" >{item.quantity}</Button>



                     <Button onClick={()=>MakeIncrement(item.id)} className="bg-dark text-white" >+</Button>
                     
               
                  
                     </ButtonGroup>


                      </Grid>

                    </Grid>


                 </Paper>
                )
                
            })}

          
             </Box>

          </Paper>:""}
          {activestep==3?<Paper>

          <Typography sx={{fontWeight:"600",textAlign:'center',mb:1,p:1}}>Payment Details</Typography>

     

        <Box sx={{mb:2,p:3,mt:2,bgcolor:blueGrey[500]}}>

          <CardMedia

          component={'img'}

          image="/secure.jpg"

          />


        </Box>
        <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>

     <Box sx={{p:2,mb:2}} >

    <Typography sx={{fontWeight:"bold",textAlign:"center",mb:2}} >Payment options</Typography>

    <FormGroup onChange={()=>PaymentMethod(event.target.value)} >

    <FormControlLabel value={'prepaid'} control={<Checkbox checked={paymentmode=='prepaid'?true:false} />} label="Prepaid" />
    <FormControlLabel  value={'cod'} control={<Checkbox checked={paymentmode=='cod'?true:false} />} label="Cash on delivery (COD)" />



    </FormGroup>

    </Box>

    <Box sx={{mt:2,p:2,mb:2,textAlign:"center"}} >
      <Stack direction={'row'} sx={{mb:2}} spacing={2}>
        <Typography sx={{fontWeight:"600"}}>Total:</Typography>
        <Typography><CurrencyRupeeIcon sx={{fontSize:"13px"}} />{paymentmode=='prepaid'?Math.round(Total-Total*3/100):Total}</Typography>
      </Stack>


    <Button sx={{bgcolor:"black",color:'white'}}  onClick={PlaceOrder} >

      {loader?
      <Box sx={{fontWeight:"600"}} >
        Loading...

    </Box>:"Place Order"}

    </Button>
    </Box>


        </Box>

    
        



          </Paper>:''}

         

        </Box>

        


      <Box sx={{display:"flex",justifyContent:"space-between",mt:2,mb:2}}>

      <Button variant='contained'   disabled={activestep==1?true:false} onClick={handleback} >
          Back
      </Button>

      <Button variant='contained' sx={{display:activestep==3?'none':"block",bgcolor:'black',color:'white'}} onClick={handlenext} >
        Next
      </Button>

      </Box>
    
    </Box>



  

</Grid>

<Grid item lg={4} xl={4} sm={12} md={12} xs={12}>

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
              <Typography><CurrencyRupeeIcon sx={{fontSize:"13px"}} /> {paymentmode=='prepaid'?Math.round(Total-Total*3/100):Total} </Typography>
           </Box>


       
            <Typography>
                {paymentmode=='prepaid'? <Alert severity="success"  >Applied Extra 3% discount on prepaid order.</Alert>
               :''}
               
            </Typography>

        
        

        </Paper>


</Grid>

</Grid>



      </Container>


    </Box>




    </>
  );
}

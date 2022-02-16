import { Button, Container, TextField,Paper, Typography,Grid, CardMedia } from "@mui/material"
import { useState } from "react"

import axios from 'axios'
import server from "../api/apilink"

import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';
import { getThemeProps } from "@mui/system";
import  Router  from "next/router";

import Cookies from 'js-cookie'
import { Box } from "@mui/system";

import { blue } from "@mui/material/colors";



function Login(props){

    const [Contact,setContact] = useState({
        email:"",
        otp:""
    })

    const Inputchange =(event)=>{
        
        setContact({
            ...Contact,
            [event.target.name]:event.target.value
        })
    }

    const [contacterror,setConacterror] = useState({
        emialerror:"",
        otperror:""
    })



    const [loader,setLoader] = useState(false)


    const [message, setMessage] = useState("")

    const [otprequest,setOtprequest] = useState(false)

    const SendOtpRequest=()=>{

        setLoader(true)

       if(Contact.email==""){
               setConacterror({
                   emialerror:"Email not be null",
                 
               })
               setLoader(false)
        }else if(Contact.email.includes("@")==false || Contact.email.includes(".")==false){
            setConacterror({
                emialerror:"Email is not valid",
            })
            setLoader(false)
        }else{

            
            axios.post(`${server}/sendloginotp`,{
               email:Contact.email
            }).then(res=>{

                setMessage(<span >Verification otp send .</span>)

                setOtprequest(true)

                handleopen()

                setLoader(false)

            }).catch(er=>{
                
                setMessage(<span className="text-danger">You are not register please register first.</span>)

                handleopen()

                setLoader(false)

            })


        }


    }

    const [loader2,setLoader2] = useState(false)

    const VerifyOtpRequest=()=>{

        setLoader2(true)

        if(Contact.otp==""){

            setConacterror({
                otperror:"Otp not be null"
            })
            
            setLoader2(false)

        }else{

            axios.post(`${server}/verifyloginotp`,{
                email:Contact.email,
                otp:Contact.otp
            }).then(res=>{
                  

            
                
                setMessage(<span className="text-white">You have successfully login wait for redirect.</span>)

                setContact({
                    otp:""
                })
                setLoader2(false)

                handleopen()

                Router.push("/")

           
                setTimeout(() => {



                    Cookies.set("user",Contact.email)

                    window.location.reload()
      
                    
                }, 2000);


            }).catch(er=>{

                
                setMessage(<span className="text-white">Otp not matched.</span>)

            
                handleopen()

                setLoader2(false)

            })

        }



    }

    const ResetForm=()=>{

        setContact({
            email:"",
            otp:""
        })

        setConacterror({
            emialerror:"",
            otperror:""
        })

        handleopen()
    }


    const  vertical='top'
    const horizontal='center'


    const [open, setOpen] = React.useState(false);
    
 
      const handleopen = () => {
          setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };



      const toggleregister=()=>{

        props.click()
          
      }

      const Visitregister=()=>{
          Router.push("/register")
      }


    return(<>

       <Box sx={{display:'flex',p:1,justifyContent: 'center',alignItems: 'center',marginTop:{lg:'80px',md:'140px',sm:'140px',xl:'80px',xs:'140px'}}}>


        <Box sx={{p:1,bgcolor:"#fafafa",width:{lg:'90%',md:"100%",xl:'90%',sm:"100%",xs:"100%"},minHeight:"60vh"}} >

              
        <Typography sx={{textAlign:'center',fontWeight:"600",mb:1,textTransform:"capitalize"}}>Welcom to Dycoz login page.</Typography>
    
               
            <Container>

         
            <Grid container spacing={1} >

                <Grid item sm={12} md={12} lg={6} xl={6} xs={12}>

                    
               
                <Box sx={{bgcolor:'darkolivegreen',borderRadius:'5px',p:2,color:"white"}}>

                <CardMedia

                component={'img'}

                image='/living.jpg'

                />
                
            
                 
                <Typography sx={{textAlign:"center",mt:1,mb:1}}>Log into your account for getting orders,wishlist and cart.</Typography>


                     
                </Box>


              


             

                </Grid>

                <Grid item sm={12} md={12} lg={6} xl={6} xs={12}>

                {otprequest?<>
                
                <TextField

                label='Enter OTP'
                variant='outlined'
                sx={{width:"100%",mb:1,borderColor:"black"}}


                error={contacterror.otperror!=""?true:false}
                helperText={contacterror.otperror!=""?contacterror.otperror:""}

                name="otp"
                value={Contact.otp}
                onChange={()=>Inputchange(event)}
          


                />

             

                <div className="col-lg-7 col-11 text-start">

                <Button

                variant="contained"
                className="bg-dark text-white"

                onClick={VerifyOtpRequest}
           
                >
                    {loader2?<Box sx={{p:1,fontWeight:'600'}}>
                       Loading...
                    </Box>:"Verify"}
                </Button>

                </div>
                </>:
                <>
                <TextField

                label='Enter Email'
                variant='outlined'
                sx={{width:"100%",mb:1}}

                error={contacterror.emialerror!=""?true:false}
                helperText={contacterror.emialerror!=""?contacterror.emialerror:""}

                name="email"
                value={Contact.email}
                onChange={()=>Inputchange(event)}
          


                />

             

                <Box>

                <Button

                variant="contained"
            
                sx={{bgcolor:"black",color:'white'}}

                onClick={SendOtpRequest}
           
                >
                    {loader?<Box sx={{p:1,fontWeight:'600'}}>
                       Loading...
                    </Box>:"Send otp"}
                </Button>

                </Box>
                </>
                    
                    }
                

                 
                  

                  <Typography onClick={toggleregister}  sx={{mb:1,color:blue[500],mt:4,textAlign:'center',display:{lg:"block",md:"none",xl:"block",sm:"none",xs:"none"}}}  style={{cursor:'pointer'}} >
                      New to DYCOZ?Create account.
                  </Typography>

                  <Typography onClick={Visitregister} sx={{mb:1,color:blue[500],mt:4,textAlign:'center',display:{lg:"none",md:"block",xl:"none",sm:"block",xs:"block"}}}   style={{cursor:'pointer'}} >
                      New to DYCOZ?Create account.
                  </Typography>


                </Grid>

            </Grid>


            </Container>
       
                
            
        </Box>



        
       </Box>
    

        <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
        autoHideDuration={4000}
        />




        </>
    )
}

export default Login
import { Button, Container, TextField,Paper, Typography ,Grid,CardMedia} from "@mui/material"
import { useState } from "react"

import axios from 'axios'
import server from "../api/apilink"

import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';

import Router from "next/router";

import { Box } from "@mui/system";
import { blue } from "@mui/material/colors";
import Cookies from "js-cookie";

function Register(props){

    const [Contact,setContact] = useState({
        email:"",
        phone:"",
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
        phoneerror:"",
        otperror:"",
    })

    const [loader,setLoader] = useState(false)
  
    const [message, setMessage] = useState("")

    const VerityandCreateuser=()=>{

        setLoader(true)

        if(contacterror.otp==""){

            setConacterror({
                   otperror:"OTP not be null"
            })
            setLoader(false)
        }else{
            
            axios.post(`${server}/verifyotpandcreatenewuser`,{
                email:Contact.email,
                phone:Contact.phone,
                otp:Contact.otp
            }).then(res=>{

                
 
                setMessage(<span className="text-succes">Account created successfully.</span>)
                
                handleopen()

                Cookies.set("user",Contact.email)
                Router.push("/")

                setTimeout(() => {



                    Cookies.set("user",Contact.email)

                    window.location.reload()
      
                    
                }, 2000);

            


            }).catch(er=>{
                setOtprequest(true)
 
                setMessage(<span className="text-succes">Otp not matched</span>)

                handleopen()

                setContact({
                    otp:""
                })

                setLoader(false)
            })

            setLoader(false)
        }



    }

    const [otprequest,setOtprequest] = useState(false)

    const OtpRequestforverification=()=>{


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
         }else if(Contact.phone==""){
             setConacterror({
                 phoneerror:"Phone not be null",
             })
             setLoader(false)
         }else if(Contact.phone.length!=10){
             setConacterror({
                  phoneerror:"Phone number should have 10 digit",
             })
             setLoader(false)
         }else{
 
             
             axios.post(`${server}/sendotpfornewuser`,{
                email:Contact.email
             }).then(res=>{

                 setOtprequest(true)
 
                 setMessage(<span className="text-succes">Otp send to your email.</span>)
 
                //  ResetForm()

                handleopen()
 
                 setLoader(false)
 
             }).catch(er=>{
                 
                 setMessage(<span className="text-danger">You are already there!</span>)
             
                 handleopen()
 
                 setLoader(false)
 
             })
 
 
         }

    }

    const ResetForm=()=>{

        setContact({
            email:"",
            phone:"",
            otp:""
        })

        setConacterror({
            emialerror:"",
            phoneerror:"",
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


      const togglelogin=()=>{

        props.click()
          
      }

      const Visitlogin=()=>{
          Router.push("/login")
      }


      


    return(
        <Box sx={{display:"flex",p:1,justifyContent:"center",alignItems:"center",marginTop:{lg:'80px',md:'140px',sm:'140px',xl:'80px',xs:'140px'}}}  >

        <Box  sx={{p:1,width:{lg:'90%',md:"100%",xl:'90%',sm:"100%",xs:"100%"},bgcolor:"#fafafa"}}  >

              
        <Typography sx={{textAlign:'center',fontWeight:"600",mb:1,textTransform:"capitalize"}}>Welcom to Dycoz Register page.</Typography>


            <Container>

            <Grid container spacing={1} >

            <Grid item sm={12} md={12} lg={6} xl={6} xs={12}>


            <Box sx={{bgcolor:'darkolivegreen',borderRadius:'5px',p:2,color:"white"}}>

            <CardMedia

            component={'img'}

            image='/living.jpg'

            />
                
          
            <Typography sx={{textAlign:"center",mt:1,mb:1}}>We are here for you please make register with us.We assure you that we will not make you disappointed.</Typography>


                 
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



<Box >

<Button

variant="contained"

sx={{bgcolor:"black",color:"white",mb:1}}

onClick={VerityandCreateuser}

>
{loader?<Box sx={{p:1,fontWeight:'600'}}>
                Loading...
         </Box>:"Verify"}

</Button>

</Box>




</>

:<><TextField

    label='Enter Email'
    variant='outlined'
    sx={{width:"100%",mb:1,borderColor:"black"}}

    error={contacterror.emialerror!=""?true:false}
    helperText={contacterror.emialerror!=""?contacterror.emialerror:""}

    name="email"
    value={Contact.email}
    onChange={()=>Inputchange(event)}



    />


<TextField

label='Enter phone'
variant='outlined'
sx={{width:"100%",mb:1,borderColor:"black"}}
type='number'

error={contacterror.phoneerror!=""?true:false}
helperText={contacterror.phoneerror!=""?contacterror.phoneerror:""}

name="phone"
value={Contact.phone}
onChange={()=>Inputchange(event)}



/>



<Box  >

<Button

variant="contained"

sx={{bgcolor:"black",color:"white"}}

onClick={OtpRequestforverification}

>
{loader?<Box sx={{p:1,fontWeight:'600'}}>
                Loading...
                </Box>:"Send otp"}
</Button>

</Box>
</>}



<Typography onClick={togglelogin}  sx={{mb:1,mt:4,textAlign:'center',color:blue[500],display:{lg:"block",md:"none",xl:"block",sm:"none",xs:"none"},cursor:"pointer"}}  >
  Already there?login.
</Typography>

<Typography onClick={Visitlogin}  sx={{mb:1,mt:4,textAlign:'center',color:blue[500],display:{lg:"none",md:"block",xl:"none",sm:"block",xs:"block"},cursor:"pointer"}}  >
  Already there?login.
</Typography>


 
            </Grid>

            </Grid>


            </Container>
       
                
            
        </Box>

        <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
        autoHideDuration={4000}
        />

        </Box>
    )
}

export default Register
import { Button, Container, Skeleton, Typography,CardMedia,Card } from "@mui/material"
import axios from "axios"

import Router from "next/router"
import { useEffect, useState } from "react"

import server from "../api/apilink"
import Api from "../api/axioapi"

import { Box } from "@mui/system";
import Carsouel, { CarsouelItem } from "../carsouel";

function FirstBanner(){

    const [Banner,setBanner] = useState([])
    const [loading,setLoading] =useState(true)

    useEffect(()=>{

        Api.get(`${server}/getbanner`).then(res=>{

            setBanner(res.data)
            setLoading(false)

        }).catch(er=>{

        })

    },[])

    const VisitProduct=(id)=>{
      

        alert('workings')
        Router.push(`/${id}`)
    }

    return(
        <Box sx={{marginTop:{lg:'60px',mb:'130px',sm:'130px',xs:'130px',xl:'60px'},overflow:"hidden",mb:1,}}>

        {loading?<Box sx={{display:"flex",justifyContent:"center",alignItems:"center",height:{lg:"300px",md:"150px",sm:"150px",sm:"150px",xl:"300px"},fontSize:"20px",fontWeight:"600"}}>Loading...</Box>:

          <Carsouel width={'100'} > 

                {Banner.map(item=>{

                return( 
                <CarsouelItem url={item.url}   key={item.id} >

                <CardMedia
                component={'img'}

                image ={'https://oziocartimage.s3.amazonaws.com/media/'+item.image}

                sx={{width:"100%",cursor:"pointer"}}

                customClickEvent={()=>VisitProduct(item.url)}


                />



                </CarsouelItem>
            
                )

                })}


          </Carsouel>



        }



        </Box>
    )
}

export default FirstBanner
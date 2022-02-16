import { Button, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


import { useSwipeable } from 'react-swipeable';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import  Router  from "next/router";

export const CarsouelItem=({children,width,url})=>{


    const VisitPage=()=>{

       Router.push(url)
    }
    return(
        <div onClick={()=>VisitPage()} className="carsouel-item" style={{width:width}}>

           {children}

        </div>
    )
}

const Carsouel= ({children,width})=>{

    const [activeitem,setActiveitem] = useState(0)

 
    const [Dots,setDots]  =useState([])

    const [paused,setPaused] = useState(false)
    useEffect(()=>{
         
        
        const interval = setInterval(()=>{

          
            if(!paused){

             UpdateIndex(activeitem+1)
  
            }

        
           
        },3000)

        

        return(()=>{
            if(interval){
                clearInterval(interval)
            }
        })

    })
    

    const UpdateIndex=(index)=>{

        if(index<0){
            index=React.Children.count(children)-1
        }else if(index>React.Children.count(children)-1){
          index=0
        }

   
        setActiveitem(index)


    }

    const handlers=useSwipeable({
        onSwipedLeft:()=>UpdateIndex(activeitem+1),
        onSwipedRight:()=>UpdateIndex(activeitem-1)
    })



    return(
        <div onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} {...handlers} className="carsouel">

            <div className="inner" style={{transform:`translateX(-${activeitem*width}%)`}}>

                {React.Children.map(children,(child,index)=>{
                    return React.cloneElement(child,{width:width})
                })}


            </div>

            <Box sx={{display:{lg:"block",md:"none",xs:"none",sm:"none",xl:'block'},width:"100%"}}>

            <Box sx={{position:"absolute",display:"flex",justifyContent:"space-between",padding:'20px',top:'35%',width:"100%"}}> 
                    <button className="button" onClick={()=>UpdateIndex(activeitem-1)} >
                       <ArrowBackIosNewIcon sx={{color:"black"}} />
                    </button>

                    <button className="button"  onClick={()=>UpdateIndex(activeitem+1)}  >
                     <ArrowForwardIosIcon sx={{color:"black"}} />
                    </button>
                </Box>

            </Box>


            <Box sx={{position:"absolute",bottom:'10px',zIndex:'100',display:"flex",justifyContent:"center",alignItems:"center",width:"100%",}}>

                <Stack direction={'row'} spacing={1}>

                {React.Children.map(children,(child,index)=>{

                    return(<>
                    <Typography>
                        <FiberManualRecordIcon onClick={()=>UpdateIndex(index)} sx={{color:activeitem==index?"#2196f3":"white",fontSize:"12px"}} />
                    </Typography>
                    </>)
                    })}

                </Stack>

                
             
             
             
            </Box>


         



        

        </div>
    )

}

export default Carsouel
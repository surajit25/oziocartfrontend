import { Paper,Box,Typography,List,ListItem,ListItemText, Stack } from "@mui/material"
import Router  from "next/router"
import { useEffect, useState } from "react"
import server from "../api/apilink"
import Api from "../api/axioapi"

import CustomInput  from "../inputfield"


import CallMadeIcon from '@mui/icons-material/CallMade';


export default function DesktopSearch(props){

   

  const topsearch=['bra','Panty','men underwear','men shorts']

    const [SearchResult,setSearchResult]= useState([])

    const [Topsearch,setTopsearch] = useState([])

    const [searchvalue,setSearchvalue] = useState("")

    const [showsearch,setSearchshow] = useState(false)

    useEffect(()=>{

      
        setTopsearch(topsearch)

    },[])


    const SearchResultfunction=(value)=>{

        setSearchvalue(value)

         if(value){
            Api.get(`${server}/searchresult/?search=${value}`).then(res=>{


                let temp =[]

                for(var i=0;i<res.data.length;i++){
                    temp.push(res.data[i])
                }

                setSearchResult(temp)

                setSearchshow(true)
            }).catch(er=>{

             
                setTopsearch(topsearch)

                setSearchshow(false)

            })
         }else{
          
             setTopsearch(topsearch)
             setSearchshow(false)
         }
        
    }

    const VisitProductpage=(item)=>{


        Router.push({pathname:`/product/${item.slug}`,query:{size:item.size,color:item.color}})

        props.click()

    }

    return(
        <>
        <Paper className='desksearch' sx={{position:"absolute",left:"-100%",zIndex:"100",maxHeight:'350px',overflow:"scroll",top:"0px",width:"400px",p:1}}>

                  <Box sx={{position:'sticky',width:"100%",top:"4px",zIndex:"102"}} >

                  <CustomInput value={searchvalue} onChange={()=>SearchResultfunction(event.target.value)} placeholder="Search ..." />


                  </Box>
              
                  <Box sx={{mt:2,mb:1}}>

                    <Typography sx={{fontWeight:"600"}} >

                        {showsearch?'Search results':"Top Searches"}
                        
                    </Typography>

                  </Box>

                  {showsearch?
                  <Box sx={{mt:1}}>

                      {SearchResult.map((item,index)=>{

                          return(
                            <Stack key={index} sx={{p:2,border:'1px solid black',mb:1,borderRadius:"4px",display:'flex'}}  onClick={()=>VisitProductpage(item)} direction={'row'} spacing={2}>

                            <Box sx={{display:"flex",flexGrow:1}}>

                            <Typography >
                                      <img height={30} src={item.proim1} />
                                  </Typography>

                              <Typography sx={{fontWeight:"600",fontSize:'15px',mx:1,}}>{item.name} {item.color} </Typography>


                            </Box>
                            
                              <Typography><CallMadeIcon /></Typography>

                       </Stack>
                          )
                      })}

                  </Box>:

                    <Box sx={{mt:1}}>

                    {Topsearch.map((item,index)=>{

                        return(
                            <Stack key={index} sx={{p:2,border:'1px solid black',mb:1,borderRadius:"4px",display:'flex'}} onClick={()=>SearchResultfunction(item)} direction={'row'} spacing={2}>
                              
                            <Typography sx={{fontWeight:"600",textTransform:"capitalize",fontSize:'15px',flexGrow:1}}>
                              {item}
                             </Typography>
     
                             <Typography >
                                <CallMadeIcon />
                             </Typography>
     
                          </Stack>
                        )
                    })}

                    </Box>


                    }

              
                </Paper>
        </>
    )
}
import { Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

import { Input } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';


export default function Question(){

    const v =[1,2,3,5,6]

    const [Question,setquestion] = useState([])

    useEffect(()=>{
        setquestion(v)
    },[])


    return(
        <>
       
        
            <Typography sx={{textAlign:"center",fontWeight:'600',mb:2,mt:2}} >Question and Answer</Typography>

            <Box sx={{mt:2}}>

                  
                <Paper sx={{p:2}}>

                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}} >

                        <Stack spacing={1} direction={'row'} sx={{mb:2}} >

                        <Typography>

                
                        <Input 

                        placeholder="Search Your Query"

                        

                        />


                        </Typography>

                        <Typography  >

                            <SearchIcon className="cursor" />
                          
                        </Typography>
                

                        </Stack>
                        
                

                    </Box>


                    {Question.map(item=>{
                        return(
                            <Box key={item} sx={{mb:2}} >
                              <Typography  >
                        <Stack spacing={1} direction={'row'} >

                            <Typography sx={{fontWeight:'700'}} >
                            Question:

                            </Typography>

                            <Typography sx={{fontWeight:'600'}} >
                            How is this product is usefull?
                            </Typography>
                        
                        </Stack>
                       
                    </Typography>

                    <Typography>
                        <Stack spacing={1} direction={'row'} >
                          <Typography sx={{fontWeight:'600'}} >
                          Answer:
                          </Typography>
                          
                          <Typography>
                              This is superb product
                          </Typography>
                        </Stack>
                        
                    </Typography>

                            </Box>
                        )
                    })}

                    <Box sx={{display:"flex",justifyContent:'center',alignItems:'center'}} >
                        <Button variant="contained" >
                            Ask Your Query
                        </Button>
                    </Box>
                  
                </Paper>
            </Box>

         
        </>
    )
}
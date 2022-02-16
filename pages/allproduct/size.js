
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { blueGrey, grey } from "@mui/material/colors";


import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


import { Typography,Stack } from '@mui/material';

export default function SizeFilter(props){


    const [expanded, setExpanded] = React.useState('panel1');

const handleChange = (panel) => (event, isExpanded) => {
  setExpanded(isExpanded ? panel : false);
};

const [Size,setSize] = React.useState([])

React.useEffect(()=>{

    setSize(props.size)

},[])


const [Sizevalue,setSizeValue] = React.useState([''])


const handleclick=(item)=>{

 var cat=Sizevalue
 var index= cat.indexOf(item)
 var newcat=[...cat]

 if(index==-1){
     newcat.push(item)
 }else{
     newcat.splice(index,1)
 }


 setSizeValue(newcat)


 props.handlesize(newcat)

}


    return(
        <>


<Accordion  sx={{mb:1}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Size
                    </Typography>
                    
                    </AccordionSummary>
                    <AccordionDetails>

                        <Stack direction={'column'} spacing={1} >

                         {Size.map(item=>{
                        return(
                          <FormGroup key={item} onChange={()=>handleclick(item)}>
                          <FormControlLabel control={<Checkbox  defaultChecked={Sizevalue.indexOf(item)>0?true:false} />} label={<span className="text-capitalize" >{item}</span>} />
                          
                          </FormGroup>
                        )
                      })}

                        </Stack>

                 


                    </AccordionDetails>
                  </Accordion>

        </>
    )
}
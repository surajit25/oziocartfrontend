import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { green } from "@mui/material/colors";

export default function OrderSuccess(){


    const VisitAllProduct=()=>{

        Router.push('/allproduct')
      }
      

    return(
        <>
          <Box sx={{marginTop:{lg:'60px',mb:'120px',sm:'120px',xs:'120px',xl:'60px'},overflow:"hidden",mb:1,p:2,minHeight:"70vh"}}>

              <Box sx={{display:'flex',justifyContent:"center",alignItems:"center",flexDirection:"column"}}>

              <Typography sx={{textAlign:"center",color:green[500]}}>
                Order placed Successfully.
            </Typography>

            <Typography>
        <Button variant="contained" onClick={VisitAllProduct} sx={{bgcolor:"black",color:"white",mt:1}}>
            Continue Shopping
        </Button>
        </Typography>

              </Box>

          
        </Box>
        </>
    )
}
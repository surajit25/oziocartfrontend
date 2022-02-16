import { Container, isMuiElement } from "@mui/material"

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Router from "next/router";
import Api from "../api/axioapi";
import server from "../api/apilink";

function Blog(){

    const [blog,setBlog] = React.useState([])


    React.useEffect(()=>{

      Api.post(`${server}/getallblog`).then(res=>{
        setBlog(res.data)
        console.log(res.data)
      })

      
    },[])

    const VisitIndividualPage=(id)=>{
          Router.push(`/visit-blog/${id.replaceAll(" ","-").toLowerCase()}`)
        
    }


    return(<>
        <div className="firstbanner blog p-3 mb-3">

            <Container>
               <div className="row">
                {blog.map(item=>{
                    return(<div key={item} className='col-lg-4  col-12 mb-2' >

                        <Card className='col-12'>
                        <CardMedia
                          component="img"
                          alt="green iguana"
                          height="150"
                          image={"https://despreimage.s3.ap-south-1.amazonaws.com/media/"+item.image}
                          className="col-12"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            <h1 className="fs-6 lh-1">{item.name}</h1>
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <div dangerouslySetInnerHTML={{__html:item.shortcontent}} />
                          </Typography>
                        </CardContent>
                        <CardActions>
                          {/* <Button size="small">Share</Button> */}
                          <Button size="small" onClick={()=>VisitIndividualPage(item.name)} >Learn More</Button>
                        </CardActions>
                       </Card>

                       </div>

                    )
                })}

              </div>
       

            </Container>

      
        </div>

        </>
    )
}

export default Blog
import { Container, Typography } from "@mui/material"
import { useEffect } from "react"

import Api from "../api/axioapi"

import server from "../api/apilink"
import Head from "next/head"

function BlogVisit(props){

    const Blog = props.blog[0]




    return(
        <>
       
        <div className="firstbanner blog">

        <Head>
          <title>{Blog.name}</title>
          <meta name="description" content={Blog.description1} />
        </Head>
            
            <Container>
                  
               <p className=" fw-bold mb-2 productdescription text-center">{Blog.name}</p>

                <Typography className="mb-2">
                   <div dangerouslySetInnerHTML={{__html:Blog.description1}} />
                </Typography>
               
               <div className="col-12 mb-2">
                   <img src={"https://despreimage.s3.ap-south-1.amazonaws.com/media/"+Blog.image}  className="col-12"/>
               </div>

               <Typography className="mb-5 mt-2">
                  <div dangerouslySetInnerHTML={{__html:Blog.description2}} />
               </Typography>


            </Container>

        </div>
        
        </>
    )
}



export async function getStaticPaths() {
    // Call an external API endpoint to get posts
     const res = await Api.post(`${server}/getindividualallblog`).then(res=>{return res.data})

    // Get the paths we want to pre-render based on posts
    const paths =res.map((item) => ({
      params: { name:item.name.split(" ").join("-") },
    }))
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
  }
  
  // This also gets called at build time
  export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    // const res = await fetch(`https://.../posts/${params.id}`)
    // const post = await res.json()

    const name = params.name.split("-").join(" ")

    const res = await Api.post(`${server}/individualblog`,{name:name}).then(res=>{return res.data})
   

  
    // Pass post data to the page via props
    return { props: { blog:res, } }
  }

export default BlogVisit
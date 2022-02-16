import React from "react"

const UseIntersectionObserver=({target,onInterSect,threshold='0.1',rootMargin="0px"})=>{

    React.useEffect(()=>{

        const observer = new IntersectionObserver(onInterSect,{rootMargin,threshold})

        const current = target.current

        observer.observe(current)


        return(()=>{
            observer.unobserve(current)
        })

    })
 


}

export default UseIntersectionObserver
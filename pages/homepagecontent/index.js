import CategoryWise from "../category-wise-product"
import DealOfDay from "../deal-of-the-day"
import FirstBanner from "../FirstBanner"
import HandPicked from "../hand-picked-by-us"
import Seo from "../homepage-seo-content"
import PartnarBrand from "../our-partnar"
import Secondbanner from "../SecondBanner"
import StockClearance from "../stock-clearance"
import Trending from "../trending-product"

import { Box } from "@mui/system"

function HomeContent(){

    return(
        
        <Box sx={{overflow:"hidden"}}>

            

            <FirstBanner />

            <Trending />

            

            <DealOfDay />

            <PartnarBrand />

            {/* <HandPicked /> */}

            <StockClearance />

            <Seo />

        </Box>
        
    )
}

export default HomeContent
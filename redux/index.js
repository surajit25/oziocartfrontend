
import {createStore} from 'redux'

const InitialState={
    cart:false,
    wishlist:false,
}

const MakeReducer = (state=InitialState,action)=>{

    switch(action.type){
        case "Cart":
            console.log('working')
            return ({cart:action.payload})
        case "Wishlist":
            return ({cart:action.payload})
        default:
            return state
    }

}

const Store =createStore(MakeReducer)

export default Store
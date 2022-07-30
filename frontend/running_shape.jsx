import React from "react";
import ReactDOM  from "react-dom";
import Root from './components/root'
import configureStore from './store/store'
document.addEventListener('DOMContentLoaded',()=>{
    let root = document.getElementById('root')
    let preLoaded = {};
    if(currentUser != null){
        preLoaded = {
            entities:{users:currentUser},
            session:{currentUserId:Object.keys(currentUser)[0]},
            errors: []
        }
    }
    const store = configureStore(preLoaded);

    ReactDOM.render( <Root store={store}/>,root)

    // debug only
    window.store = store;
})
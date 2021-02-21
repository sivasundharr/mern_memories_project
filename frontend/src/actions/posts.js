import {CREATE,FETCH_ALL,DELETE,UPDATE,LIKE} from '../constants/actionTypes';
import * as api from '../api';
// action creators

export const getPosts = () =>async(dispatch)=>{

    try{
        const { data } = await api.fetchPosts();
        dispatch({type:FETCH_ALL,payload:data});

    }catch(err){
        console.log(err);
    }

   // const action = {type:'FETCH_ALL',payload:[]}
    //dispatch(action)
}

export const createPost = (post) =>async(dispatch)=>{
    try{
        const {data} = await api.createPost(post);
        dispatch({type:CREATE,payload:data})
    }
    catch(err){
        console.log(err);
    }
}

export const updatePost = (id,post)=>async(dispatch)=>{
    try{
       const {data} = await api.updatePost(id,post);
       dispatch({type:UPDATE,payload:data});
    }
    catch(err){
        console.log(err);
    }
}

export const deletePost = (id)=>async(dispatch)=>{
    try{
        await api.deletePost(id);
        dispatch({type:DELETE,payload: id});
    }
    catch(err){
        console.log(err);
    }
}

export const likePost = (id) =>async(dispatch)=>{
    try{
        const {data} = await api.likePost(id);
        dispatch({type:LIKE,payload:data});
     }
     catch(err){
         console.log(err);
     }
}
import { atom } from "recoil";
// interface TodoType {
//     _id:string;
//     title:string;
//     description:string;
//     done:boolean;
//   }
export const authState = atom({
    key:'authState',
    default:{
        token:null,
        username:null
    }
})

export const todoState = atom({
    key:'todoState',
    default:{
        isLoading:true,
        isTodo:[]
    }
})
import { useReducer, useContext, createContext, Dispatch } from 'react';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";

// const CHANGE_COLOR = 'background/CHANGE_COLOR' as const;
// const ONE_COLOR = 'background/ONE_COLOR' as const;
// const GRADIENT = 'background/GRADIENT' as const;
// const IMAGE = 'background/IMAGE' as const;


type bgState = {
    color: string,
    rgb: string,
    img: string,
    isImg : boolean,
};

const initialState: bgState = {
    color: '#dece56',
    rgb: '',
    img:'',
    isImg: false,
}

export const backgroundSlice = createSlice({
    name: 'background',
    initialState,
    reducers: {
        changeColor(state, action: PayloadAction<string>) {
            state.color = action.payload;
        },
        oneColor(state,action: PayloadAction<string>){
            state.color = action.payload;
            state.rgb = initialState.rgb;
            state.img = '';
            state.isImg = false;
        },
        gradient(state, action: PayloadAction<string>) {
            state.rgb = action.payload;
            state.img = initialState.img;
            state.isImg = false;
        },
        getImage(state, action: PayloadAction<string>) {
            state.img = action.payload;
            state.isImg = true;
        }
    }
})

export const {oneColor, gradient, changeColor, getImage} = backgroundSlice.actions;
export default backgroundSlice.reducer;

// type bgAction = 
// | {type: 'CHANGE_COLOR'; color: string}
// | {type: 'ONE_COLOR'; color: string, rgb: string} 
// | {type: 'GRADIENT'; color: string, rgb: string} 
// | {type: 'IMAGE'; img: string, isImg: boolean};

// type bgDispatch = Dispatch<bgAction>;

// const BgStateContext = createContext<bgState | null>(null);
// const BgDispatchContext = createContext<bgDispatch | null>(null);

// function reducer(state: bgState, action: bgAction): bgState {
//     console.log(state);
//     switch(action.type) {
//         case 'CHANGE_COLOR': return {
//           ...state,
//             color: action.color,
//         }
//         case 'ONE_COLOR': return {
//             color: action.color,
//             rgb: '',
//             img: '',
//             isImg: false,
//         }
//         case 'GRADIENT': return {
//             color: action.color,
//             rgb: action.rgb,
//             img: '',
//             isImg: false,
//         }
//         case 'IMAGE' : return {
//             ...state,
//             img: action.img,
//             isImg: true,
//         };
//         default: 
//             throw new Error('Unhandled action');
//     }
    
// };

// export function BgProvider({children}: {children: React.ReactNode}) {
//     const [state, dispatch] = useReducer(reducer, {
//         color: '#dece56',
//         rgb: '',
//         img:'',
//         isImg: false,
//     });
    
//     return (
//         <BgStateContext.Provider value={state}>
//             <BgDispatchContext.Provider value={dispatch}>
//                 {children}
//             </BgDispatchContext.Provider>
//         </BgStateContext.Provider>
//     );
// };

// export function useBgState() {
//     const state = useContext(BgStateContext);
//     if(!state) throw new Error('Cannot find BgProvider');
//     return state;
// };

// export function useBgDispatch() {
//     const dispatch = useContext(BgDispatchContext);
//     if(!dispatch) throw new Error('Cannot find BgProvider');
//     return dispatch;
// };

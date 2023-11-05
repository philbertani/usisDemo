import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const towerPos = [[60,5],[20,1],[40,25],[42,29],[70,25],[20,40],[35,55],[70,55],[60,80],[80,50],[86,50]];

const towerData = [
  {id:"t01", name:"Tower 1", description:"USIS", type:"4G", xCoord:60, yCoord: 5},
  {id:"t02", name:"Tower 2", description:"USIS", type:"5G", xCoord:20, yCoord: 1},
  {id:"t03", name:"Tower 3", description:"USIS", type:"4G", xCoord:40, yCoord: 25},
  {id:"t04", name:"Tower 4", description:"USIS", type:"4G", xCoord:42, yCoord: 29},
  {id:"t05", name:"Tower 5", description:"USIS", type:"4G", xCoord:70, yCoord: 25},
  {id:"t06", name:"Tower 6", description:"USIS", type:"5G", xCoord:20, yCoord: 40},
  {id:"t07", name:"Tower 7", description:"USIS", type:"4G", xCoord:35, yCoord: 55},
  {id:"t08", name:"Tower 8", description:"USIS", type:"4G", xCoord:70, yCoord: 55},
  {id:"t09", name:"Tower 9", description:"USIS", type:"5G", xCoord:60, yCoord: 80},
  {id:"t10", name:"Tower 10", description:"USIS", type:"4G", xCoord:80, yCoord: 50},
  {id:"t11", name:"Tower 11", description:"USIS", type:"4G", xCoord:86, yCoord: 50},
]

export const fetchAllCampuses = createAsyncThunk('/api/campuses',async ()=>{
    try {
        return towerData;
    }
    catch (err) {
        console.log(err)
    }
})

const campusesSlice = createSlice({
    name: 'campuses',
    initialState: {
        apiData: [],
        hover: [],
        divRefs: [],
        dbUpdated: false
    },
    reducers: {
        setHover(state,action) { 
            state.hover = action.payload           
        },
        setDBupdated(state,action) {
            state.dbUpdated = true
        },
        setDivRefs(state,action) {
            state.divRefs = action.payload
        }
 
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCampuses.fulfilled, (state,action)=>{
            state.apiData = action.payload
            state.dbUpdated = false
        })
    }
})

export const selectHover = (state)=>{
    return state.campuses.hover;
}
export const selectDBupdated = (state)=>{
    return state.campuses.dbUpdated
}
export const selectDivRefs = (state) => {
    return state.campuses.divRefs
}

export const selectAllCampuses = (state)=>{
    //console.log(state)
    return state.campuses.apiData
}

export const { setHover, setDBupdated, setDivRefs } = campusesSlice.actions;

export default campusesSlice.reducer;
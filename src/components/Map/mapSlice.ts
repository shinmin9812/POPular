import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Coord {
  lat: number;
  lng: number;
}

interface Map {
  getCenter(): {
    Ma: number;
    La: number;
  };
  setCenter(coord: Coord): () => void;
  panTo(coord: Coord): () => void;
}

interface Marker {
  setMap(deleted?: null): () => void;
}

export interface MapState {
  map: Map | null;
  selectedId: string;
  currentIdx: number;
  markers: Marker[];
}

const initialState: MapState = {
  map: null,
  selectedId: '',
  currentIdx: 0,
  markers: [],
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMap: (state, action) => {
      state.map = action.payload;
    },
    setSlectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setCurrentIdx: (state, action) => {
      state.currentIdx = action.payload;
    },
    setMarkers: (state, action) => {
      state.markers = action.payload;
    },
  },
});

export const mapReducer = mapSlice.reducer;
export const mapActions = mapSlice.actions;

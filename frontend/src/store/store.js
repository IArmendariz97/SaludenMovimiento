import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/user/userSlice";
import { rutinasSlice } from "../features/rutinas/rutinasSlice";
import { authSlice } from "../features/auth/authSlice";
import { layoutSlice } from "@/features/layout/layoutSlice";
import { postsSlice } from "@/features/posts/postsSlice";
import { exerciseSlice } from "@/features/exercises/exerciseSlice";
import { groupSlice } from "@/features/group/groupSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Configurar la persistencia para el slice auth
const authPersistConfig = {
  key: "auth",
  storage: storage,
};

const rootReducer = {
  users: userSlice.reducer,
  rutinas: rutinasSlice.reducer,
  auths: persistReducer(authPersistConfig, authSlice.reducer),
  layout: layoutSlice.reducer,
  posts: postsSlice.reducer,
  groups: groupSlice.reducer,
  exercises: exerciseSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);

export { store, persistor };

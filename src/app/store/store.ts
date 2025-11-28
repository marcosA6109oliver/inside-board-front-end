import { createStore } from "redux";
import rootReducer from "../reducers";

export type RootState = ReturnType<typeof rootReducer>;

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("state");
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
        return undefined;
    }
};

const store = createStore(rootReducer, loadState());

store.subscribe(() => {
    localStorage.setItem("state", JSON.stringify(store.getState()));
});

export default store;

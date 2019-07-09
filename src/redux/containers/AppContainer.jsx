import { AppContainer as HotLoader } from "react-hot-loader";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configureStore from "../config/store";
import MainContainer from "./MainContainer";

const store = configureStore();

class AppContainer extends React.Component {
    render() {
        return (
            <HotLoader>
                <Provider store={store}>
                    <MainContainer />
                </Provider>
            </HotLoader>
        );
    }
}

ReactDOM.render(<AppContainer />, document.getElementById("main"));

export default AppContainer;

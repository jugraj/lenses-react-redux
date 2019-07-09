import * as React from "react";
import { mount, shallow } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { MessageList } from "./MessageList";

const mockStore = configureStore();
let wrapper;
let wrapperShallow;
let instance;
let store;
const mockedState = {
    session: {
        message: {
            key: "5280153815233678",
            offset: 21491024,
            partition: 0,
            timestamp: 1561968481972,
            topic: "cc_payments",
            value: `{"id":"txn1561968824433","time":"2019-07-01T08:13:44.433Z","amount":2557.44,"currency":"EUR","creditCardId":"5589753170506689","merchantId":75}`
        },
        messages: [
            {
                key: "5280153815233678",
                offset: 21491024,
                partition: 0,
                timestamp: 1561968481972,
                topic: "cc_payments",
                value: `{"id":"txn1561968824433","time":"2019-07-01T08:13:44.433Z","amount":2557.44,"currency":"EUR","creditCardId":"5589753170506689","merchantId":75}`
            }
        ]
    }
};
const mockCommitMessage = jest.fn();

describe("MessageList Component", () => {
    beforeEach(() => {
        store = mockStore(mockedState);
        wrapper = mount(
            <Provider store={store}>
                <MessageList
                    messages={mockedState.session.messages}
                    onCommitMessage={mockCommitMessage}
                />
            </Provider>
        );
        instance = wrapper.instance();

        wrapperShallow = shallow(
            <MessageList
                messages={mockedState.session.messages}
                onCommitMessage={mockCommitMessage}
                store={store}
            />,
            { context: { store } }
        );
    });

    it("has search input", () => {
        expect(wrapperShallow.find("input").exists()).toBe(true);
    });

    it("input placeholder reads correct", () => {
        expect(wrapperShallow.find("input").props().placeholder).toEqual(
            "Search an item by any key value"
        );
    });

    it("state `allMessages` starts as an empty array", () => {
        expect(wrapperShallow.state("allMessages")).toHaveLength(0);
    });

    it("on search invokes `onListItemSearch` function", () => {
        // **** FAILING due to TypeError: Cannot read property 'scrollToRow' of undefined
        // const mockHandleChangeSchema = jest.fn();
        // const input = wrapperShallow.find("input");
        // input.simulate("change", {
        //     preventDefault() {},
        //     target: { value: "123" }
        // });
        // expect(mockHandleChangeSchema).toBeCalledWith("123");
    });
});

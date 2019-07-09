// setup file
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

const originalConsoleError = console.error;

console.error = message => {
    if (/(Failed prop type)/.test(message)) {
        throw new Error(message);
    }

    originalConsoleError(message);
};

configure({ adapter: new Adapter() });

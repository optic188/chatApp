import React from "react";
import { shallow } from "enzyme";
import assert from "assert";
import FormSubmit from "../../App/components/common/FormSubmit";

// unit tests for the FormSubmit component
describe("FormSubmit component", () => {
    describe("render()", () => {
        it("should render the component", () => {
            const wrapper = shallow(<FormSubmit/>);
            assert.equal(wrapper.length, 1);
        });
    });
});

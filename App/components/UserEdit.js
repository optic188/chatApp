/* global  Promise:true*/
/* global   dispatch:true*/
/* global   user:true*/
import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Field, SubmissionError, reduxForm } from "redux-form";
import { PageHeader, Form } from "react-bootstrap";
import FormField from "./common/FormField";
import FormSubmit from "./common/FormSubmit";

// User add/edit page component
class UserEditForm extends React.Component {
    // constructor
    constructor(props) {
        super(props);

    // bind <this> to the event method
        this.formSubmit = this.formSubmit.bind(this);
    }

  // submit the form
    formSubmit(values) {
        const {dispatch} = this.props;
        return new Promise((resolve, reject) => {
            dispatch({
                type: "USERS_ADD_EDIT",
                user: {
                    id: values.id || 0,
                    username: values.username,
                    job: values.job,
                },
                callbackError: (error) => {
                    reject(new SubmissionError({_error: error}));
                },
                callbackSuccess: () => {
                    dispatch(push("/"));
                    resolve();
                }
            });
        });
    }
     // render
    render() {
        const {user, handleSubmit, error, invalid, submitting} = this.props;
        return (
      <div className="page-user-edit">
        <PageHeader>{"User " + (user.id ? "edit" : "add")}</PageHeader>
        <Form horizontal onSubmit={handleSubmit(this.formSubmit)}>
          <Field component={FormField} name="username" label="Username" doValidate/>
          <Field component={FormField} name="job" label="Job"/>
          <FormSubmit error={error} invalid={invalid} submitting={submitting} buttonSaveLoading="Saving..."
            buttonSave="Save User"/>
        </Form>
      </div>
        );
    }
}

UserEditForm.propTypes = {
    user: React.PropTypes.object,
    handleSubmit: React.PropTypes.func,
    submitting: React.PropTypes.bool,
    error: React.PropTypes.object,
    dispatch: React.PropTypes.func
};
// decorate the form component
const UserEdit = reduxForm({
    form: "user_edit",
    validate: function(values) {
        const errors = {};
        if (!values.username) {
            errors.username = "Username is required";
        }
        return errors;
    },
})(UserEditForm);

// export the connected class
function mapStateToProps(state, ownProps) {
    const user = state.users.find(x => Number(x.id) === Number(ownProps.params.id)) || {};
    return {
        user: user,
        initialValues: user,
    };
}
export default connect(mapStateToProps)(UserEdit);

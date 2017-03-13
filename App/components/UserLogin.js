/* global  Promise:true*/
import React from "react";
// import { Field, reduxForm } from "redux-form";
// import FormField from "./common/FormField";
import { Field, reduxForm, SubmissionError, initialize } from "redux-form";
import {connect} from "react-redux";

class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        const {initializeUserName} = this.props;
        initializeUserName({title: "John Smith"});
    }

    formSubmit(value) {
       return sleep(1000) {
          .then(({errors, ...data}) => {
             if (errors) {

                throw new SubmissionError({ ...errors, _error: 'Статья не добавлена!' })
             } else {

            }
          })
       }

    }

    render() {
        const {handleSubmit, asyncValidating, reset} = this.props;

        return (
        <div className="page-user-login">
            <form onSubmit={handleSubmit(this.formSubmit)}>
              <div>
                <label>title</label>
                <Field name="title" component={title =>
                  <div className={asyncValidating === "title" ? "async-validating" : ""}>
                    <input type="text" {...title} placeholder="title"/>
                    {title.error && <span>{title.error}</span>}
                  </div>
                }/>
              </div>

                  <div>
                    <button type="button" onClick={reset}>Очистить форму</button>
                    <button type="submit">Отправить форму</button>
               </div>
             </form>
        </div>
        );
    }

}

UserLogin.propTypes = {
    handleSubmit: React.PropTypes.func,
    userName: React.PropTypes.object,
    initializeUserName: React.PropTypes.func,
    asyncValidating: React.PropTypes.string,
    reset: React.PropTypes.func
};

const validate = values => {
    const errors = {};
    if(!values.title) {
        errors.text = "fill the field";
    } else if (values.title.length < 20) {
        errors.text = "text is too long";
    }
    return errors;
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


const asyncValidate = (values/* , dispatch */) => {
    return sleep(1000)
        .then(() => {
            if (!values.title) {
                throw {title: "field is required"};
            } else if (values.title.length < 10) {
                throw {title: "field shold be less then 10 symbols"};
            }
        });
};

const mapDispatchToProps = (dispatch) => {
    return {
        initializeUserName: (intitialState)=> {
            dispatch(initialize("UserLogin", intitialState));
        }
    };
};

const mapStateToProps = (state)=> {
    return {
        UserName: state.UserName
    };
};

UserLogin = reduxForm({
    form: "UserLogin",
    validate,
    asyncValidate,
    asyncBlurFields: [ "title" ]
})(UserLogin);

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);

import React from "react";
import { connect } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import Menu from "./common/Menu";
import "../stylesheets/main.scss";

// App component
export class App extends React.Component {
  // pre-render logic
    componentWillMount() {
    // the first time we load the app, we need that users list
        this.props.usrFetchList();
   // this.props.dispatch({type: 'USERS_FETCH_LIST'});
    }

  // render
    render() {
    // show the loading state while we wait for the app to load
        const {users, children} = this.props;
        if (!users.length) {
            return (
        <ProgressBar active now={100}/>
            );
        }

    // render
        return (
      <div className="container">
        <div>
          <Menu/>
        </div>
        <div>hui1</div>
        <div>
          {children}
        </div>
        <div className="footer" />
      </div>
        );
    }
}

// export the connected class
const mapStateToProps = (state)=> {
    return {
        users: state.users || [],
    };
};
const mapDispatchToProps = (dispatch)=> {
    return {
        usrFetchList: ()=> dispatch({type: "USERS_FETCH_LIST"})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

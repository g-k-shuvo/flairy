import React from "react";
import UserEditContainer from "../components/UserEdit/UserEditContainer";

const UserEdit = ({ match, history }) => {
  return <UserEditContainer match={match} history={history} />;
};

export default UserEdit;

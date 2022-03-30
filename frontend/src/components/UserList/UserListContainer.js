import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Reusables/Message";
import Loader from "../Reusables/Loader";
import { listUsers, deleteUser } from "../../actions/userActions";
import { FaTrash, FaEdit, FaTimes, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

const UserListContainer = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
      toast.success("User Deleted!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div id="user-list-container" className="section-padding">
      <Container>
        <Row>
          <div className="heading">
            <h3>Users</h3>
          </div>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div className="users-table">
              <table className="f-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={5}>Users not found!</td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>
                          <a href={`mailto:${user.email}`}>{user.email}</a>
                        </td>
                        <td>
                          {user.isAdmin ? (
                            <span>
                              <FaCheck />
                            </span>
                          ) : (
                            <span>
                              <FaTimes />
                            </span>
                          )}
                        </td>
                        <td>
                          <div className="action-btns">
                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                              <button className="action-btn edit">
                                <FaEdit size={"16px"} color="#555555" />
                              </button>
                            </LinkContainer>
                            <button
                              className="action-btn delete"
                              onClick={() => deleteHandler(user._id)}
                            >
                              <FaTrash size={"16px"} color="#555555" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default UserListContainer;

import {
  deleteUser,
  getUsers,
  addUserToClients,
  getClients,
} from "../../features/user/userSlice";
import { BiCheck } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import ListaUsuarios from "./ListaUsuarios";
import { TiPlus } from "react-icons/ti";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import LoadingSpinner from "@/shared/components/spinner/LoadingSpinner";

function UserList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, clients, isLoading, isError } = useSelector(
    (state) => state.users
  );
  console.log(users, clients, isLoading, isError, "sasda");
  const user = JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    if (!users) {
      dispatch(getUsers(user.token));
    }
    if (!clients) {
      dispatch(getClients(user.token));
    }
  }, [users, clients]);

  if (isLoading) {
    <LoadingSpinner />;
  }
  const handleCreateClient = (userId) => {
    dispatch(addUserToClients(userId, user.token));
    setTimeout(() => {
      dispatch(getClients(user.token));
      navigate("../listaDeClientes");
    }, 1000);
  };

  const dataSource = [];

  if (users?.length > 0) {
    for (let i = 0; i < users.length; i++) {
      const isUserInClients = clients?.some(
        (client) => client.idUser === users[i].idUser
      );
      dataSource.push({
        key: i,
        firstName: users[i].name,
        lastName: users[i].lastname,
        email: users[i].Credentials[0].email,
        actions: (
          <div className="flex align-items-center gap-3">
            {isUserInClients ? (
              <BiCheck size={19} className="userAdded h-9 w-9" />
            ) : (
              <TiPlus
                size={19}
                className="userAdd h-9 w-9"
                onClick={() => handleCreateClient(users[i].idUser)}
              />
            )}

            <DeleteButton userName={users[i].name} userId={users[i].idUser} />
          </div>
        ),
      });
    }
  }

  return (
    <div>
      <ListaUsuarios dataSource={dataSource} />
    </div>
  );
}

export default UserList;

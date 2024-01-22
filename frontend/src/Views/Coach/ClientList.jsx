import { getClients } from "../../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FcInfo } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import ListaUsuarios from "./ListaUsuarios";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import LoadingSpinner from "@/shared/components/spinner/LoadingSpinner";

function ClientList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clients, isLoading, isError } = useSelector((state) => state.users);

  useEffect(() => {
    if (!clients) {
      dispatch(getClients());
    }
  }, [clients]);

  if (isLoading) {
    <LoadingSpinner />;
  }

  if (isError) {
    return <div>Hubo un error</div>;
  }

  const dataSource = [];
  if (clients?.length > 0) {
    for (let i = 0; i < clients.length; i++) {
      dataSource.push({
        key: i,
        firstName: clients[i].User.name,
        lastName: clients[i].User.lastname,
        email: clients[i].User.Credentials[0].email,
        actions: (
          <div className="flex align-items-center gap-3">
            <FcInfo
              size={19}
              className="userInfo h-9 w-9"
              onClick={() => navigate(`../user/${clients[i].idClient}`)}
            />
            <DeleteButton
              userName={clients[i].User.name}
              userId={clients[i].idClient}
            />
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

export default ClientList;

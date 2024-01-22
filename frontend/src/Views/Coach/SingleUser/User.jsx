import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FcFullTrash } from "react-icons/fc";
import { MdOutlinePerson2 } from "react-icons/md";
import { Typography } from "antd";
import { deleteUser, getUser } from "../../../features/user/userSlice";
import LoadingSpinner from "@/shared/components/spinner/LoadingSpinner";
import DeleteButton from "../../../components/DeleteButton/DeleteButton";
import styles from "./SingleUser.module.css";

export default function User() {
  //@TODO: Queda agregar el icono que al switchear modo dark no se ve.
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { id } = useParams();
  const userId = id;
  const localUser = JSON.parse(localStorage.getItem("User"));
  const token = localUser.token;
  useEffect(() => {
    if (userId) {
      dispatch(getUser({ userId, token }));
    }
  }, []);

  if (!user || !user.Credentials) {
    return <LoadingSpinner />;
  }

  return (
    <div className="profile">
      {!user.Credentials ? (
        <LoadingSpinner />
      ) : (
        <div className="p-6 rounded-lg shadow-lg">
          <div>
            <div className="ml-5 text-4xl font-bold font-barlow-regular flex items-center justify-center gap-4">
              <div>
                <MdOutlinePerson2 className="rounded-full h-15 w-15" />
              </div>
              <Typography.Title level={3} className="text-center">
                Perfil de {user.name}
              </Typography.Title>
            </div>
          </div>
          <div className="w-full flex flex-col gap-6">
            <div className="w-fit flex gap-6 items-center">
              <Typography.Text className="text-left text-2xl font-bold">
                Nombre:
              </Typography.Text>
              <Typography.Text className="text-xl">{user.name}</Typography.Text>
            </div>
            <div className="w-fit flex gap-6 items-center">
              <Typography.Text className="text-left text-2xl font-bold">
                Apellido:
              </Typography.Text>
              <Typography.Text className="text-xl">
                {user.lastname}
              </Typography.Text>
            </div>
            <div className="w-fit flex gap-6 items-center">
              <Typography.Text className="text-left text-2xl font-bold">
                Email:
              </Typography.Text>
              <Typography.Text className="text-xl">
                {user.Credentials[0].email}
              </Typography.Text>
            </div>

            <div className="w-fit flex gap-6 items-center">
              <Typography.Text className="text-left text-2xl font-bold">
                Eliminar:
              </Typography.Text>
              <Typography.Text className="text-left text-3xl mt-2 cursor-pointer ">
                <DeleteButton userName={user.name} userId={user.idUser} />
              </Typography.Text>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

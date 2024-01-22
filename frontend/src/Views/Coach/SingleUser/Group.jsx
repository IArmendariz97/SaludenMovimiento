import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaUsers, FaTimesCircle } from "react-icons/fa";
import { Typography, Collapse, Space, Button, Select } from "antd";
import {
  getGroup,
  deleteClientFromGroup,
} from "../../../features/group/groupSlice";
import LoadingSpinner from "@/shared/components/spinner/LoadingSpinner";
import DeleteGroup from "../../../components/DeleteButton/DeleteGroups";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../../../features/layout/layoutSlice";
import { getClients } from "../../../features/user/userSlice";
import { FaUserPlus } from "react-icons/fa";
import { addClientToGroup } from "../../../features/group/groupSlice";
const { Panel } = Collapse;
const { Option } = Select;
function Group() {
  const dispatch = useDispatch();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { group, isLoading, message, isError } = useSelector(
    (state) => state.groups
  );
  const { clients } = useSelector((state) => state.users);
  const { id } = useParams();
  const idGroup = id;
  const auth = useSelector((state) => state.auths);

  useEffect(() => {
    if (!group) {
      console.log("Entro al effect!");
      dispatch(getGroup({ token: auth.token, idGroup: idGroup }));
    }
    if (!clients || clients.length === 0) {
      dispatch(getClients({ token: auth.token }));
    }
  }, [group, dispatch]);

  useEffect(() => {
    console.log(message);
    if (message === "User deleted from group successfully") {
      console.log("Entro al effect!");
      dispatch(
        showSuccessNotification(
          "Exito!",
          "Usuario eliminado del grupo correctamente"
        )
      );
      dispatch(getGroup({ token: auth.token, idGroup: idGroup }));
    }

    if (message === "User already in the group") {
      dispatch(
        showErrorNotification(
          "Error!",
          "El usuario ya se encuentra en el grupo"
        )
      );
    }
    if (message === "User added to group successfully") {
      dispatch(
        showSuccessNotification(
          "Exito!",
          "Usuario añadido al grupo correctamente"
        )
      );
      dispatch(getGroup({ token: auth.token, idGroup: idGroup }));
    }
  }, [message]);
  const handleDeleteClient = (idClient) => {
    dispatch(deleteClientFromGroup({ idGroup, idClient }));
  };

  const handleAddClient = () => {
    if (selectedUserId) {
      dispatch(addClientToGroup({ idGroup, idClient: selectedUserId }));
      setSelectedUserId(null);
    }
  };
  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>{message}</div>;
  console.log(group);
  return (
    <div>
      {group && (
        <div className={`p-6 rounded-lg shadow-lg groupDetails`}>
          <div className="text-center">
            <div className="ml-5 text-4xl font-bold font-barlow-regular flex items-center justify-center gap-4">
              <div className="">
                <FaUsers className="text-4xl" />
              </div>
              <Typography.Title level={3} className="text-center">
                Detalles del Grupo {group.name}
              </Typography.Title>
            </div>
          </div>
          <div className="w-full flex flex-col gap-6">
            <div className="w-fit flex gap-6 items-center">
              <Typography.Text className="text-left text-2xl font-bold">
                Nombre del Grupo:
              </Typography.Text>
              <Typography.Text className="text-xl">
                {group.name}
              </Typography.Text>
            </div>
            <div className="w-fit flex flex-col gap-6 items-center">
              <Collapse accordion>
                <Panel header="Integrantes del Grupo:">
                  {group?.ClientGroups?.map((ClientGroups) => (
                    // eslint-disable-next-line react/jsx-key
                    <Space className="flex flex-col">
                      <Typography.Text className="flex flex-row text-xl">
                        {ClientGroups.Client.User.name}{" "}
                        {ClientGroups.Client.User.lastname}
                      </Typography.Text>
                      <Button
                        type="text"
                        icon={<FaTimesCircle />}
                        onClick={() =>
                          handleDeleteClient(ClientGroups.Client.idClient)
                        }
                      />
                    </Space>
                  ))}
                </Panel>
              </Collapse>
            </div>
            <div className="w-fit flex gap-6 items-center">
              <Typography.Text className="text-left text-2xl font-bold">
                Eliminar Grupo:
              </Typography.Text>
              <Typography.Text className="text-left text-3xl mt-2 cursor-pointer">
                <DeleteGroup groupName={group.name} idGroup={group.idGroup} />
              </Typography.Text>
            </div>
            <div className="w-fit flex gap-6 items-center">
              <Typography.Text className="text-left text-2xl font-bold">
                Añadir Usuario al Grupo:
              </Typography.Text>
              <Select
                style={{ width: 200 }}
                placeholder="Selecciona un usuario"
                onChange={(value) => setSelectedUserId(value)}
                value={selectedUserId}
              >
                {clients &&
                  clients.length > 0 &&
                  clients
                    .filter(
                      (client) =>
                        !group.ClientGroups.some(
                          (groupClient) =>
                            groupClient.Client.idClient === client.idClient
                        )
                    )
                    .map((client) => (
                      <Option key={client.idClient} value={client.idClient}>
                        {client.User.name} {client.User.lastname}
                      </Option>
                    ))}
              </Select>
              <Button
                type="primary"
                icon={<FaUserPlus />}
                onClick={handleAddClient}
              >
                Añadir
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Group;

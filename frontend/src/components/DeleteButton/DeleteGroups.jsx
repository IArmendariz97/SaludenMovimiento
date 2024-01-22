import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteGroup } from "../../features/group/groupSlice";
import { FcFullTrash } from "react-icons/fc";
import { Modal, Typography } from "antd";

const DeleteGroups = ({ groupName, idGroup }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteGroup({ idGroup: idGroup }));
    setModalVisible(false);
  };

  console.log("entreeeee", groupName, idGroup);
  return (
    <>
      <FcFullTrash
        size={19}
        className="userDelete h-9 w-9"
        onClick={() => setModalVisible(true)}
      />

      <Modal
        title="¡Atención!"
        open={modalVisible}
        onOk={handleDelete}
        onCancel={() => setModalVisible(false)}
        okText="Sí"
        cancelText="No"
      >
        <div>
          <div>
            <Typography.Text>
              ¿Estás seguro de que deseas eliminar el grupo{" "}
              <Typography.Text strong>{groupName}</Typography.Text>?
            </Typography.Text>
          </div>
          <div>
            <Typography.Text>
              Esto implicara borrar tambien la rutina que el grupo tiene
              asociado (en caso de tener una).
            </Typography.Text>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteGroups;

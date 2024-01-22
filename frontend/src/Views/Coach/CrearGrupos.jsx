import { useRef, useState, useEffect } from "react";

import Table from "antd/lib/table";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Space from "antd/lib/space";
import Form from "antd/lib/form";
import Typography from "antd/lib/typography";

import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Users.module.css";
import { getClients } from "../../features/user/userSlice";
import { createGroup, getGroups } from "../../features/group/groupSlice";
import LoadingSpinner from "@/shared/components/spinner/LoadingSpinner";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/features/layout/layoutSlice";
import { useNavigate } from "react-router-dom";

function CrearGrupos() {
  const dispatch = useDispatch();
  const { clients, isLoading, isError, message } = useSelector(
    (state) => state.users
  );

  const groups = useSelector((state) => state.groups);
  const auth = useSelector((state) => state.auths);
  const navigate = useNavigate();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [form] = Form.useForm();
  const [groupName, setGroupName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const localUser = JSON.parse(localStorage.getItem("User"));
  const token = localUser.token;
  useEffect(() => {
    if (!clients) {
      dispatch(getClients({ token: auth.token }));
    }

    if (groups.message === "Grupo creado con exito") {
      setSelectedUsers([]);
      dispatch(showSuccessNotification("Exito!", "Grupo creado."));
      dispatch(getGroups(token));
      setTimeout(() => {
        navigate("/coach/grupos");
      }, 1000);
    }
  }, [groups.message]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleUserSelect = (idUser) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(idUser)) {
        // Si el usuario ya está seleccionado, lo filtramos
        return prevSelectedUsers.filter((userId) => userId !== idUser);
      } else {
        // Si el usuario no está seleccionado, lo agregamos
        return [...prevSelectedUsers, idUser];
      }
    });
  };

  const handleSubmit = () => {
    if (groupName === "") {
      return dispatch(showErrorNotification("Error!", "Ingrese un nombre."));
    }
    if (selectedUsers.length <= 1) {
      return dispatch(
        showErrorNotification("Error!", "Seleccione al menos 2 usuarios.")
      );
    }
    dispatch(createGroup({ groupName, selectedUsers }));
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      // Imprime en la consola los valores relevantes para la depuración

      // Convierte el valor de la columna y el valor del filtro a minúsculas
      const columnValue = record[dataIndex].toString().toLowerCase();
      const filterValue = value.toLowerCase();

      // Comprueba si el valor de la columna incluye el valor del filtro
      const isMatch = columnValue.includes(filterValue);

      // Devuelve true si hay coincidencia, de lo contrario, false
      return isMatch;
    },

    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Nombre",
      dataIndex: "firstName",
      key: "firstName",
      defaultSortOrder: "ascend",
      className: "text-table",
      sorter: (a, b) => {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      },
      ...getColumnSearchProps("firstName"),
    },
    {
      title: "Apellido",
      dataIndex: "lastName",
      key: "lastName",
      defaultSortOrder: "ascend",
      className: "text-table",

      sorter: (a, b) => {
        if (a.lastName < b.lastName) {
          return -1;
        }
        if (a.lastName > b.lastName) {
          return 1;
        }
        return 0;
      },
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      defaultSortOrder: "ascend",
      className: "text-table",

      sorter: (a, b) => {
        if (a.email < b.email) {
          return -1;
        }
        if (a.email > b.email) {
          return 1;
        }
        return 0;
      },
      ...getColumnSearchProps("email"),
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      className: "txt-taeble",
    },
  ];

  const dataSource = [];
  if (clients?.length > 0) {
    for (let i = 0; i < clients.length; i++) {
      dataSource.push({
        key: i,
        firstName: clients[i].User.name,
        lastName: clients[i].User.lastname,
        email:
          clients[i].User.Credentials && clients[i].User.Credentials[0].email,
        actions: (
          <div className="flex align-items-center gap-3">
            <input
              type="checkbox"
              checked={selectedUsers.includes(clients[i].User.idUser)}
              onChange={() => handleUserSelect(clients[i].User.idUser)}
            />
          </div>
        ),
      });
    }
  }

  if (isLoading || groups.isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>{groups.message}</div>;
  }

  return (
    <div className={`${styles.wrapper} add-group-listt`}>
      <div>
        <Typography.Title level={2}>Crear grupos</Typography.Title>
      </div>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Nombre del grupo:"
          name="groupName"
          className="name-group"
        >
          <Input
            placeholder="Ingrese el nombre del grupo"
            onChange={(e) => setGroupName(e.target.value)}
          />
        </Form.Item>
        <Table
          dataSource={dataSource}
          columns={columns}
          className="text-white"
          rowClassName="h-12"
        />
        <Form.Item>
          <Button type="primary" htmlType="submit" className="bg-blue-500">
            <Typography.Text className="tittle-module">
              Crear Grupo
            </Typography.Text>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CrearGrupos;

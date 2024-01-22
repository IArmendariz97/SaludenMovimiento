import { useRef, useState, useEffect } from "react";
import { Table, Button, Input, Space, Typography } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./Users.module.css";
import { useLocation } from "react-router-dom";

function ListaUsuarios({ dataSource }) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const location = useLocation();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getTitleText = () => {
    // Verifica la ruta actual y devuelve el título correspondiente
    if (location.pathname === "/coach/listaDeClientes") {
      return "Lista de Clientes";
    } else {
      return "Lista de Usuarios";
    }
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
          placeholder={`Buscar ${dataIndex}`}
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
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reiniciar
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
            Filtrar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Cerrar
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
      className: "text-table",
    },
  ];

  return (
    <div className={`${styles.wrapper} user-listt`}>
      <div>
        <Typography className="tittle-module">{getTitleText()}</Typography>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        className="text-white text-xl"
        rowClassName="h-12"
      />
    </div>
  );
}

export default ListaUsuarios;

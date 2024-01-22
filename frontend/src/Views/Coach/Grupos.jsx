import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "antd/lib/table";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Space from "antd/lib/space";
import Typography from "antd/lib/typography";

import Highlighter from "react-highlight-words";
import { FcInfo } from "react-icons/fc";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../../features/group/groupSlice";
import DeleteGroups from "../../components/DeleteButton/DeleteGroups";

import {
  showSuccessNotification,
  showErrorNotification,
} from "@/features/layout/layoutSlice";
import styles from "./Users.module.css";
import LoadingSpinner from "@/shared/components/spinner/LoadingSpinner";
import { resetGroups } from "../../features/group/groupSlice";

const Groups = () => {
  const dispatch = useDispatch();
  const { groups, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.groups
  );
  const localUser = JSON.parse(localStorage.getItem("User"));
  const token = localUser.token;
  useEffect(() => {
    if (!groups) {
      dispatch(getGroups(token));
    }

    if (message === "Grupo eliminado con exito") {
      dispatch(getGroups());
      dispatch(showSuccessNotification("Éxito!", "Grupo eliminado."));
    }

    if (message === "No se ha podido eliminar el grupo") {
      dispatch(
        showErrorNotification("Error!", "No se ha podido eliminar el grupo.")
      );
    }
    dispatch(resetGroups());
  }, [groups]);

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError && !groups) {
    return (
      <div>
        <Typography.Title level={3}>Hubo un error</Typography.Title>
      </div>
    );
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
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
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
      title: "Nombre del grupo",
      dataIndex: "groupName",
      key: "groupName",
      defaultSortOrder: "ascend",
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
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const dataSource = [];
  if (groups && groups.length > 0) {
    for (let i = 0; i < groups.length; i++) {
      dataSource.push({
        key: i,
        groupName: groups[i].name,

        actions: (
          <div className="flex align-items-center gap-3">
            <FcInfo
              size={35}
              className="userInfo"
              onClick={() => navigate(`${groups[i].idGroup}`)}
            />
            <DeleteGroups
              groupName={groups[i].name}
              idGroup={groups[i].idGroup}
            />
          </div>
        ),
      });
    }
  }

  return (
    <div className={`${styles.wrapper} group-listt`}>
      <div>
        <Typography.Title level={2}>Grupos</Typography.Title>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        className="table-group"
      />
    </div>
  );
};

export default Groups;

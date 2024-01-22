import { useState, useContext, useEffect } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import {
  Dropdown,
  Menu,
  Layout as AntLayout,
  Button,
  ConfigProvider,
  theme,
  Typography,
} from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import logo from "../assets/logo.png";
import { GlobalContext } from "../context/globalContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, toggleSidebar } from "@/features/layout/layoutSlice";
import { persistor } from "../store/store";
const { Header, Sider, Content } = AntLayout;

const CustomLayout = ({ items }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auths.user);
  const layout = useSelector((state) => state.layout);

  const { defaultAlgorithm, darkAlgorithm } = theme;
  const localUser = JSON.parse(localStorage.getItem("User"));
  const handleLogout = () => {
    setLogged(false);
    localStorage.removeItem("User");
    persistor.purge();

    window.location.reload();
  };

  const { setLogged } = useContext(GlobalContext);
  const isCoachPage = useLocation().pathname.includes("/coach");
  useEffect(() => {
    if (window.innerWidth < 1000) {
      dispatch(toggleSidebar(true));
    }
  }, [dispatch]);

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={`./profile/${localUser.user}`}>Perfil</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={`./changePassword/${localUser.user}`}>
          Cambiar contraseña
        </Link>
      </Menu.Item>
      <Menu.Item key="3" onClick={() => handleLogout()}>
        Salir
      </Menu.Item>
    </Menu>
  );

  const navigate = useNavigate();
  const [current, setCurrent] = useState("noticias");
  const userLocal = localStorage.getItem("User");
  const userLocalParse = JSON.parse(userLocal);
  console.log(userLocal, "id");

  const onClick = (e) => {
    if (e.key !== "noticias") {
      navigate(e.key);
      setCurrent(e.key);
    } else {
      setCurrent(e.key);
      if (isCoachPage) {
        navigate("/coach");
      } else {
        navigate(`/user/${userLocalParse.user}`);
      }
    }
  };
  return (
    <ConfigProvider
      theme={{
        algorithm: layout.isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <AntLayout>
        <Sider
          trigger={null}
          collapsible
          collapsed={layout.isSidebarCollapsed}
          theme={layout.isDarkMode ? "dark" : "light"}
          className="bar-menu"
        >
          <div className="logo flex items-center justify-center">
            {layout.isSidebarCollapsed ? (
              <div>
                <img src={logo} alt="abc" width={30} className="mt-2" />
              </div>
            ) : (
              <div className="flex items-start justify-start m-10">
                <Typography>Salud en Movimiento</Typography>
              </div>
            )}
          </div>
          <Menu
            onClick={onClick}
            defaultOpenKeys={["sub1"]}
            selectedKeys={[current]}
            mode="inline"
            items={items}
            theme={layout.isDarkMode ? "dark" : "light"}
            className="menu-ni-idea m-0"
          />
        </Sider>
        <AntLayout>
          <Header
            className="flex justify-between px-1 pe-5 "
            style={{
              padding: 0,
              backgroundColor: layout.isDarkMode ? "#001529" : "white",
              borderBottom: "1px solid #ffff",
            }}
          >
            <div className="flex items-center">
              <Button
                type="text"
                icon={
                  layout.isSidebarCollapsed ? (
                    <MenuUnfoldOutlined />
                  ) : (
                    <MenuFoldOutlined />
                  )
                }
                onClick={() => dispatch(toggleSidebar())}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
                className="btn-custom-layout"
              />
            </div>
            {/* @TODO: Esta flag no se ve */}
            <div className="flex gap-5 items-center">
              <div>
                {/* @TODO: Implementar icono con la bandera */}
                {/* <Flag code={"arg"} height={"15"} /> */}
              </div>
              <div className="flex gap-3 items-center justify-center dropdown">
                <div
                  className="header-user-image flex justify-center"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></div>
                <Button
                  className="p-0"
                  type="text"
                  onClick={() => dispatch(toggleDarkMode())}
                >
                  <svg
                    width="30px"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    {layout.isDarkMode ? (
                      <path
                        fill="orange"
                        fillRule="evenodd"
                        d="M12 17.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 1.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm12-7a.8.8 0 0 1-.8.8h-2.4a.8.8 0 0 1 0-1.6h2.4a.8.8 0 0 1 .8.8zM4 12a.8.8 0 0 1-.8.8H.8a.8.8 0 0 1 0-1.6h2.5a.8.8 0 0 1 .8.8zm16.5-8.5a.8.8 0 0 1 0 1l-1.8 1.8a.8.8 0 0 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM6.3 17.7a.8.8 0 0 1 0 1l-1.7 1.8a.8.8 0 1 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM12 0a.8.8 0 0 1 .8.8v2.5a.8.8 0 0 1-1.6 0V.8A.8.8 0 0 1 12 0zm0 20a.8.8 0 0 1 .8.8v2.4a.8.8 0 0 1-1.6 0v-2.4a.8.8 0 0 1 .8-.8zM3.5 3.5a.8.8 0 0 1 1 0l1.8 1.8a.8.8 0 1 1-1 1L3.5 4.6a.8.8 0 0 1 0-1zm14.2 14.2a.8.8 0 0 1 1 0l1.8 1.7a.8.8 0 0 1-1 1l-1.8-1.7a.8.8 0 0 1 0-1z"
                      />
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M16.5 6A10.5 10.5 0 0 1 4.7 16.4 8.5 8.5 0 1 0 16.4 4.7l.1 1.3zm-1.7-2a9 9 0 0 1 .2 2 9 9 0 0 1-11 8.8 9.4 9.4 0 0 1-.8-.3c-.4 0-.8.3-.7.7a10 10 0 0 0 .3.8 10 10 0 0 0 9.2 6 10 10 0 0 0 4-19.2 9.7 9.7 0 0 0-.9-.3c-.3-.1-.7.3-.6.7a9 9 0 0 1 .3.8z"
                      />
                    )}
                  </svg>
                </Button>
                {/* User Details */}
                <div className="d-flex flex-column userData pr-10">
                  <span style={{ marginTop: "-3rem" }}>
                    {user.name} {user.lastname}
                  </span>
                </div>
                <div>
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <div
                      className="ant-dropdown-link hover:cursor-pointer"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        src={user.avatar}
                        alt="user"
                        className="h-10 w-10 rounded-full mr-20"
                      />
                    </div>
                  </Dropdown>
                </div>
              </div>
            </div>
          </Header>
          <Content
            className="min-h-screen"
            style={{
              backgroundColor: layout.isDarkMode ? "#111821" : "white",
            }}
          >
            <Outlet />
          </Content>
        </AntLayout>
      </AntLayout>
    </ConfigProvider>
  );
};
export default CustomLayout;

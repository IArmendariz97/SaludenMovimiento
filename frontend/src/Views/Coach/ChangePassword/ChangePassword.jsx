import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Form } from "antd";
import { updateUser } from "../../../features/user/userSlice";

function ChangePassword() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { isLoading } = state;

  const user = localStorage.getItem("User");

  const onFinish = (values) => {
    dispatch(
      updateUser({
        userId: user.user,
        oldPassword: values.oldPassword,
        newUser: {
          password: values.newPassword,
        },
      })
    );
  };

  return (
    <div>
      <h2>Change Password</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Old Password"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Please enter your old password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please enter your new password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Change Password
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}

export default ChangePassword;

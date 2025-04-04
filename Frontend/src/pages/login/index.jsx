import { Button, Divider, Form, Input, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { callLogin } from "../../services/api";
import "./login.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";
import {
  GoogleOutlined,
  FacebookFilled,
  GithubOutlined
} from "@ant-design/icons";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const { username, password } = values;
    setIsSubmit(true);
    const res = await callLogin(username, password);
    setIsSubmit(false);
    if (res?.data) {
      localStorage.setItem("access_token", res.data.access_token);
      dispatch(doLoginAction(res.data.user));
      message.success("Đăng nhập tài khoản thành công!");
      navigate("/");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        duration: 5,
      });
    }
  };

  return (
    <div className="login-page">
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h2 className="text text-large">Đăng Nhập</h2>
              <Divider />
            </div>

            <Form name="basic" onFinish={onFinish} autoComplete="off">
              <Form.Item
                labelCol={{ span: 24 }}
                label="Email"
                name="username"
                rules={[{ required: true, message: "Email không được để trống!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Mật khẩu không được để trống!" }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button type="primary" htmlType="submit" loading={isSubmit}>
                    Đăng nhập
                  </Button>
                  <Link to="/forgot-password">Quên mật khẩu?</Link>
                </div>
              </Form.Item>

              <Divider>Hoặc</Divider>

              {/* SOCIAL LOGIN BUTTONS */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <Button
                  icon={
                    <img
                      src="/public/google.png"
                      alt="Google"
                      style={{ width: 25, height: 25 }}
                    />
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    border: "1px solid #d9d9d9",
                    backgroundColor: "#fff",
                    color: "#000",
                    fontWeight: 500,
                    height: 48,
                    width: '100%',
                  }}
                >
                  Đăng nhập với Google
                </Button>

                <Button
                  icon={<FacebookFilled style={{ fontSize: 25, color: "#1877F2" }} />}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    border: "1px solid #d9d9d9",
                    backgroundColor: "#fff",
                    color: "#000",
                    fontWeight: 500,
                    height: 48,
                    width: '100%',
                  }}
                >
                  Đăng nhập với Facebook
                </Button>

                <Button
                  icon={<GithubOutlined style={{ fontSize: 25 }} />}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    border: "1px solid #d9d9d9",
                    backgroundColor: "#fff",
                    color: "#000",
                    fontWeight: 500,
                    height: 48,
                    width: '100%',
                  }}
                >
                  Đăng nhập với GitHub
                </Button>
              </div>

              <Divider />
              <p className="text text-normal">
                Chưa có tài khoản?
                <span>
                  <Link to="/register"> Đăng Ký</Link>
                </span>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;

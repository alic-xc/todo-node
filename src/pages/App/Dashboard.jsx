import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Logo from "../../assets/logo-black.png";
import React from "react";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodoQuery,
  usePatchTodoMutation,
} from "../../services/bookrAPI";
import { Modal, Spin, notification } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { TodoSchema } from "./TodoSchema";

const Dashboard = () => {
  const [todo, setTodo] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [startRequest, setStartRequest] = React.useState(true);
  const {
    data: todos,
    isLoading,
    refetch,
  } = useGetTodoQuery({
    skip: startRequest,
  });

  const [isModalVisible, setIsModalVisible] = React.useState({
    create: false,
    details: false,
  });

  const handleOk = (obj) => {
    setTodo(null);
    refetch();
    setIsModalVisible((prevState) => {
      if (obj === "create") {
        return { ...prevState, create: false };
      } else if (obj === "details") {
        return { ...prevState, details: false };
      }
    });
  };

  const showModal = (obj) => {
    setIsModalVisible((prevState) => {
      if (obj === "create") {
        return { ...prevState, create: true };
      } else if (obj === "details") {
        return { ...prevState, details: true };
      }
    });
  };

  const createTodoHandler = () => {
    setTodo(null);
    showModal("create");
  };

  const editTodoHandler = (todo) => {
    setTodo(todo);
    showModal("create");
  };

  React.useEffect(() => {
    setStartRequest(false);
  }, []);

  return (
    <div className="w-full h-screen flex justify-center place-items-center flex-1 bg-[#f4f4f4]">
      <div className="w-[900px] md:w-[800px] sm:w-full xs:w-full bg-white min-h-[700px] rounded-md">
        <header className="flex justify-between place-items-center p-5 bg-white">
          <div>
            <img src={Logo} className="w-16" />
          </div>
          <div>
            <h1>Welcome User</h1>
          </div>
        </header>
        <main className=" w-full ">
          <Spin spinning={loading}>
            <div className="flex justify-between place-items-center px-5 m-5 bg-white">
              <h1>All Todo</h1>
              <button
                onClick={createTodoHandler}
                className="border-2 border-secondary p-2 text-sm rounded-md"
              >
                Add new todo
              </button>
            </div>
            <div className="mx-5 flex flex-col gap-y-2">
              {!isLoading &&
                todos?.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    title={todo.title}
                    description={todo.description}
                    id={todo.id}
                    updateHandler={editTodoHandler}
                    setLoading={setLoading}
                  />
                ))}
              {!isLoading && todos?.length < 1 && (
                <div className="w-full my-20">
                  <h1 className="text-red-500 font-semibold text-center">
                    No todo added yet!
                  </h1>
                </div>
              )}
            </div>
          </Spin>
        </main>
      </div>
      <Modal
        title="Add Todo"
        width={600}
        footer={null}
        onCancel={() => handleOk("create")}
        visible={isModalVisible.create}
        onOk={() => handleOk("create")}
      >
        <TodoForm todo={todo} closeModal={() => handleOk("create")} />
      </Modal>
    </div>
  );
};

const TodoForm = ({ todo, closeModal }) => {
  const [createTodo] = useAddTodoMutation();
  const [patchTodo] = usePatchTodoMutation();

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        id: todo ? todo.id : "",
        title: todo ? todo.title : "",
        description: todo ? todo.description : "",
      }}
      validationSchema={TodoSchema}
      onSubmit={(values, { setSubmitting }) => {
        try {
          // highlight-next-line
          setSubmitting(true);
          const formData = {
            title: values.title,
            description: values.description,
          };
          console.log(todo);
          if (todo) {
            formData["id"] = todo.id;
            let response = patchTodo(formData).unwrap();
            response.then(() => {
              notification.success({
                message: "Todo Updated!",
                description: "Todo updated successfully.",
              });
              closeModal();
            });
            response.catch((err) => {
              notification.error({
                message: "Unable to update todo",
                description:
                  "Unable to update this todo because of this reason" +
                  err.message,
              });
            });
            response.finally(() => {
              setTimeout(() => setSubmitting(false), 5000);
            });
          } else {
            let response = createTodo(formData).unwrap();
            response.then((res) => {
              notification.success({
                message: "Todo Added!",
                description: "Todo added successfully.",
              });
              closeModal();
            });
            response.catch((err) => {
              notification.error({
                message: "Unable to add todo",
                description:
                  "Unable to add this todo because of this reason" +
                  err.message,
              });
            });
            response.finally(() => {
              setTimeout(() => setSubmitting(false), 5000);
            });
          }
        } catch (err) {
          notification.error(
            "Unable to add this todo because of this reason" + err
          );
        }
      }}
    >
      {({ isSubmitting }) => (
        <Spin spinning={isSubmitting} delay={500}>
          <Form className="grid grid-cols-12 gap-x-2 gap-y-1 ">
            <div className="col-span-12 flex flex-col mb-3">
              <label className=" text-[#888]">Title</label>
              <Field
                type="text"
                name="title"
                placeholder="Enter Title"
                className="border-2 border-secondary px-5 h-[40px] rounded-md mt-1"
              />
              <ErrorMessage
                name="title"
                component="span"
                className="text-[red]"
              />
            </div>
            <div className="col-span-12 flex flex-col mb-3">
              <label className=" text-[#888]">Description</label>
              <Field
                type="text"
                name="description"
                placeholder=" Enter Description"
                className="border-2 border-secondary px-5 h-[40px] rounded-md mt-1"
              />
              <ErrorMessage
                name="description"
                component="span"
                className="text-[red]"
              />
            </div>

            <div className="col-span-12">
              <button
                type="submit"
                className="w-full text-white rounded-[5px]  p-2 bg-secondary my-5"
              >
                Save
              </button>
            </div>
          </Form>
        </Spin>
      )}
    </Formik>
  );
};

const TodoItem = ({ id, title, description, updateHandler, setLoading }) => {
  const [deleteTodo] = useDeleteTodoMutation();

  const deleteTodoHandler = () => {
    setLoading(true);
    const formData = {
      id,
    };
    console.log(id);
    let response = deleteTodo({ formData }).unwrap();
    response.then((res) => {
      notification.success({
        message: "Todo Deleted!",
        description: "Action performed successfully",
      });
      setTimeout(() => {
        setLoading(false);
        window.location.reload();
      }, 5000);
    });
    response.catch((err) => {
      notification.error({
        message: "Unable To Delete Todo",
        description: err.message,
      });
    });
    response.finally(() => {
      setTimeout(() => setLoading(false), 5000);
    });
    response.finally(() => {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    });
  };
  return (
    <div className="bg-[#f6f6f6]  flex justify-between place-items-center p-3">
      <h1 className="font-semibold text-sm">{title}</h1>
      <section className="">
        <button onClick={() => updateHandler({ id, title, description })}>
          <EditOutlined className="text-blue-500" />
        </button>
        <button onClick={deleteTodoHandler}>
          <DeleteOutlined className="text-red-500" />
        </button>
      </section>
    </div>
  );
};

export default Dashboard;

"use client";
import { ITask } from "@/types/tasks";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
  task: ITask;
}

const Task = ({ task }: TaskProps) => {
  const router = useRouter();
  const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
  const [modalOpenDelete, setModalOpenDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setTaskToEdit("");
    setModalOpenEdit(false);
    router.refresh();
  };

  const handleSubmitDeleteTodo = async (id: string) => {
    await deleteTodo(id);
    setModalOpenDelete(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <FiEdit
          cursor="pointer"
          className="text-blue-500"
          size={25}
          onClick={() => setModalOpenEdit(true)}
        />
        <Modal modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
          <form onSubmit={handleSubmitEditTodo} action="">
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action">
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full"
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
              />
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          cursor="pointer"
          className="text-red-500"
          size={25}
          onClick={() => setModalOpenDelete(true)}
        />
        <Modal modalOpen={modalOpenDelete} setModalOpen={setModalOpenDelete}>
          <h3 className="text-lg">
            Are you sure, you want to delete this task?
          </h3>
          <div className="modal-action">
            <button
              type="submit"
              className="btn"
              onClick={() => handleSubmitDeleteTodo(task.id)}
            >
              Submit
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;

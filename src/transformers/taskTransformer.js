const transformTask = (task) => {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    userId: task.userId,
  };
};

module.exports = {
  transformTask,
};

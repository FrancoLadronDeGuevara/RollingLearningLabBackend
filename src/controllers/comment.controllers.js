const {
  getCommentByIdService,
  editCommentService,
  deleteCommentService,
  replyCommentService,
  likeCommentService,
  blockCommentService,
  addEventCommentService,
  addWorkshopCommentService,
  getWorkshopCommentsService,
  getEventCommentsService,
  getUserCommentsService,
} = require("../services/comment.services");

const addWorkshopComment = async (req, res) => {
  try {
    const { id } = req.params;
    const commentData = {
      content: req.body.content,
      author: req.user.id,
      workshop: id,
    };
    const newComment = await addWorkshopCommentService(commentData, id);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Error al agregar comentario", error });
  }
};

const addEventComment = async (req, res) => {
  try {
    const { id } = req.params;
    const commentData = {
      content: req.body.content,
      author: req.user.id,
      event: id,
    };
    const newComment = await addEventCommentService(commentData, id);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Error al agregar comentario", error });
  }
};

const editComment = async (req, res) => {
  try {
    const { id } = req.params;
    const commentData = {
      content: req.body.content,
    };
    const comment = await editCommentService(id, commentData);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error al editar comentario", error });
  }
};

const getWorkshopComments = async (req, res) => {
  try {
    const { workshopId } = req.params;
    const comments = await getWorkshopCommentsService(workshopId);

    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los comentarios", error });
  }
};

const getEventComments = async (req, res) => {
  try {
    const { eventId } = req.params;
    const comments = await getEventCommentsService(eventId);

    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los comentarios", error });
  }
};

const getUserComments = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await getUserCommentsService(id);
    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los comentarios", error });
  }
};

const replyComment = async (req, res) => {
  try {
    const { id } = req.params;
    const replyData = {
      content: req.body.content,
      author: req.user.id,
      workshop: req.body.workshop || null,
      event: req.body.event || null,
    };
    const reply = await replyCommentService(id, replyData);
    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Error al responder comentario", error });
  }
};

const deleteReply = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await deleteCommentService(id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar respuesta", error });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await deleteCommentService(id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar comentario", error });
  }
};

const likeComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await likeCommentService(id, req.user.id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error al dar me gusta", error });
  }
};

const blockComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await blockCommentService(id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error al bloquear comentario", error });
  }
};

module.exports = {
  addWorkshopComment,
  addEventComment,
  editComment,
  getWorkshopComments,
  getEventComments,
  getUserComments,
  replyComment,
  deleteReply,
  deleteComment,
  likeComment,
  blockComment,
};

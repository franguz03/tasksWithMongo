export const validateSchema = (schema) => (req, res, next) => {
  // recibe un esquema y retorna una funcion middleware de manera no explicita, donde se valida el schema y se hace el next
  try {
    schema.parse(req.body);// utiliza el esquema para verificar el body
    next();
  } catch (error) {
    return res
      .status(400)
      .json( error.errors.map((error) => error.message) );
  }
};

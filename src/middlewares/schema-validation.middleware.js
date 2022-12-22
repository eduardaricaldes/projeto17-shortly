export function SchemaValidation(schema) {
  return (req, res, next) => {
    const params = req.body;
    const {error} = schema.validate(params, {abortEarly: false});
    
    if(error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    next();
  }
}
  
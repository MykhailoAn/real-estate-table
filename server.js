const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const { v4: uuidv4 } = require('uuid');

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.use(jsonServer.bodyParser);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

server.put('/update-all-properties', (req, res, next) => {
  const db = router.db;
  const updatedProperies = req.body;
  console.log(updatedProperies);
  // Delete properties not in the updated array
  const existingPropertyIds = updatedProperies.map((property) => property.id);
  const properiesToDelete = db
    .get('properties')
    .filter((property) => !existingPropertyIds.includes(property.id))
    .value();
  properiesToDelete.forEach((property) => {
    db.get('properties').remove({ id: property.id }).write();
  });

  // Update or create properties
  updatedProperies.forEach((property) => {
    const existingProperty = db.get('properties').find({ id: property.id });
    if (existingProperty.value()) {
      existingProperty.assign(property).write();
    } else {
      property.id = uuidv4(); // Generate a new ID
      db.get('properties').push(property).write();
    }
  });

  res.json(updatedProperies);
});

// Use default router
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});

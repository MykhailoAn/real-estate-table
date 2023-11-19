$(document).ready(function () {
  const model = new window.app.PropertyModel();
  const view = new window.app.PropertyView();
  new window.app.PropertyController(model, view);
});

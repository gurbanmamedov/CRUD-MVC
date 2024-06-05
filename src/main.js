import "./style.css";

import { Model } from "./js/model/crudModel.js";
import { View } from "./js/view/crudView.js";
import { Controller } from "./js/controller/crudController.js";

document.addEventListener("DOMContentLoaded", () => {
  const model = new Model();
  const view = new View();
  const controller = new Controller(model, view);
});

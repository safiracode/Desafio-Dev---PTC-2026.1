import { Router } from "express";
import { CalcadoController } from "./controllers/CalcadoController";

const routes = Router();

routes.get("/calcados", CalcadoController.getAll);

routes.get("/calcados/:id", CalcadoController.getById);

routes.post("/calcados", CalcadoController.create);

routes.put("/calcados/:id", CalcadoController.update);

routes.delete("/calcados/:id", CalcadoController.delete);

routes.get("/calcados/tamanho/:tamanho", CalcadoController.getByTamanho);

routes.get("/calcados/marca/:marca", CalcadoController.getByMarca);

routes.get("/calcados/estoque/total", CalcadoController.getTotalEstoque);

export default routes;


import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "Cook&Friends API", version: "1.0.0" },
    },
    apis: ["./routes/*.js", "./models/*.js"],
};

const specs = swaggerJSDoc(options);

export default (app) => {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
    console.log("Docs available at http://localhost:3000/docs");
};

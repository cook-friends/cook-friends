import app from "./app.js";
import { connectDB } from "./db.js";
import swagger from "./swagger.js";

connectDB();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    swagger(app);
});

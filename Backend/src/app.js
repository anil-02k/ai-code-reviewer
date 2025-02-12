import express from "express";
import aiRoutes from "./routes/ai.routes.js";  // ✅ `.js` extension zaroori hai
import cors from 'cors'

const app = express();

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/ai", aiRoutes);

export default app;  // ✅ ESM ke liye `module.exports` ke badle `export default`

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import interrupcaoRoutes from "./routes/interrupcoes.js";

const app = express();
app.use(express.json());
app.use(cors());

// Rotas
app.use("/api/interrupcoes", interrupcaoRoutes);

// Conexão com MongoDB
mongoose.connect("mongodb://localhost:27017/interrupcoesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB conectado"))
  .catch(err => console.error("Erro ao conectar MongoDB:", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  await newAppointment.save();
  res.status(201).json(newAppointment);
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running...');
});

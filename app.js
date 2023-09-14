const express = require('express');
const app = express();
const port = 3000;

 

// Middleware para permitir o uso de JSON no corpo das solicitações
app.use(express.json());

 

// Lista de itens fictícia (simulando um banco de dados)
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];

 

// Rota para listar todos os itens
app.get('/items', (req, res) => {
  res.json(items);
});

 

// Rota para obter um item por ID
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((item) => item.id === id);
  if (!item) {
    res.status(404).json({ error: 'Item não encontrado' });
  } else {
    res.json(item);
  }
});

 

// Rota para criar um novo item
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

 

// Rota para atualizar um item por ID
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Item não encontrado' });
  } else {
    items[index] = { ...items[index], ...updatedItem };
    res.json(items[index]);
  }
});

 

// Rota para excluir um item por ID
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Item não encontrado' });
  } else {
    items.splice(index, 1);
    res.status(204).send();
  }
});

 

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
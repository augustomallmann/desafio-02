const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const repository = {id: uuid(), title, url, techs, likes: 0}
  repositories.push(repository);

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {

  // A rota deve alterar apenas o title, a url e as techs do repositório que possua o id igual ao id presente nos parâmetros da rota;

console.log(repositories.likes); 
  const {id} = request.params;
  const {title, url, techs} = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if (repositoryIndex < 0){
    return response.status(400).json ({error: 'project not found'});
  }

  const currentRepository = repositories[repositoryIndex];
  const likes = currentRepository.likes; 

  const repository = {
    id,
    title,
    url, 
    techs,
    likes
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository)

});

app.delete("/repositories/:id", (request, response) => {

  // A rota deve deletar o repositório com o id presente nos parâmetros da rota;

  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if (repositoryIndex < 0){
    return res.status(400).json ({error: 'project not found'});
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if (repositoryIndex < 0){
    return res.status(400).json ({error: 'project not found'});
  }
  const {title, url, techs, likes} = repositories[repositoryIndex];
  
  const like = likes + 1;
  
  const repository = {
    id,
    title,
    url, 
    techs,
    likes: like
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository)
});

module.exports = app;

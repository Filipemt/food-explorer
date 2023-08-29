import { Container, Form, Content, Wrapper, Ingredients } from "./styles";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { Box } from "../../components/Box";
import { Footer } from "../../components/Footer";
import { ButtonBack } from "../../components/ButtonBack";
import { Input } from "../../components/Input";
import { InputFile } from "../../components/InputFile";
import { BsUpload, BsCurrencyDollar } from "react-icons/bs";
import { GiKnifeFork } from "react-icons/gi";
import { useState, useEffect } from "react";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { IngredientTag } from "../../components/IngredientTag";
import { Textarea } from "../../components/Textarea";
import { useNavigate, useParams } from "react-router-dom";
import { toastUtils } from "../../components/Toast";
import { api } from "../../services/api";
import Modal from "react-modal";

Modal.setAppElement("#root");

export function EditDish() {
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("meals");
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  function handleBack() {
    navigate(-1);
  }

  function handleOpenModal() {
    setModalIsOpen(true);
  }

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  function handleAddIngredient() {
    if (newIngredient.length === 0 || newIngredient.length === " ") {
      return toastUtils.handleInfo("Preencha o campo para adicionar um ingrediente")
    }

    setIngredients(prevState => [...prevState, newIngredient]);
    setNewIngredient("");

    document.getElementById("ingredients").focus();
  }

  function handleRemoveIngredient(deleted) {
    setIngredients(prevState => prevState.filter(ingredient => ingredient !== deleted));
  }

  async function handleChangeImage(event) {
    const file = event.target.files[0];
    setImageFile(file);
  }

  async function handleDeletedDish() {
    setShowLoading(true);
    try {
      await api.delete(`/dishes/${params.id}`);
      setShowLoading(false);

      toastUtils.handleSuccess("Prato deletado com sucesso");
      navigate("/");
    } catch (error) {
      setShowLoading(false);
      if (error.response) {
        return toastUtils.handleError(error.response.data.message);
      } else {
        return toastUtils.handleError("Erro ao deletar prato, tente novamente mais tarde");
      }
    }
  }

  async function handleUpdatedDish() {
    if (!name || !category || !price || !ingredients || !description) {
      return toastUtils.handleError("Preencha os campos de nome, categoria, preço, ingredientes e descrição");
    }

    if (newIngredient) {
      return toastUtils.handleInfo("Você deixou um ingrediente no campo para adicionar, clique em + ou deixe o campo vazio");
    }

    setShowLoading(true);
    try {
      const form = new FormData();

      form.append("name", name);
      form.append("category", category);
      form.append("price", price);
      form.append("ingredients", JSON.stringify(ingredients));
      form.append("description", description);
      form.append("image", imageFile);

      await api.put(`/dishes/${params.id}`, form)

      setShowLoading(false);
      toastUtils.handleSuccess("Atualizado com sucesso");
      navigate(-1);
    } catch (error) {
      setShowLoading(false);
      if (error.response) {
        return toastUtils.handleError(error.response.data.message);
      } else {
        return toastUtils.handleError("Erro ao atualizar, tente novamente mais tarde");
      }
    }
  }

  useEffect(() => {
    async function fetchDish() {
      setShowLoading(true);
      try {
        const response = await api.get(`/dishes/${params.id}`);

        const dish = response.data;

        setName(dish.name);
        setCategory(dish.category);
        setPrice(dish.price);
        setIngredients(dish.ingredients.map(ingredient => ingredient.name));
        setDescription(dish.description);

        setShowLoading(false);
      } catch (error) {
        setShowLoading(false);
        if (error.response) {
          return toastUtils.handleError(error.response.data.message);
        } else {
          return toastUtils.handleError("Erro ao carregar informações, tente novamente mais tarde");
        }
      }
    }

    fetchDish();
  }, [])

  return (
    <Container>
      <Header />

      <Wrapper>
        <Content>
          <ButtonBack fontSize="1.6rem" size="2.2rem" onClick={handleBack} />

          <h1>Editar Prato</h1>

          <Form>
            <div>
              <InputFile
                icon={BsUpload}
                title="Imagem do prato"
                text={imageFile ? imageFile.name : "Deixe o campo vazio para manter imagem anterior"}
                onChange={handleChangeImage}
                id="image" />

              <Input icon={GiKnifeFork} type="text" placeholder="Ex.: Feijão Tropeiro" title="Nome" id="name" value={name} onChange={e => setName(e.target.value)} />

              <Select
                title="Categoria"
                value={category}
                onChange={e => setCategory(e.target.value)}
              />
            </div>

            <div>
              <Ingredients>
                <label htmlFor="ingredients" >Ingredientes</label>
                <div>
                  {
                    ingredients.map((ingredient, index) => (
                      <IngredientTag
                        key={String(index)}
                        value={ingredient}
                        onClick={() => handleRemoveIngredient(ingredient)}
                      />
                    ))
                  }
                  <IngredientTag
                    placeholder="Adicionar"
                    isNew
                    id="ingredients"
                    value={newIngredient}
                    onChange={e => setNewIngredient(e.target.value)}
                    onClick={handleAddIngredient}
                  />
                </div>
              </Ingredients>
              <Input
                icon={BsCurrencyDollar}
                type="number"
                placeholder="R$ 00,00"
                title="Preço"
                id="price"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>
            <Textarea
              placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
              title="Descrição"
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

            <div>
              <Button title={'Excluir prato'} background={'#0D161B'} onClick={handleOpenModal} />
              <Button title={'Salvar alterações'} background={'#AB4D55'} onClick={handleUpdatedDish} />
            </div>
          </Form>

          <Box handleCloseModal={handleCloseModal} modalIsOpen={modalIsOpen} handleDeletedDish={handleDeletedDish} />
        </Content>

        <Footer />
      </Wrapper>
      {showLoading && <Loading />}
    </Container>
  )
}
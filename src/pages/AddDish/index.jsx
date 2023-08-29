import { Container, Form, Content, Wrapper, Ingredients } from "./styles";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ButtonBack } from "../../components/ButtonBack";
import { Input } from "../../components/Input";
import { InputFile } from "../../components/InputFile";
import { BsUpload, BsCurrencyDollar } from "react-icons/bs";
import { GiKnifeFork } from "react-icons/gi";
import { useState } from "react";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { IngredientTag } from "../../components/IngredientTag";
import { Textarea } from "../../components/Textarea";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import { toastUtils } from "../../components/Toast";
import { Loading } from "../../components/Loading";
import { useNavigate } from "react-router-dom";

export function AddDish() {
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("meals");
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  async function handleChangeImage(event) {
    const file = event.target.files[0];
    setImageFile(file);
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

  async function handleNewDish() {
    if (!name || !category || !price || !ingredients || !description) {
      return toastUtils.handleError("Preencha todos os campos");
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

      await api.post("/dishes", form)

      setShowLoading(false);
      toastUtils.handleSuccess("Prato criado com sucesso");
      navigate(-1);
    } catch (error) {
      setShowLoading(false);
      if (error.response) {
        return toastUtils.handleError(error.response.data.message);
      } else {
        return toastUtils.handleError("Erro ao criar novo prato, tente novamente mais tarde");
      }
    }
  }

  return (
    <Container>
      <Header />

      <Wrapper>
        <Content>
          <ButtonBack fontSize="1.6rem" size="2.2rem" onClick={handleBack} />

          <h1>Novo Prato</h1>

          <Form>
            <div>
              <InputFile
                icon={BsUpload}
                title="Imagem do prato"
                text={imageFile ? imageFile.name : "Selecione a imagem (opcional)"}
                id="image"
                onChange={handleChangeImage}
              />
              <Input
                icon={GiKnifeFork}
                type="text"
                placeholder="Ex.: Feijão Tropeiro"
                title="Nome"
                id="name"
                onChange={e => setName(e.target.value)}
              />
              <Select title="Categoria" onChange={e => setCategory(e.target.value)} />
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
                onChange={e => setPrice(e.target.value)}
              />
            </div>
            <Textarea
              placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
              title="Descrição"
              id="description"
              onChange={e => setDescription(e.target.value)}
            />

            <div>
              <Button
                title={'Salvar alterações'}
                background={'#AB4D55'}
                onClick={handleNewDish}
              />
            </div>
          </Form>
        </Content>

        <Footer />
      </Wrapper>
      {showLoading && <Loading />}
    </Container>
  )
}
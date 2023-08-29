import { Container, Content, Wrapper, Ingredients, Amount, Purchase, Description } from "./styles";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Ingredient } from "../../components/Ingredient";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { CiReceipt } from "react-icons/ci";
import { ButtonBack } from "../../components/ButtonBack";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import { Loading } from "../../components/Loading";
import imagePlaceHolder from "../../assets/imagePlaceholder.png";
import { toastUtils } from "../../components/Toast";

export function DishDetail() {
  const [data, setData] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [amount, setAmount] = useState(0);

  const params = useParams();

  const dishImage = data && data.image ? `${api.defaults.baseURL}/files/${data.image}` : imagePlaceHolder;

  function increment() {
    if (amount >= 0) setAmount(amount + 1);
  };

  function decrement() {
    if (amount > 0) setAmount(amount - 1);
  };

  const { user } = useAuth();
  const isAdmin = user && user.admin ? 1 : 0;

  async function handleOrder() {
    setShowLoading(true);
    try {
      await api.post("/requests", { quantity: amount, dish_id: data.id });
      toastUtils.handleSuccess("Pedido adicionado no carrinho com sucesso");

      setShowLoading(false);
    } catch (error) {
      setShowLoading(false);
      if (error.response) {
        return toastUtils.handleError(error.response.data.message);
      } else {
        return toastUtils.handleError("Erro ao fazer pedido, tente novamente mais tarde");
      }
    }
  }

  useEffect(() => {
    async function fetchDish() {
      setShowLoading(true);
      try {
        const response = await api.get(`/dishes/${params.id}`);

        setData(response.data)
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

      {
        data &&
        <Wrapper>
          <Content>
            <Link to="/">
              <ButtonBack fontSize="2.4rem" size="3.2rem" />
            </Link>

            <img src={dishImage} alt={`Imagem do prato,lanche, sobremesa ou bebida ${data.name}`} />

            <Description>
              <h2>{data.name}</h2>

              <p>{data.description}</p>

              {
                data.ingredients &&
                <Ingredients>
                  {
                    data.ingredients.map(ingredient => (
                      <Ingredient
                        key={String(ingredient.id)}
                        title={ingredient.name}
                      />
                    ))
                  }
                </Ingredients>
              }

              <Amount>
                <div style={{ display: isAdmin ? 'none' : 'flex' }}>
                  <button className="decrement" onClick={decrement}>
                    <AiOutlineMinus size={27} />
                  </button>
                  <span>{amount.toString().padStart(2, '0')}</span>
                  <button className="increment" onClick={increment}>
                    <AiOutlinePlus size={27} />
                  </button>
                </div>
                {isAdmin ? (
                  <Link to={`/edit/${data.id}`}>
                    <span>Editar Prato</span>
                  </Link>
                ) : (
                  <Purchase onClick={handleOrder}>
                    <CiReceipt size={32} />
                    <span>Incluir - {(data.price * amount).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}</span>
                  </Purchase>
                )
                }
              </Amount>
            </Description>
          </Content>

        </Wrapper>
      }

      <Footer />
      {showLoading && <Loading />}
    </Container>
  )
}
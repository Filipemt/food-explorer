import { Container, Amount, DishName, Value, Description } from "./styles";
import { Button } from '../../components/Button';
import { AiOutlinePlus, AiOutlineHeart, AiFillHeart, AiOutlineMinus } from "react-icons/ai";
import { BsArrowRightShort, BsPencil } from "react-icons/bs";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import imagePlaceHolder from "../../assets/imagePlaceholder.png";
import { toastUtils } from "../Toast";
import { Loading } from "../Loading";

export function Card({ data, admin }) {
  const [amount, setAmount] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const [showLoading, setShowLoading] = useState(false);

  function increment() {
    if (amount >= 0) setAmount(amount + 1);
  };

  function decrement() {
    if (amount > 0) setAmount(amount - 1);
  };

  const dishImage = data && data.image ? `${api.defaults.baseURL}/files/${data.image}` : imagePlaceHolder;

  async function handleOrder() {
    if (amount <= 0) {
      return toastUtils.handleInfo("Quantidade inválida");
    }

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

  async function handleFavoriteClick() {
    try {
      if (isFavorite) {
        await api.delete(`/favorites/${favoriteId}`);
        setIsFavorite(false);
      } else {
        const response = await api.post(`/favorites`, { dish_id: data.id });
        setIsFavorite(true);
        setFavoriteId(response.data.id);
      }
    } catch (error) {
      if (error.response) {
        return toastUtils.handleError(error.response.data.message);
      } else {
        return toastUtils.handleError("Erro ao favoritar/desfavoritar prato, tente novamente mais tarde");
      }
    }
  }

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await api.get(`/favorites`);
        const favorites = response.data;
        const favorite = favorites.find(favorite => favorite.dish_id === data.id);
        setIsFavorite(favorite ? true : false);
        setFavoriteId(favorite ? favorite.id : null);

      } catch (error) {
        if (error.response) {
          return toastUtils.handleError(error.response.data.message);
        } else {
          return toastUtils.handleError("Erro ao buscar pratos favoritos, tente novamente mais tarde");
        }
      }
    }

    fetchFavorites();
  }, [])

  return (
    <Container isfavorite={isFavorite ? 1 : 0} admin={admin ? 1 : 0}>
      {!admin &&
        <button onClick={handleFavoriteClick} className="favorite">
          {isFavorite ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
        </button>
      }

      {
        admin &&
        <Link className="admin" to={`/edit/${data.id}`}>
          <BsPencil size={22} />
        </Link>
      }

      <img
        src={dishImage}
        alt={`Imagem do prato/lanche ${data.name}`}
      />

      <Description>
        <DishName>
          <Link to={`/details/${data.id}`}>
            <p>{data.name}</p>
            <BsArrowRightShort size={24} />
          </Link>
        </DishName>

        <span>{data.description}</span>
      </Description>

      <Value>{data.price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })}</Value>

      <Amount admin={admin ? 1 : 0}>
        <div>
          <button className="decrement" onClick={decrement}>
            <AiOutlineMinus size={24} />
          </button>
          <span>{amount.toString().padStart(2, '0')}</span>
          <button className="increment" onClick={increment}>
            <AiOutlinePlus size={24} />
          </button>
        </div>
        <div>
          <Button title={'Incluir'} background={'#750310'} onClick={handleOrder} />
        </div>
      </Amount>
      {showLoading && <Loading />}
    </Container>
  )
}
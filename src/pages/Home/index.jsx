import { Header } from "../../components/Header";
import { Container, Description, Menu, Content, Wrapper, NotFound } from "./styles";
import { Card } from "../../components/Card";
import flavors from "../../assets/flavors.png";
import { Section } from "../../components/Section";
import { Slider } from "../../components/Slider";
import { Footer } from "../../components/Footer";
import { useAuth } from "../../hooks/auth";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { toastUtils } from "../../components/Toast";
import { Link } from "react-router-dom";
import { Loading } from "../../components/Loading";

export function Home() {
  const { user } = useAuth();
  const isAdmin = user && user.admin ? true : false;

  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [main, setMain] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  const hasDishes = meals.length > 0 || desserts.length > 0 || drinks.length > 0 || main.length > 0 || snacks.length > 0;
  // const dish = {
  //   name: "feijão",
  //   description: "feijão",
  //   price: 20
  // }

  useEffect(() => {
    async function fetchDishes() {
      setShowLoading(true);
      try {
        const response = await api.get(`/dishes?search=${search}`);

        setMeals(response.data.filter((dish) => dish.category === 'meals'));
        setMain(response.data.filter((dish) => dish.category === 'main'));
        setDesserts(response.data.filter((dish) => dish.category === 'dessert'));
        setDrinks(response.data.filter((dish) => dish.category === 'drinks'));
        setSnacks(response.data.filter((dish) => dish.category === 'snacks'));

        setShowLoading(false);
      } catch (error) {
        setShowLoading(false);
        if (error.response) {
          return toastUtils.handleError(error.response.data.message);
        } else {
          return toastUtils.handleError("Erro ao buscar pratos, tente novamente mais tarde");
        }
      }
    }

    fetchDishes();
  }, [search])
  return (
    <Container>
      <Header filterDishes={e => setSearch(e.target.value)} />


      <Wrapper>
        <Content>
          <Description>
            <img src={flavors} alt="Alimentos e frutas" />
            <div>
              <h2>Sabores inigualáveis</h2>
              <p>Sinta o cuidado do preparo com ingredientes selecionados.</p>
            </div>
          </Description>

          <Menu>
            {
              meals.length > 0 && (
                <Section title="Refeições">
                  <Slider>
                    {
                      meals.map(dish => (
                        <Card
                          key={String(dish.id)}
                          data={dish}
                          admin={isAdmin}
                        />
                      ))
                    }
                  </Slider>
                </Section>
              )
            }

            {
              main.length > 0 && (
                <Section title="Pratos principais">
                  <Slider>
                    {
                      main.map(dish => (
                        <Card
                          key={String(dish.id)}
                          data={dish}
                          admin={isAdmin}
                        />
                      ))
                    }
                  </Slider>
                </Section>
              )
            }

            {
              desserts.length > 0 && (
                <Section title="Sobremesas">
                  <Slider>
                    {
                      desserts.map(dish => (
                        <Card
                          key={String(dish.id)}
                          data={dish}
                          admin={isAdmin}
                        />
                      ))
                    }
                  </Slider>
                </Section>
              )
            }

            {
              drinks.length > 0 && (
                <Section title="Bebidas">
                  <Slider>
                    {
                      drinks.map(dish => (
                        <Card
                          key={String(dish.id)}
                          data={dish}
                          admin={isAdmin}
                        />
                      ))
                    }
                  </Slider>
                </Section>
              )
            }

            {
              snacks.length > 0 && (
                < Section title="Lanches">
                  <Slider>
                    {
                      snacks.map(dish => (
                        <Card
                          key={String(dish.id)}
                          data={dish}
                          admin={isAdmin}
                        />
                      ))
                    }
                  </Slider>
                </Section>
              )
            }

            {/* <Section title="teste">
              <Slider>
                <Card data={dish} />
                <Card data={dish} />
                <Card data={dish} />
                <Card data={dish} />
                <Card data={dish} />
                <Card data={dish} />
              </Slider>
            </Section> */}

            {!hasDishes && (
              isAdmin ? (
                <NotFound>Nenhum prato encontrado, adicione clicando <Link to="/add">aqui</Link></NotFound>
              ) : (
                <NotFound>Nenhum prato encontrado</NotFound>
              )
            )}
          </Menu>
        </Content>

        <Footer />
      </Wrapper>
      {showLoading && <Loading />}
    </Container >
  )
}
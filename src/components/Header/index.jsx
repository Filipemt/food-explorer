import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { BsReceiptCutoff } from "react-icons/bs";
import { RxExit } from "react-icons/rx";
import { Logo } from "../Logo";
import { Container, Menu, Desktop, Search, New, Logout } from "./styles";
import { MenuMobile } from "../MenuMobile";
import { useAuth } from "../../hooks/auth";
import { useEffect, useState } from "react";
import { toastUtils } from "../../components/Toast";
import { api } from "../../services/api";

export function Header({ filterDishes }) {
  const { user, signOut } = useAuth();
  const isAdmin = user && user.admin ? true : false;

  const [totalAmount, setTotalAmount] = useState(0);
  const [showMenu, setShowMenu] = useState(false);


  useEffect(() => {
    async function fetchRequests() {
      try {
        const response = await api.get("/requests/show");
        setTotalAmount(response.data.totalQuantity);

      } catch (error) {
        if (error.response) {
          return toastUtils.handleError(error.response.data.message);
        } else {
          return toastUtils.handleError("Erro ao carregar total de pedidos, tente novamente mais tarde");
        }
      }
    }

    fetchRequests();
  }, [])
  return (
    <Container >

      <MenuMobile
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        isAdmin={isAdmin}
        filterDishes={filterDishes}
      />

      <Menu>
        <button type="button" onClick={() => setShowMenu(true)}>
          <AiOutlineMenu size={24} />
        </button>
        <Logo width={"40px"} height={"40px"} fontSize={"2.2rem"} display={"none"} isAdmin={isAdmin} />

        <button type="button" className="mobile">
          <BsReceiptCutoff size={24} />
          <div>{totalAmount}</div>
        </button>

        <Search>
          <AiOutlineSearch size={24} />
          <input
            type="search"
            placeholder="Busque por pratos ou ingredientes"
            onChange={filterDishes}
          />
        </Search>

        <Desktop>
          {!isAdmin &&
            <>
              <button type="button">
                <BsReceiptCutoff size={24} />
                <p>Pedidos <span>({totalAmount})</span></p>
              </button>
            </>
          }

          {isAdmin &&
            <>
              <New to="/add">
                Novo Prato
              </New>
            </>
          }

          <Logout to="/" onClick={signOut}>
            <RxExit size={24} />
          </Logout>
        </Desktop>
      </Menu>
    </Container >
  )
}
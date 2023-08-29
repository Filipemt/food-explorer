import { Container, Form } from './styles';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Logo } from '../../components/Logo';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { toastUtils } from '../../components/Toast';
import { Loading } from '../../components/Loading';
import { api } from '../../services/api';

export function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  const navigate = useNavigate();

  function handleSignUp() {
    if (!name || !email || !password) return toastUtils.handleError("Preencha todos os campos");
    if (password.length < 6) return toastUtils.handleError("A senha deve ter pelo menos 6 caracteres");

    setShowLoading(true);
    api.post("/users", { name, email, password })
      .then(() => {
        setShowLoading(false);
        toastUtils.handleSuccess("Conta criada com sucesso");
        navigate("/");
      })
      .catch(error => {
        setShowLoading(false);
        if (error.response) {
          toastUtils.handleError(error.response.data.message);
        } else {
          toastUtils.handleError("Não foi possível criar a conta, tente novamente mais tarde");
        }
      })
  }

  return (
    <Container>
      <Form>
        <div className='logo'>
          <Logo width={"48px"} height={"48px"} fontSize={"3.6rem"} />
        </div>

        <div className="wrapper">
          <h1>Crie sua conta</h1>
          <div className='inputs'>
            <Input
              type='text'
              placeholder='Exemplo: Maria da Silva'
              id={'name'}
              title={'Seu nome'}
              icon={FiUser}
              onChange={e => setName(e.target.value)}
            />

            <Input
              type='email'
              placeholder='Exemplo: exemplo@exemplo.com.br'
              id={'email'}
              title={'Email'}
              icon={FiMail}
              onChange={e => setEmail(e.target.value)}
            />

            <Input
              type='password'
              placeholder='No mínimo 6 caracteres'
              id={'password'}
              title={'Senha'}
              icon={FiLock}
              autoComplete="on"
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <Button title={'CRIAR CONTA'} background={'#750310'} onClick={handleSignUp} />

          <Link to="/">Já tenho uma conta</Link>
        </div>
      </Form>
      {showLoading && <Loading />}
    </Container>
  )
}
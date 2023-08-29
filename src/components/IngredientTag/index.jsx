import { Container } from './styles'
import { FiPlus, FiX } from 'react-icons/fi'


export function IngredientTag({ isNew, value, onClick, ...rest }) {
  return (
    <Container isnew={isNew ? 1 : 0}>
      <input type="text" value={value} readOnly={!isNew} {...rest} />
      <button onClick={onClick} type="button"> {isNew ? <FiPlus size={24} /> : <FiX size={24} />} </button>
    </Container>
  )
}
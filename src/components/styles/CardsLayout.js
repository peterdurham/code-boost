import styled from "styled-components"

const CardsLayout = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 1040px) {
    grid-template-columns: 50% 50%;
    grid-column-gap: 2px;
  }
  @media (max-width: 600px) {
    grid-template-columns: 100%;
  }
`

export { CardsLayout }

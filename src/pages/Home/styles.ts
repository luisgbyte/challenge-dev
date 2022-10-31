import styled from 'styled-components'

export const FormContainer = styled.form`
  display: grid;
  grid-template-columns: minmax(200px, 1fr) minmax(200px, 1fr);
  gap: 10px;

  padding: 4rem 3rem;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  input {
    background: transparent;
    height: 2.5rem;
    width: 100%;
    border: 0.1rem solid;
    font-weight: bold;
    font-size: 1rem;
    padding: 0 0.5rem;
    color: ${(props) => props.theme['gray-100']};

    &:focus {
      box-shadow: none;
      border-color: ${(props) => props.theme['green-500']};
    }

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }
  }

  select {
    background: transparent;
    height: 2.5rem;
    width: 25rem;
    border: 0.1rem solid;
    font-weight: bold;
    font-size: 1rem;
    padding: 0 0.5rem;
    color: ${(props) => props.theme['gray-100']};

    &:focus {
      box-shadow: none;
      border-color: ${(props) => props.theme['green-500']};
    }
  }
`

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1rem;
  justify-self: center;

  padding: 2rem 2.5rem;

  width: 30rem;
  height: 30rem;
  border: 0.2rem solid ${(props) => props.theme['green-700']};
  border-radius: 0.3rem;

  .errors {
    align-self: start;
    color: ${(props) => props.theme['red-500']};
    margin-top: 1rem;

    p {
      margin: 0.4rem;
    }
  }
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  grid-column: 1/-1;

  gap: 1rem;
  justify-self: center;

  overflow: auto;

  width: 30rem;
  height: 100%;
  border: 0.2rem solid ${(props) => props.theme['gray-500']};
  border-radius: 0.3rem;

  > div {
    background-color: ${(props) => props.theme['green-500']};
    width: 90%;
    height: fit-content;
    border-radius: 3px;
    padding: 1rem 1rem;

    > div {
      margin: 1rem 0;
    }
  }
`

export const Button = styled.button`
  grid-column: 1/-1;
  justify-self: center;
  margin-top: 2rem;

  width: 10rem;
  height: 3rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  background-color: ${(props) => props.theme['green-700']};
  color: ${(props) => props.theme['gray-100']};

  &:hover {
    background-color: ${(props) => props.theme['green-500']};
    transition: background 0.3s ease-in-out;
  }
`

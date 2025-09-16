import styled from "styled-components"

export const LoginCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #0f172a;
  background-image: 
    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  min-height: 100vh;
`

export const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(23, 0, 105);
  font-size: 35px;
`

export const LoginBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(141, 146, 190);
  width: 480px;
  height: 480px;
  border-radius: 15px;
`

export const Input = styled.input`
  width: 247px;
  height: 22px;
  margin-top: 15px;
  padding: 12px 15px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
  }
`

export const Button = styled.button`
  background-color: #4f46e5;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 0px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 247px;
  margin-top: 10px;

  &:hover {
    background-color: #4338ca;
    transform: translateY(-2px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
`

export const LinkCadastro = styled.a`
  color: white;
  margin-top: 10px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    color: #4338ca;
    transform: translate(-2px);
  }
`

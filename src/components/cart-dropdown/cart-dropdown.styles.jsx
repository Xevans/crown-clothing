import styled from 'styled-components';

import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton
} from '../buttons/button.styles';

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 280px;
  height: 400px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  /* If any of the components listed below are children of the parent, apply the styling below */
  ${BaseButton}, ${GoogleSignInButton}, ${InvertedButton} { /*Target any button that is a child of CartDropdownContainer */
    margin-top: auto;
  }
`

export const EmptyMessage = styled.div`
  font-size: 18px;
  margin: 50px auto;
`

export const CartItemsContainer = styled.div`
  height: 380px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`


/*
.cart-dropdown-container {
    position: absolute;
    width: 280px;
    height: 400px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 1px solid black;
    background-color: white;
    top: 90px;
    right: 40px;
    z-index: 5;
  
    .empty-message {
      font-size: 18px;
      margin: 50px auto;
    }
  
    .cart-items {
      height: 380px;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
    }
  
    button {
      margin-top: 5px;
    }
  }
  */
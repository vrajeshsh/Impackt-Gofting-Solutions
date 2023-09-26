import Center from "@/components/Center";
import styled from "styled-components";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import CartIcon from "@/components/icons/CartIcon";

const Bg = styled.div`
  background-color: #222;
  color:#fff;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin:0;
  font-weight:normal;
  font-size:1.5rem;
  @media screen and (min-width: 768px) {
    font-size:3rem;
  }
`;
const Desc = styled.p`
  color:#aaa;
  font-size:.8rem;
`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img{
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img{
      max-width: 100%;
    }
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap:10px;
  margin-top:25px;
`;

export default function Featured({product}) {
  
  return (
    <Bg>
    <Center>
        <ColumnsWrapper>
            <Column>
            <div>
            <Title>{product.Title}</Title>
    <Desc>Lorem ipsum</Desc>
    <ButtonsWrapper>
    <Button outline white size="l">Read more</Button>
    <Button primary size="l">
        <CartIcon />
        Add to cart</Button>

    </ButtonsWrapper>

            </div>
    
            </Column>
            <Column>
                <img src="https://imgv3.fotor.com/images/blog-cover-image/a-mac-and-iphone-on-the-white-desk.jpg" alt=""/>
            </Column>
        </ColumnsWrapper>
    

    </Center>

    </Bg>
  );
}
import { Button, Card, CardBody, Container, Wrap, WrapItem } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const Presentation: React.FC = () => {
  const router = useRouter()

  return (
    <>
      <Container maxW="10xl" centerContent>
        <h1>Trouvez un BRO en quelques clics</h1>
        <h1>et soulevez de la fonte à la salle</h1>
        <Wrap direction={['row']} p="2px" justify="center">
          <WrapItem>
            <Card maxW="300px" h="300px">
              <CardBody>
                <h2>Peur de faire un développé couché seul ?</h2>
                <p>Ce temps est révolu car votre BRO sera là pour vous parer.</p>
              </CardBody>
            </Card>
          </WrapItem>
          <WrapItem>
            <Card maxW="300px" h="300px">
              <CardBody>
                <h2>Vous n'arrivez pas à trouver un BRO aligné avec vos objectifs ?</h2>
                <p>Prise de masse, session de force, perte de poids... Il y en a pour tous les goûts.</p>
              </CardBody>
            </Card>
          </WrapItem>
          <WrapItem>
            <Card maxW="300px" h="300px">
              <CardBody>
                <h2>Le week end approche et votre volonté est sur le point de faillir ?</h2>
                <p>Grâce à votre BRO, vous ne perdrez plus de vue vos objectifs.</p>
              </CardBody>
            </Card>
          </WrapItem>
        </Wrap>
        <p>Connectez-vous dès à présent et devenez plus fort que votre plus forte excuse.</p>
        <Button onClick={() => router.push('/auth/signin')}>Se connecter</Button>
        Dernières annonces:
      </Container>
    </>
  )
}

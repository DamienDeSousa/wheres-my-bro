import Head from 'next/head'
import { Inter } from '@next/font/google'
import { Card, CardBody, Container, Wrap, WrapItem, Button } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  // fond beige, texte noir, titre jaune / rouge / orange,
  return (
    <>
      <Head>
        <title>Where's my BRO ?</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
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
          {session && <Button onClick={async () => await signOut({ callbackUrl: '/' })}>Sign out</Button>}
          Dernières annonces:
        </Container>
      </div>
    </>
  )
}

'use client'

import { useRouter } from 'next/navigation'

export const Presentation: React.FC = () => {
  const router = useRouter()

  return (
    <>
      <div>
        <h1>Trouvez un équipier en quelques clics</h1>
        <h1>et soulevez de la fonte à la salle</h1>
        <div>
          <div>
            <div>
              <div>
                <h2>Peur de faire un développé couché seul ?</h2>
                <p>Ce temps est révolu car votre équipier sera là pour vous parer.</p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <h2>Vous n'arrivez pas à trouver un équipier aligné avec vos objectifs ?</h2>
                <p>
                  Perte de poids, préparation d'une compétition, Prise de masse, loisir tout simplement... Il y en a
                  pour tous les goûts.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <h2>Le week end approche et votre volonté est sur le point de faillir ?</h2>
                <p>Grâce à votre équipier, vous ne perdrez plus de vue vos objectifs.</p>
              </div>
            </div>
          </div>
        </div>
        <p>Connectez-vous dès à présent et devenez plus fort que votre plus forte excuse.</p>
        <button onClick={() => router.push('/auth/signin')}>Se connecter</button>
        Dernières annonces:
      </div>
    </>
  )
}

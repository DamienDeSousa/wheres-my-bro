'use client'

import { useRouter } from 'next/navigation'
import { Card } from './cards/card.components'

export const Presentation: React.FC = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center gap-14 p-2">
      <h2 className="text-center">Trouvez un équipier en quelques clics et commencez une activité sportive</h2>
      <div className="flex flex-col items-center gap-5">
        <Card
          title="Peur de faire un développé couché seul ?"
          content="Ce temps est révolu car votre équipier sera là pour vous parer."
        />
        <Card
          title="Vous n'arrivez pas à trouver un équipier aligné avec vos objectifs ?"
          content="Perte de poids, préparation d'une compétition, Prise de masse, loisir tout simplement... Il y en a pour tous les goûts."
        />
        <Card
          title="Le week end approche et votre volonté est sur le point de faillir ?"
          content="Grâce à votre équipier, vous ne perdrez plus de vue vos objectifs."
        />
      </div>
      <h2 className="text-center">Connectez-vous dès à présent et devenez plus fort que votre plus forte excuse.</h2>
      <button
        onClick={() => router.push('/auth/signin')}
        className="text-white bg-[#5DA3E8] hover:bg-[#1C6FC3] rounded-lg px-10 py-3 focus:outline-none w-full"
      >
        Se connecter
      </button>
    </div>
  )
}

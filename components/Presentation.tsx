'use client'

import { useRouter } from 'next/navigation'

export const Presentation: React.FC = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center gap-14 p-2">
      <h2 className="text-center">Trouvez un équipier en quelques clics et commencez une activité sportive</h2>
      <div className="flex flex-col items-center gap-5">
        <div className="max-w-sm p-6 bg-white rounded-lg">
          <h2 className="mb-2 tracking-tight">Peur de faire un développé couché seul ?</h2>
          <p>Ce temps est révolu car votre équipier sera là pour vous parer.</p>
        </div>
        <div className="max-w-sm p-6 bg-white rounded-lg">
          <h2 className="mb-2 tracking-tight">Vous n'arrivez pas à trouver un équipier aligné avec vos objectifs ?</h2>
          <p>
            Perte de poids, préparation d'une compétition, Prise de masse, loisir tout simplement... Il y en a pour tous
            les goûts.
          </p>
        </div>
        <div className="max-w-sm p-6 bg-white rounded-lg">
          <h2 className="mb-2 tracking-tight">Le week end approche et votre volonté est sur le point de faillir ?</h2>
          <p>Grâce à votre équipier, vous ne perdrez plus de vue vos objectifs.</p>
        </div>
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

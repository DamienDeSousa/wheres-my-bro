type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (params: ButtonProps) => {
  const { children } = params
  return (
    <button
      className="text-white bg-[#5DA3E8] hover:bg-[#1C6FC3] rounded-lg px-10 py-3 focus:outline-none w-full"
      {...params}
    >
      {children}
    </button>
  )
}

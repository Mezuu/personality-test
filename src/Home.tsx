import { useNavigate } from "react-router-dom"

export function Home() {
    const navigate = useNavigate()

    return  <button
    onClick={() => navigate('/test')}
    className="p-2 px-4 rounded-md text-xl bg-surface-1 hover:bg-surface-12 ease-in-out transition-all"
  >
    Mulai
  </button>
}
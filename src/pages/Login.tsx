import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { LogIn, Mail, Lock, Shield, Activity, Eye, EyeOff, CheckCircle } from 'lucide-react'
import Logo from '../components/Logo'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    setLoading(true)

    // Validação do domínio de email
    if (!email.endsWith('@vidaplus.com.br')) {
      setErro('O email deve ser do domínio @vidaplus.com.br')
      setLoading(false)
      return
    }

    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      const sucesso = await login(email, senha)
      if (sucesso) {
        navigate('/dashboard')
      } else {
        setErro('Email ou senha incorretos. Verifique suas credenciais.')
      }
    } catch (error) {
      setErro('Erro ao fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Seção Lateral - Desktop */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 relative overflow-hidden">
        {/* Padrão de fundo */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Círculos decorativos */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

        {/* Conteúdo centralizado */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full h-full px-12">
          <div className="mb-12">
            <Logo size="lg" textColor="white" />
          </div>
          
          <h1 className="text-4xl font-bold mb-6 text-white leading-tight">
            Bem-vindo ao Sistema
          </h1>
          
          <p className="text-lg text-white/90 leading-relaxed max-w-lg mb-12">
            Gerencie pacientes, profissionais, agendamentos e recursos hospitalares de forma eficiente e segura.
          </p>

          {/* Cards de destaque */}
          <div className="grid grid-cols-1 gap-4 w-full max-w-md">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 hover:bg-white/15 transition-all">
              <div className="bg-white/20 p-3 rounded-xl flex-shrink-0">
                <Shield size={24} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-base font-bold text-white mb-1">Segurança e Privacidade</p>
                <p className="text-sm text-white/80">Conformidade total com LGPD</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 hover:bg-white/15 transition-all">
              <div className="bg-white/20 p-3 rounded-xl flex-shrink-0">
                <Activity size={24} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-base font-bold text-white mb-1">Gestão Completa</p>
                <p className="text-sm text-white/80">Tudo em um só lugar</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <div className="lg:hidden text-center mb-8">
            <Logo size="lg" />
          </div>

          {/* Card de Login */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-gray-100">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Acessar Sistema</h2>
              <p className="text-sm text-gray-600">Entre com suas credenciais para continuar</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Campo Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 text-base border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all bg-gray-50 hover:bg-white"
                    placeholder="seu@vidaplus.com.br"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Campo Senha */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={mostrarSenha ? 'text' : 'password'}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full pl-12 pr-14 py-3.5 text-base border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all bg-gray-50 hover:bg-white"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors p-2"
                  >
                    {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Opções */}
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded border-2 border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500 cursor-pointer" 
                  />
                  <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 font-medium">Lembrar-me</span>
                </label>
                <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-semibold transition-colors">
                  Esqueceu a senha?
                </a>
              </div>

              {/* Mensagem de Erro */}
              {erro && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-800 px-5 py-4 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">Atenção:</span>
                    <span className="text-sm">{erro}</span>
                  </div>
                </div>
              )}

              {/* Botão de Login */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 text-white py-4 rounded-xl font-bold text-lg hover:from-primary-700 hover:via-primary-600 hover:to-secondary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl shadow-primary-500/40 hover:shadow-2xl hover:shadow-primary-500/50 transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
                    <span>Entrando...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={24} />
                    <span>Entrar</span>
                  </>
                )}
              </button>
            </form>

            {/* Credenciais de Teste */}
            <div className="mt-6 p-4 bg-gradient-to-br from-primary-50/80 to-secondary-50/80 rounded-xl border border-primary-200/50 backdrop-blur-sm">
              <p className="text-xs text-primary-800 font-semibold mb-3 flex items-center gap-1.5">
                <CheckCircle size={14} className="text-primary-600" />
                Credenciais de Teste
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2 p-2 bg-white/80 rounded-lg border border-primary-100/50 hover:border-primary-200 hover:bg-white transition-all">
                  <span className="font-semibold text-primary-700 text-[10px] uppercase tracking-wide">Admin</span>
                  <span className="font-mono text-[10px] text-primary-600 bg-primary-50/50 px-2 py-1 rounded border border-primary-100">admin@vidaplus.com.br / admin123</span>
                </div>
                <div className="flex items-center justify-between gap-2 p-2 bg-white/80 rounded-lg border border-primary-100/50 hover:border-primary-200 hover:bg-white transition-all">
                  <span className="font-semibold text-primary-700 text-[10px] uppercase tracking-wide">Médico</span>
                  <span className="font-mono text-[10px] text-primary-600 bg-primary-50/50 px-2 py-1 rounded border border-primary-100">medico@vidaplus.com.br / medico123</span>
                </div>
                <div className="flex items-center justify-between gap-2 p-2 bg-white/80 rounded-lg border border-primary-100/50 hover:border-primary-200 hover:bg-white transition-all">
                  <span className="font-semibold text-primary-700 text-[10px] uppercase tracking-wide">Enfermeiro</span>
                  <span className="font-mono text-[10px] text-primary-600 bg-primary-50/50 px-2 py-1 rounded border border-primary-100">enfermeira@vidaplus.com.br / enfermeira123</span>
                </div>
                <div className="flex items-center justify-between gap-2 p-2 bg-white/80 rounded-lg border border-primary-100/50 hover:border-primary-200 hover:bg-white transition-all">
                  <span className="font-semibold text-primary-700 text-[10px] uppercase tracking-wide">Recepcionista</span>
                  <span className="font-mono text-[10px] text-primary-600 bg-primary-50/50 px-2 py-1 rounded border border-primary-100">recepcionista@vidaplus.com.br / recepcionista123</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rodapé */}
          <p className="text-center text-xs text-gray-500 mt-6 font-medium">
            © 2025 SGHSS - Vida+ Plus. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  )
}

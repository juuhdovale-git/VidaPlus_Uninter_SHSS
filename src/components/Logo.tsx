import { Building2 } from 'lucide-react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  textColor?: 'default' | 'white'
}

export default function Logo({ size = 'md', showText = true, textColor = 'default' }: LogoProps) {
  const sizeClasses = {
    sm: { icon: 20, text: 'text-lg', card: 'p-2' },
    md: { icon: 28, text: 'text-xl', card: 'p-3' },
    lg: { icon: 36, text: 'text-2xl', card: 'p-4' },
  }

  const currentSize = sizeClasses[size]
  const isWhite = textColor === 'white'

  return (
    <div className="flex items-center gap-3">
      <div className={`${currentSize.card} rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-green-500 shadow-lg`}>
        <Building2 className="text-white" size={currentSize.icon} />
      </div>
      {showText && (
        <div>
          <div className={`${currentSize.text} font-bold ${isWhite ? 'text-white' : 'text-gray-900'}`}>
            {isWhite ? (
              <>
                <span className="text-white">Vida</span>
                <span className="text-white/80 mx-1">+</span>
                <span className="text-white">Plus</span>
              </>
            ) : (
              <>
                <span className="text-blue-600">Vida</span>
                <span className="text-gray-400 mx-1">+</span>
                <span className="text-green-600">Plus</span>
              </>
            )}
          </div>
          <p className={`text-xs ${isWhite ? 'text-white/90' : 'text-gray-500'}`}>Sistema de Gestão Hospitalar</p>
        </div>
      )}
    </div>
  )
}


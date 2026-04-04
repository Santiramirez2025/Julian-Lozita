'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getWhatsAppLink } from '@/lib/utils'
import Button from '@/components/ui/Button'

export default function NotFoundCTA() {
  const [open, setOpen] = useState(false)
  const [tipo, setTipo] = useState('')
  const [presupuesto, setPresupuesto] = useState('')

  const tipos = ['Casa', 'Departamento', 'Terreno', 'Local', 'Otro']

  const handleSend = () => {
    const msg = `Hola Julián! Estoy buscando${tipo ? ` un/a ${tipo.toLowerCase()}` : ' propiedad'} en Villa María${presupuesto ? ` con un presupuesto de aprox ${presupuesto}` : ''}. ¿Tenés algo que me puedas mostrar?`
    window.open(getWhatsAppLink(msg), '_blank')
  }

  return (
    <div className="mt-8">
      {!open ? (
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setOpen(true)}
          className="w-full py-5 rounded-2xl border-2 border-dashed border-primary-light/30 hover:border-primary-light hover:bg-primary-light/5 transition-all text-center"
        >
          <p className="text-lg font-heading font-bold text-text mb-1">
            🔍 ¿No encontrás lo que buscás?
          </p>
          <p className="text-sm text-text-light">
            Contale a Julián y te ayuda a encontrarlo
          </p>
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border bg-white p-6"
          >
            <h3 className="font-heading font-bold text-text mb-4">Contanos qué buscás</h3>

            {/* Tipo */}
            <div className="mb-4">
              <p className="text-sm text-text-light mb-2">¿Qué tipo de propiedad?</p>
              <div className="flex flex-wrap gap-2">
                {tipos.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTipo(tipo === t ? '' : t)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      tipo === t
                        ? 'bg-primary text-white'
                        : 'bg-gray-50 text-text-light hover:bg-gray-100'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Presupuesto */}
            <div className="mb-6">
              <p className="text-sm text-text-light mb-2">¿Presupuesto aproximado? (opcional)</p>
              <input
                type="text"
                value={presupuesto}
                onChange={(e) => setPresupuesto(e.target.value)}
                placeholder="Ej: USD 80.000"
                className="w-full px-4 py-2.5 rounded-xl border border-border text-text text-sm focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/10"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="whatsapp" onClick={handleSend} className="flex-1">
                Enviar a Julián por WhatsApp
              </Button>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}

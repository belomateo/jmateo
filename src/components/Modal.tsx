import { motion, AnimatePresence } from 'motion/react';
import { Loader2, CheckCircle, Send } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
}

export default function SendReminderModal({ isOpen, onClose, memberName }: ModalProps) {
  const [step, setStep] = useState<'sending' | 'success'>('sending');

  useEffect(() => {
    if (isOpen) {
      setStep('sending');
      // Simulate API call
      const timer = setTimeout(() => {
        setStep('success');
      }, 2000);
      
      // Auto close after success
      const closeTimer = setTimeout(() => {
        if (isOpen) onClose();
      }, 3500);

      return () => {
        clearTimeout(timer);
        clearTimeout(closeTimer);
      };
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full pointer-events-auto border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors duration-500
                  ${step === 'sending' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}
                `}>
                  {step === 'sending' ? (
                    <Loader2 className="animate-spin" size={32} />
                  ) : (
                    <CheckCircle size={32} />
                  )}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step === 'sending' ? 'Enviando recordatorio...' : '¡Mensaje enviado!'}
                </h3>
                
                <p className="text-gray-500 text-sm mb-6">
                  {step === 'sending' 
                    ? `Conectando con WhatsApp API para enviar mensaje a ${memberName}.`
                    : `El recordatorio ha sido enviado exitosamente a ${memberName}.`
                  }
                </p>

                {step === 'sending' && (
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-mono bg-gray-50 px-3 py-1.5 rounded-full">
                    <Send size={12} />
                    <span>POST /api/v1/webhooks/whatsapp</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

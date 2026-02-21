import { motion, AnimatePresence } from 'motion/react';
import { X, Camera, Upload, Trash2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { Member } from '../data';

interface MemberFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: Omit<Member, 'id'>) => void;
  initialData?: Member | null;
}

export default function MemberFormModal({ isOpen, onClose, onSave, initialData }: MemberFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plan: 'Básico Mensual',
    dueDate: '',
    status: 'active' as Member['status'],
    avatar: ''
  });

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        plan: initialData.plan,
        dueDate: initialData.dueDate,
        status: initialData.status,
        avatar: initialData.avatar
      });
    } else {
      setFormData({
        name: '',
        email: '',
        plan: 'Básico Mensual',
        dueDate: new Date().toISOString().split('T')[0],
        status: 'active',
        avatar: `https://picsum.photos/seed/${Math.random()}/100/100`
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("No se pudo acceder a la cámara. Por favor verifica los permisos.");
      setIsCameraOpen(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 300, 300);
        const dataUrl = canvasRef.current.toDataURL('image/jpeg');
        setFormData(prev => ({ ...prev, avatar: dataUrl }));
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  };

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
              className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full pointer-events-auto border border-gray-100 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {initialData ? 'Editar Socio' : 'Nuevo Socio'}
                </h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-4 mb-6">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 ring-4 ring-gray-50 group">
                    {isCameraOpen ? (
                      <>
                        <video 
                          ref={videoRef} 
                          autoPlay 
                          playsInline 
                          className="w-full h-full object-cover"
                        />
                        <canvas ref={canvasRef} width="300" height="300" className="hidden" />
                      </>
                    ) : (
                      <img 
                        src={formData.avatar} 
                        alt="Avatar Preview" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>

                  {isCameraOpen ? (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={capturePhoto}
                        className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        Capturar
                      </button>
                      <button
                        type="button"
                        onClick={stopCamera}
                        className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Upload size={14} />
                        Subir
                      </button>
                      <button
                        type="button"
                        onClick={startCamera}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Camera size={14} />
                        Cámara
                      </button>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
                    <select
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                      value={formData.plan}
                      onChange={e => setFormData({...formData, plan: e.target.value})}
                    >
                      <option>Básico Mensual</option>
                      <option>Premium Mensual</option>
                      <option>Estudiante Trimestral</option>
                      <option>Premium Anual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vencimiento</label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                      value={formData.dueDate}
                      onChange={e => setFormData({...formData, dueDate: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <select
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value as Member['status']})}
                  >
                    <option value="active">Al día</option>
                    <option value="overdue">Vencido</option>
                    <option value="pending">Pendiente</option>
                  </select>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
                  >
                    {initialData ? 'Guardar Cambios' : 'Crear Socio'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

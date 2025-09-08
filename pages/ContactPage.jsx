// ContactForm.jsx
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('');

    try {
      const res = await fetch('http://localhost:5000/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('Mensaje enviado con éxito. Te contactaremos pronto.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Si hay un error pero el mensaje se guardó en la base de datos
        if (res.status === 200 && data.error) {
          setStatus('Mensaje recibido. Nos pondremos en contacto pronto.');
          setFormData({ name: '', email: '', message: '' });
        } else {
          setStatus('Error al enviar el mensaje. Intenta nuevamente.');
        }
      }
    } catch (error) {
      setStatus('Error de conexión. Tu mensaje puede haberse enviado correctamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Contáctanos</h2>

      <input
        type="text"
        name="name"
        placeholder="Tu nombre"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 mb-3 border rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="Tu correo"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 mb-3 border rounded"
      />

      <textarea
        name="message"
        placeholder="Tu mensaje"
        value={formData.message}
        onChange={handleChange}
        required
        rows="5"
        className="w-full p-2 mb-3 border rounded"
      />

      <button 
        type="submit" 
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
      >
        {isLoading ? 'Enviando...' : 'Enviar'}
      </button>

      {status && <p className="mt-2">{status}</p>}
    </form>
  );
}
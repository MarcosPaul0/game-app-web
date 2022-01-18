import { FormEvent, useState } from 'react';
import { useNotify } from '../../../hooks/useNotify';
import { api } from '../../../services/apiClient';
import styles from './styles.module.scss';

export function NewGame() {
  const [gameImg, setGameImg] = useState(null);
  const [name, setName] = useState('');

  const { errorNotify } = useNotify();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('game', gameImg);
      formData.append('name', name);

      await api.post('/games/create', formData);
    } catch(err) {
      errorNotify({
        message: 'Erro ao registrar!'
      });
    }  
  }

  return (
    <div className={styles.container}>
      <h1>Novo Jogo</h1>
      <hr />
      <form>
        <div>
          <label htmlFor="name">Nome:</label>
          <input 
            id="name" 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
          />
        </div>
        <div>
          <label htmlFor="game">Capa do jogo:</label>
          <input 
            id="game"
            name="game"
            type="file"
            onChange={e => setGameImg(e.target.files[0])} 
          />
        </div>
        <button 
          type="submit" 
          onClick={handleSubmit}
        >
          Registrar
        </button>
      </form>
    </div>
  )
}
// components/DeleteToast.tsx
import { toast } from 'react-hot-toast'

export function showDeleteToast(onConfirm: () => void) {
  toast.custom((t) => (
    <div
      style={{
        background: '#fff0f0',
        border: '1px solid #ff4d4d',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
        color: '#b30000',
        width: '320px',
      }}
    >
      <strong style={{ fontSize: '16px' }}>Excluir tarefa?</strong>
      <p style={{ margin: '8px 0', fontSize: '14px' }}>
        Essa ação não pode ser desfeita.
      </p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <button
          onClick={() => toast.dismiss(t.id)}
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            background: '#ccc',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Cancelar
        </button>
        <button
          onClick={async () => {
            toast.dismiss(t.id)
            onConfirm()
            toast.success('Tarefa deletada com sucesso!')
          }}
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            background: '#ff4d4d',
            border: 'none',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Confirmar
        </button>
      </div>
    </div>
  ))
}

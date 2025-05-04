import { GetServerSideProps } from 'next'
import styles from './styles.module.css'
import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import Head from 'next/head'
import { getSession } from 'next-auth/react'
import { TextArea } from '@/components/textarea'
import { FiShare2 } from 'react-icons/fi'
import { FaTrash } from 'react-icons/fa'
import { db } from '@/services/firebaseConnection'
import { addDoc, collection, query, orderBy, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import Link from 'next/link'



interface HomeProps {
    user: {
        email: string;
    }
}

interface TaskProps {
    id: string;
    created: Date;
    public: boolean;
    tarefa: string;
    user: string;
}

export default function Dashboard( { user }: HomeProps ) {

    const [input, setInput] = useState('')
    const [publicTask, setPublicTask] = useState(false)
    const [task, setTask] = useState<TaskProps[]>([])


    useEffect(() => {
        async function loadTarefas(){
            const tarefasRef = collection(db, "tarefas")
            const q = query(tarefasRef, orderBy("created", "desc"), where("user", "==", user?.email))

            onSnapshot(q, (snapshot =>{
                let list = [] as TaskProps[]

                snapshot.forEach((doc) => {
                    list.push({
                        id: doc.id,
                        created: doc.data().created.toDate(),
                        public: doc.data().public,
                        tarefa: doc.data().tarefa,
                        user: doc.data().user,
                    })
                })

                setTask(list);
            }))
        }

        loadTarefas();
    },[user?.email])

    function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
        setPublicTask(event.target.checked);
        }


    async function handleRegisterTask(event: FormEvent){
            event.preventDefault()
            if(input === "") return;
            
            try {
                await addDoc(collection(db, "tarefas"),{
                    tarefa: input,
                    created: new Date(),
                    user: user?.email,
                    public: publicTask,
                } );

                setInput('')
                setPublicTask(false)
            } catch (error) {
                console.log(error)
            }
        
        }

        async function handleShare(id: string){
            await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/task/${id}`)
            alert("Link copiado com sucesso!")

        }

        async function handleDeletetask(id: string){
            const docRef = doc(db, "tarefas", id)
            await deleteDoc(docRef)
            alert("Tarefa deletada com sucesso!")
        }

            
    return (
        <div className={styles.container}>
            <Head>
                <title>Meu Painel de Tarefas</title>
            </Head>

           <main className={styles.main}>
            <section className={styles.content}>

                <div className={styles.contentForm}>
                    <h1 className={styles.title}>
                        Qual a sua tarefa?
                    </h1>

                    <form onSubmit={handleRegisterTask}> 
                        <TextArea placeholder="Digite qual sua tarefa..." 
                        value={input}
                        onChange={ (event: ChangeEvent<HTMLTextAreaElement> )=> 
                        setInput(event.target.value)}/>

                        <div className={styles.checkboxArea}>
                            <input 
                            type="checkbox" 
                            className={styles.checkbox}
                            checked={publicTask}
                            onChange={handleChangePublic}
                               
                               />
                               <label>Deixar tarefa publica?</label>
                        </div>
                        <button type="submit" className={styles.button}>
                            Registrar
                        </button>
                    </form>
                </div>

            </section>

            <section className={styles.taskContainer}>
                <h1>Minhas Tarefas</h1>

              {task.map((item) =>(

                  <article key={item.id} className={styles.task}>
                    {item.public && (
                         <div className={styles.tagContainer}>
                         <label className={styles.tag} >PUBLICO</label>
                         <button className={styles.shareButton} onClick={ ()=> handleShare(item.id)}>
                             <FiShare2 size={22} color="#0f0f0f" />
                         </button>
                     </div>
                    )}

                  <div className={styles.taskContent}>
                    {item.public ? (
                    <Link href={`/task/${item.id}`}>
                      <p>{item.tarefa}</p>
                    </Link> 
                    ) : (
                      <p>{item.tarefa}</p>
                    )}
                    
                      <button className={styles.trashButton} onClick={ ()=> handleDeletetask(item.id) } >
                          <FaTrash size={24} color="#ff0000" />
                      </button>

                  </div>
              </article>
              ))}

                
            </section>
           </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async({ req }) =>{

    const session = await getSession({ req })
    //console.log(session)
    if(!session?.user){
        return {
            redirect:{
                destination: '/',
                permanent: false,
            }
        }

    }
    return {
        props:{
            user: {
                email: session?.user?.email,
            }
        },
    }
}
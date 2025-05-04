import { ChangeEvent, FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import  styles  from "./style.module.css";
import { GetServerSideProps } from "next";
import { db } from "@/services/firebaseConnection";
import { doc, collection, query, where, getDoc, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { TextArea } from "@/components/textarea";
import { toast } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";



interface TaskProps {
    item: {
        tarefa: string;
        public: boolean;
        created: string;
        user: string;
        taskid: string;
    }
    allComments: CommentProps[];
}

interface CommentProps {
    id: string;
    comment: string;
    
    name: string;
    taskId: string;
    user: string;
}

export default function Task ( { item, allComments }: TaskProps) {


    const [input, setInput] = useState("");
    const [comments, setComments] = useState<CommentProps[]>(allComments || []);
    
    const { data: session } = useSession();

    async function handleComment(event: FormEvent) {
        event.preventDefault();

        if(input ==="") return;

        if(!session?.user?.email || !session?.user?.name) return;
        
        try {
            const docRef = await addDoc (collection(db, "comments"), {
                comment: input,
                created: new Date(),
                user: session?.user?.email,
                name: session?.user?.name,
                taskId: item.taskid,

            })

            const data = {
                id: docRef.id,
                comment: input,
                name: session?.user?.name,
                user: session?.user?.email,
                taskId: item.taskid,
            }

            setComments((oldItems) => [...oldItems, data])

            setInput("")
        } catch (error) {
            console.log(error)
            toast.error("Erro ao enviar comentario!")
            
        }
        toast.success("Comentario enviado com sucesso!")
    
    }

    async function handleDeleteComment(id: string) {
        try {

            
            const docRef = doc(db, "comments", id);
            await deleteDoc(docRef);

            const deleteComment = comments.filter((item) => item.id !== id);
            setComments(deleteComment)

            toast.success("Comentario deletado com sucesso!")
        } catch (error) {
            console.log(error)
            toast.error("Erro ao deletar comentario!")
            
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Detalhes da tarefa</title>
            </Head>
            <main className={styles.main}>
            <h1>Tarefas</h1>

            <article className={styles.task}>
                <p>
                    {item?.tarefa}
                </p>
            </article>
            </main>

            <section className={styles.commentsContainer}>
                <h2>Deixar Comentarios</h2>
                <form onSubmit={handleComment}>
                    <TextArea 
                    value={input}
                    onChange={ (event: ChangeEvent<HTMLTextAreaElement> )=> setInput(event.target.value)}
                    placeholder="Deixe seu comentario" />

                        <button  
                        disabled={!session?.user}
                        className={styles.button}>Enviar Comentario</button>
                    
                </form>
            </section>

            <section className={styles.commentsContainer}>
                <h2>Todos os Comentarios</h2>
                {comments.length === 0 && (
                        <p>Nenhum comentario encontrado!</p>
                )}

                {comments.map((item) => (
                    <article key={item.id} className={styles.comment} >
                        <div className= {styles.headComment} >
                            <label className= {styles.commentsLabel} > {item.name} </label>
                            {item.user === session?.user?.email  && (
                                <button onClick={( )=> handleDeleteComment(item.id)} className= {styles.buttonTrash} >
                                <FaTrash  size={18} color="#ff0000" />
                            </button>
                            )}
                        </div>
                        <p> {item.comment} </p>
                    </article>
                ))}
            </section>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ( { params }) =>{
    
    const id = params?.id as string;

    const docRef = doc(db, "tarefas", id);

    const q = query(collection(db, "comments"), where("taskId", "==", id));
    const snapshotComments = await getDocs(q);

    let allComments: CommentProps[] = [];
    snapshotComments.forEach((doc) => {
        allComments.push({
            id: doc.id,
            comment: doc.data().comment,
            
            name: doc.data().name,
            taskId: doc.data().taskId,
            user: doc.data().user,
        })
    })

    

    const snapshot = await getDoc(docRef);

    if(snapshot.data() === undefined) {

        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }

    if(!snapshot.data()?.public){
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }

    const miliseconds = snapshot.data()?.created?.seconds * 1000;

    const Task = {
        tarefa: snapshot.data()?.tarefa,
        public: snapshot.data()?.public,
        created: new Date(miliseconds).toLocaleDateString("pt-BR"), 
        user: snapshot.data()?.user,
        taskid: id,
    }
    
    

    return {
        props: { 
            item: Task,
            allComments: allComments,

        },

     }
}
import { ChangeEvent, FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import  styles  from "./style.module.css";
import { GetServerSideProps } from "next";
import { db } from "@/services/firebaseConnection";
import { doc, collection, query, where, getDoc, addDoc } from "firebase/firestore";
import { TextArea } from "@/components/textarea";
import { toast } from "react-hot-toast";
import { create } from "domain";


interface TaskProps {
    item: {
        tarefa: string;
        public: boolean;
        created: string;
        user: string;
        taskid: string;
    }
}

export default function Task ( { item }: TaskProps) {


    const [input, setInput] = useState("");
    
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

            setInput("")
        } catch (error) {
            console.log(error)
            toast.error("Erro ao enviar comentario!")
            
        }
        toast.success("Comentario enviado com sucesso!")
    
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
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ( { params }) =>{
    
    const id = params?.id as string;

    const docRef = doc(db, "tarefas", id);
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

        },

     }
}
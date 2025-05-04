import Head from "next/head";
import  styles  from "./style.module.css";
import { GetServerSideProps } from "next";
import { db } from "@/services/firebaseConnection";
import { doc, collection, query, where, getDoc } from "firebase/firestore";
import { TextArea } from "@/components/textarea";


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
                <form>
                    <TextArea placeholder="Deixe seu comentario" />

                        <button  className={styles.button}>Enviar Comentario</button>
                    
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
    
    console.log(Task)

    return {
        props: { 
            item: Task,

        },

     }
}
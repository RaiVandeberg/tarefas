import Head from "next/head";
import  styles  from "./style.module.css";

export default function Task() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Detalhes da tarefa</title>
            </Head>
            <main className={styles.main}></main>
            <h1>Tarefas</h1>

        </div>
    )
}
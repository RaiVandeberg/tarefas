import { GetServerSideProps } from 'next'
import styles from './styles.module.css'
import Head from 'next/head'
import { getSession } from 'next-auth/react'
import { TextArea } from '@/components/textarea'

export default function Dashboard() {
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

                    <form > 
                        <TextArea placeholder="Digite qual sua tarefa" />
                        <div className={styles.checkboxArea}>
                            <input type="checkbox" 
                            className={styles.checkbox}
                               
                               />
                               <label>Deixar tarefa publica?</label>
                        </div>
                        <button type="submit" className={styles.button}>
                            Registrar
                        </button>
                    </form>
                </div>

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
        props:{},
    }
}
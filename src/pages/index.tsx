import Head from "next/head"; 
import styles from "@/styles/home.module.css";
import Image from "next/image";
import heroImg from "../../public/assets/hero.png";
import { GetStaticProps } from "next";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";

interface HomeProps {
  post: number;
  comments: number;
}

export default function Home({ post, comments }: HomeProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tarefas+  Organize suas Tarefas </title>
      </Head>
      <main className={styles.main}>
        <div className={styles.logoContent}>
          <Image className={styles.hero}
          alt="Logo Tarefas+"
          src={heroImg}
          priority
          />
        </div>
        <h1 className={styles.title}>
        Sistema feito para você organizar <br />
         seus estudos e terefas
        </h1>

        <div className={styles.infoContent}>
          <section className={styles.box}>
            <span>+ {post} Posts</span>
          </section>

          <section className={styles.box}>
            <span>+{comments} Comentarios</span>
          </section>
        </div>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {

    const commentsRef = collection(db, "comments");
    const postRef = collection(db, "tarefas");

    const commentsSnapshot = await getDocs (commentsRef);
    const postSnapshot = await getDocs (postRef);


    return{
      props: {
        post: postSnapshot.size || 0,
        comments: commentsSnapshot.size || 0,
      },
      revalidate: 60,
    }
}
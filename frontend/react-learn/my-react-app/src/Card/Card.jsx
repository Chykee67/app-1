import ProfilePic from '../assets/iron-throne.jpeg';
import styles from './card.module.css'

export default function Card(){
    return (
        <>
            <div className={styles.card}>
                <img alt="Profile pic" src={ProfilePic}/>
                <h3>Image Title</h3>
                <p>Image Description</p>
            </div>
        </>
    )
}
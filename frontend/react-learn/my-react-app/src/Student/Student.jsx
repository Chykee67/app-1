import styles from './student.module.css';

function Student(props){
    return(
        <div className={styles.student}>
            <p>Name: {props.name}</p>
            <p>Age: {props.age} years</p>
            <p>Grade: {props.grade.toUpperCase()}</p>
        </div>
    );
}
export default Student;
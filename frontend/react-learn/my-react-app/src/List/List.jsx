
function List(props){
    
    const itemList = props.items;

    return(
        <>
            <h3><b>{props.category}</b></h3>
            <ul>
                {itemList.map((item) => (
                    <li key={item.name}>
                        {item.name} - {item.color}
                    </li>
                ))}
            </ul>
        </>
    )
}
export default List;
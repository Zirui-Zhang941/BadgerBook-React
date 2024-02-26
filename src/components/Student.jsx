const Student = (props) => {
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        <p>{props.major}</p>
        
        <p>{props.name.first} is taking {props.numCredits} credits and is {props.fromWisconsin ? "":"not"} from Wisconsin.</p>

        <p>They have {props.interests.length} interests including...</p>
        <ul>
            {props.interests.map((interest,index) => (
                    <li key={index}>{interest}</li>
            ))}
        </ul>
        {/* TODO Student data goes here! */}
    </div>
}

export default Student;
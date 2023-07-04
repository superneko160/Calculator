const Display = (props: {value: string}) => {
    return (
        <div className='display'>
            <span>{props.value}</span>
        </div>
    );
}

export default Display;
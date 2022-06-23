import React from "react";

const FormForAnswer = (props) =>{
    const [buttonDisabled, setButtonDisabled] = React.useState(true)


    return (
        <form onSubmit={props.submitHandler}>
            <fieldset id="fieldset">
                <label
                    htmlFor="greeting"
                    style={{
                        display: 'block',
                        color: 'var(--gray)',
                        marginBottom: '0.5em'
                    }}
                >
                    Change greeting
                </label>
                <div style={{display: 'flex'}}>
                    <input
                        autoComplete="off"
                        defaultValue={props.greeting}
                        id="greeting"
                        onChange={e => setButtonDisabled(e.target.value === greeting)}
                        style={{flex: 1}}
                    />
                    <button
                        disabled={buttonDisabled}
                        style={{borderRadius: '0 5px 5px 0'}}
                    >
                        Save
                    </button>
                </div>
            </fieldset>
        </form>
    )
}

export default FormForAnswer;
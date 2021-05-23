const styles = {
    actionItems:{
        position: 'fixed' as 'fixed',
        top: 0,
        padding: '1rem 1rem 0 1rem',
        display:'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    transferButton: {        
        padding: '1rem',
        fontSize: '1rem'
    },
    errorMsg: {
        color: 'white',
        background: 'black',
        padding: '.5rem',
        textAlign: 'center' as 'center'
    },
    exchangeRate: {
        position: 'fixed' as 'fixed',
        top: '.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        padding: '.5rem',
        background: '#5563DE',
        borderRadius: '.5rem'
    }
}

export default styles
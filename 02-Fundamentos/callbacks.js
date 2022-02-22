const getUserById = (id, callback) => {
    const user = {
        id,
        nombre: 'Oscar'
    }

    setTimeout( () => {
        callback(user);
    }, 1500);
}

getUserById (10, (user) => {
    console.log(user);
});
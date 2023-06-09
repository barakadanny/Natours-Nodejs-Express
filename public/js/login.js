import { showAlert } from './alert'

export const login = async (email, password) => {
    try{
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/v1/users/login',
            data: {
                email,
                password
            }
        });

        if(res.data.status === "success") {
            showAlert('success', 'Logged in successfully!')
            window.setTimeout(() => {
                location.assign('/tours')
            }, 1500)
        }
    } catch(err) {
        showAlert('error', err.response.data.message);
    }
}

export const logout = async () => {
    try{
        const res = await axios({
            method: 'GET',
            url: 'http://localhost:3000/api/v1/users/logout'
        });
        if(res.data.status === "success") {
            // location.reload(true);
            showAlert('success', 'Logged Out!')
            window.setTimeout(() => {
                location.assign('/')
            }, 800)
        }
    } catch(err) {
        showAlert('error', 'Error while logging out! Please try again!');
    }
}

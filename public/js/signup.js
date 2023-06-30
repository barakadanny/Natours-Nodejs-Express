import { showAlert } from "./alert";

export const signup = async (name, email, password, passwordConfirm) => {
    console.log(name, email, password, passwordConfirm);
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/v1/users/signup',
            data: {
                name,
                email,
                password,
                passwordConfirm
            }
        })
        if(res.data.status === "success") {
            showAlert('success', 'SignUp successfully!')
            window.setTimeout(() => {
                location.assign('/me')
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}
import axios from "axios";

async function call_api(name, args) {
    let token = localStorage.getItem('token');
    return axios.post("/api", {
        api: name,
        args,
        token
    }).then(res => {
        let api_res = res.data;
        if (api_res.success && api_res.data.hasOwnProperty("token")) {
            localStorage.setItem('token', api_res.data.token);
        }
        return api_res;
    }).catch(err => {
        console.log("error:", err);
        return {
            success: false,
            error_message: err.message
        };
    });
}

export {
    call_api
}

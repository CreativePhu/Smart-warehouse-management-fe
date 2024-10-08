import axios from "axios";
import { ResponseError } from "../../interface/ResponseError";
import { Role } from "../../interface/Role";
import {checkTokenExpired} from "../../util/DecodeJWT";

const GetRolesAPI = async (): Promise<Role[]> => {
    try {
        const HOST = process.env.REACT_APP_HOST_BE;
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/login";
        } else if (checkTokenExpired(token)) {
            localStorage.removeItem('token');
            localStorage.removeItem('profile');
            window.location.href = "/session-expired";
        }

        const response = await axios.get(`${HOST}/auth/roles`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            if(error.response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('profile');
                window.location.href = "/session-expired";
            }
            const data = error.response.data as ResponseError;
            throw new Error(data.message || "An unexpected error occurred.");
        } else {
            throw new Error("An unexpected error occurred.");
        }

    }
}

export default GetRolesAPI;
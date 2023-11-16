import axios from "axios"


export const postConvertCode = async(code, current, convert)=>{
    try {   
        let res = await axios.post(`${process.env.REACT_APP_API_LINK}/convert`, {code, current, convert});
        res = await res?.data;
        return res;
    } catch (error) {
        return {issue: true, msg: error.message};
    }
}

export const postDebug = async(code)=>{
    try {   
        let res = await axios.post(`${process.env.REACT_APP_API_LINK}/debug`, {code});
        res = await res?.data;
        return res;
    } catch (error) {
        return {issue: true, msg: error.message};
    }
}

export const postQualityCheck = async(code)=>{
    try {   
        let res = await axios.post(`${process.env.REACT_APP_API_LINK}/qualitycheck`, {code});
        res = await res?.data;
        return res;
    } catch (error) {
        return {issue: true, msg: error.message};
    }
}

export const getFileContent = async(link) =>{
    try {   
        let res = await axios.get(`https://api.github.com/repos/${link}`);
        res = await res?.data;
        return res;
    } catch (error) {
        return {issue: true, msg: error.message};
    }
}
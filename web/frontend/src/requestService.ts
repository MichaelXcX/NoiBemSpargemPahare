import axios from 'axios';
// require('dotenv').config();

const RequestService = async (url: string, body: any, type: string) => {
  let res = null,
    ok = true;

    try {
        res = await axios({
            method: type,
            url: "localhost:3000/api" + url,
            data: body,
        });
    } catch (err: any) {
        console.log(err);
        ok = false;
        res = err.response;
    }
    return {
    ok: ok,
    data: res?.data,
    };
};

export const getElders = async (caretakerId: string) => {
    console.log("haubau")
    const res = await RequestService('/elders?caretakerId' + caretakerId, {}, 'GET');
    return res;
}


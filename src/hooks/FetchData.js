import axios from "axios";
import { message } from "antd";

export default function FetchData(
  options,
  setData,
  setDataLoading,
  setServerMsg,
  success
) {
  axios(options)
    .then(function (response) {
      setData(response.data.data);
      setServerMsg(null);
      setDataLoading(false);
    })

    .catch(function (error) {
      message.error(`somthing wrong , ${error}`);
    });
}

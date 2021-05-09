import React, { Component } from "react";
const server = "http://localhost:3000";

export const fetchGetList = (start, end, setListFunc) => {
  fetch(server + `/reservations?start=${start}&end=${end}`, {
    mode: "cors",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error("ロード失敗");
      }
    })
    .then((myJson) => {
      console.log(myJson);
      setListFunc(myJson.reservations);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const fetchApply = (data) => {
  // const obj = {hello: "world"};
  const method = "post";
  const body = data;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  fetch(server + `/reservations`, {
    method: method,
    headers: headers,
    body: body,
    mode: "cors",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error("申請失敗");
      }
    })
    .then((myJson) => {
      console.log("申請成功");
      window.alert(myJson.message);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const fetchDelete = (id) => {
  // const obj = {hello: "world"};
  const method = "DELETE";

  fetch(server + `/reservations/${id}`, {
    method: method,
    mode: "cors",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error("削除失敗");
      }
    })
    .then((myJson) => {
      console.log("削除成功");
      window.alert(myJson.message);
    })
    .catch((e) => {
      console.log(e);
    });

  // 一応返してるけどここで結果を返すの無理味
  return "";
};

export const fetchGetNumList = (start, end, setListFunc) => {

  fetch(server + `/reservations/calendar?start=${start}&end=${end}`, {
    mode: "cors",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error("ロード失敗");
      }
    })
    .then((myJson) => {
      console.log(myJson);
      setListFunc(myJson.reservations);
    })
    .catch((e) => {
      console.log(e);
    });
};


export const fetchGetSummary = (munth) => {
  // return ?
  fetch(server + `/reservations/summary/?month=${munth}`, {
    mode: "cors",
  })
    .then((response) => {
      if (response.ok) {
        const blob = response.blob();
        console.log(blob);
        return blob;
      } else {
        throw Error("ロード失敗");
      }
    })
    .then((myBlob) => {
      var url = window.URL.createObjectURL(myBlob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "filename.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
};

export default fetchGetList;

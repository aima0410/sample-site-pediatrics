'use strict';
{
  let userDataList = [
    { name: "管理人", id: "1", password: "p" },
    { name: "テストユーザー", id: "testuser", password: "testpassword" }
  ];

  const loginForm = document.getElementById("loginForm");
  const searchResult = document.getElementById("searchResult");

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchId = document.querySelector('#entered_id').value;
    const searchPassword = document.querySelector('#entered_password').value;
    findUser(searchId, searchPassword);
  });

  function findUser(searchId, searchPassword) {
    const targetData = userDataList.find((data) => data.id === searchId && data.password === searchPassword);

    if (targetData) {
      // ログイン成功後のリダイレクト
      window.alert(`${targetData.name}がログインしました。トップページにリダイレクトします。`);
      window.location.href = 'index.html?id=' + targetData.id;
    } else {
      searchResult.textContent = 'IDまたはパスワードが違います';
    }
  }
}

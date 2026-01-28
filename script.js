 //要素の呼び出し
    const input = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const list = document.getElementById("taskList");

    // 保存されたタスクを読み込み（一番下のスクリプトで保存している）
    const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
    // forEachでsavedに保存されているテキストをひとつずつaddTaskに渡す
    saved.forEach(addTask);

    addBtn.addEventListener("click", () => {
      if (!input.value.trim()) return;
      addTask(input.value);
      saveTasks();
      input.value = "";
    });

    // text には addTask を呼び出した側が渡した文字列が入る 
    // saved.forEach(addTask) のとき → saved の各要素 
    // addTask(input.value) のとき → ユーザーが入力した文字
    function addTask(text) {
      const li = document.createElement("li");
      li.textContent = text;

    // 削除ボタンの作成
      const del = document.createElement("button");
      del.textContent = "削除";
      del.onclick = () => {
        if (window.confirm('このタスクを削除しますか？')) {
          li.remove(); //「はい」を選択した場合
        } else {
          saveTasks();
      };
    };

    //HTML上に表示する
      li.appendChild(del);
      list.appendChild(li);
    }

    //追加されたタスクの保存をする
    //list.children(liの集まり)を配列に変換し
    //各liの最初のテキスト（タスク名）だけを取り出して配列にする
    function saveTasks() {
      const tasks = [...list.children].map(li => li.firstChild.textContent);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

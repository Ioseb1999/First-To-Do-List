$(document).ready(function () {
  const taskStorage = JSON.parse(localStorage.getItem("task_storage"));

  var i = 0;
  const taskArray = [];

  if (taskStorage && taskStorage.length) {
    taskArray.push(...taskStorage);
  }
  let colors = ["red", "yellow", "pink", "purple", "blue", "cyan"];
  let currentColor = $(this).attr("id");

  $(document).on("click", ".submit", function () {
    const id = Date.now();
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const check = '<input id="' + id + '" type="checkbox" class="checkbox" >';
    const newTask = document.createElement("input");
    const toDoInputData = $(".inputtask").val();
    const toDoListData =
      '<div class="uncomp" id="' +
      id +
      '" style="background-color:' +
      randomColor +
      ';">' +
      check +
      "<div id=" +
      "test" +
      id +
      " ><p>" +
      toDoInputData +
      "</p></div></div>";

    const tasklist = (taskArray) => {
      let str = "";
      taskArray.forEach((item) => {
        str += toDoListData;
        return str;
      });
    };
    const render = (taskArray) => {
      $(".task").html(tasklist(taskArray));
    };
    if ($.trim(toDoInputData) == "") {
      alert("Please enter the task");
    } else {
      $(".task").append(toDoListData);
      const text = toDoInputData;
      const newTask = {
        checked: false,
        text: text,
        id: id,
        color: randomColor,
      };
      taskArray.push(newTask);
      $(".inputtask").val("");
      render(taskArray);

      localStorage.setItem("task_storage", JSON.stringify(taskArray));

      if (localStorage.getItem("")) {
        $(".uncomp").html(localStorage.getItem("task_storage"));
      }
    }

    $(".uncomp").dblclick(function () {
      const idItem = $(this).children().attr("id");
      const textTask = document.getElementById("test" + idItem);

      textTask.innerHTML = '<input type="text">';

      textTask.addEventListener("keyup", function (e) {
        if (e.keyCode == 13) {
          const taskIndex = taskArray.findIndex(
            (item) => item.id.toString() === idItem
          );
          taskArray[taskIndex].text = textTask.children[0].value;

          textTask.innerHTML = textTask.children[0].value;
        } else if (e.keyCode == 27) {
          textTask.innerHTML = toDoInputData;
        }

        localStorage.setItem("task_storage", JSON.stringify(taskArray));
      });

      const taskIndex = taskArray.findIndex(
        (item) => item.id.toString() === idItem
      );
    });
  });
  $(document).on("click", ".color-box", function () {
    currentColor = $(this).attr("id");
  });
  $(document).on("click", ".checkbox", function () {
    const idItem = $(this).attr("id");
    const taskIndex = taskArray.findIndex(
      (item) => item.id.toString() === idItem
    );

    taskArray[taskIndex].checked = !taskArray[taskIndex].checked;
    // taskArray[taskIndex].color = currentColor;
    $(this).parent().css("backgroundColor", currentColor);

    localStorage.setItem("task_storage", JSON.stringify(taskArray));
  });
});

xport function readChores() {
    if (localStorage.getItem("ChoresListData") === null) {
      const chores = {
        chores: [],
        archived: [],
        openChoresCount: 0,
        closedChoresCount: 0,
        choresCountId: 1,
      };
      localStorage.setItem("ChoresListData", JSON.stringify(chores));
      return JSON.parse(localStorage.getItem("ChoresListData"));
    } else {
      checkDate();
      return JSON.parse(localStorage.getItem("ChoresListData"));
    }
  }
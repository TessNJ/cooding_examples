let currentDroppable = null;

person.onmousedown = function (event) {
  let shiftX = event.clientX - person.getBoundingClientRect().left;
  let shiftY = event.clientY - person.getBoundingClientRect().top;

  person.style.position = "absolute";
  person.style.zIndex = 1000;
  document.body.append(person);

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    person.style.left = pageX - shiftX + "px";
    person.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);

    person.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    person.hidden = false;

    if (!elemBelow) return;

    let droppableBelow = elemBelow.closest(".droppable");
    if (currentDroppable != droppableBelow) {
      if (currentDroppable) {
        // null when we were not over a droppable before this event
        leaveDroppable(currentDroppable);
      }
      currentDroppable = droppableBelow;
      if (currentDroppable) {
        // null if we're not coming over a droppable now
        // (maybe just left the droppable)
        enterDroppable(currentDroppable);
      }
    }
  }

  document.addEventListener("mousemove", onMouseMove);

  person.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    person.onmouseup = null;
  };
};

function enterDroppable(elem) {
  elem.style.background = "lime";
}

function leaveDroppable(elem) {
  elem.style.background = "";
}

person.ondragstart = function () {
  return false;
};

//CODE FROM :
// https://javascript.info/mouse-drag-and-drop

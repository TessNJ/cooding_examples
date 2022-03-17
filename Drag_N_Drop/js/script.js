//starting point
ball.onmousedown = function (event) {
  // (1) prepare to moving: make absolute and on top by z-index
  ball.style.position = "absolute";
  ball.style.zIndex = 1000;

  // move it out of any current parents directly into body
  // to make it positioned relative to the body
  document.body.append(ball);

  // centers the ball at (pageX, pageY) coordinates
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + "px";
    ball.style.top = pageY - ball.offsetHeight / 2 + "px";
  }

  // move our absolutely positioned ball under the pointer
  moveAt(event.pageX, event.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (2) move the ball on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // (3) drop the ball, remove unneeded handlers
  ball.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    ball.onmouseup = null;
  };
};

//stopping cloning
ball.ondragstart = function () {
  return false;
};

//positiononing
let shiftX = event.clientX - ball.getBoundingClientRect().left;
let shiftY = event.clientY - ball.getBoundingClientRect().top;

ball.style.left = event.pageX - shiftX + "px";
ball.style.top = event.pageY - shiftY + "px";

//with better posistioning
ball.onmousedown = function (event) {
  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;

  ball.style.position = "absolute";
  ball.style.zIndex = 1000;
  document.body.append(ball);

  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - shiftX + "px";
    ball.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the ball on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // drop the ball, remove unneeded handlers
  ball.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    ball.onmouseup = null;
  };
};

ball.ondragstart = function () {
  return false;
};

//hiding and droppable
// in a mouse event handler
ball.hidden = true; // (*) hide the element that we drag

let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
// elemBelow is the element below the ball, may be droppable

ball.hidden = false;

//Final edition
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

//starting point
// person.onmousedown = function (event) {
//   // (1) prepare to moving: make absolute and on top by z-index
//   person.style.position = "absolute";
//   person.style.zIndex = 1000;

//   // move it out of any current parents directly into body
//   // to make it positioned relative to the body
//   document.body.append(person);

//   // centers the person at (pageX, pageY) coordinates
//   function moveAt(pageX, pageY) {
//     person.style.left = pageX - person.offsetWidth / 2 + "px";
//     person.style.top = pageY - person.offsetHeight / 2 + "px";
//   }

//   // move our absolutely positioned person under the pointer
//   moveAt(event.pageX, event.pageY);

//   function onMouseMove(event) {
//     moveAt(event.pageX, event.pageY);
//   }

//   // (2) move the person on mousemove
//   document.addEventListener("mousemove", onMouseMove);

//   // (3) drop the person, remove unneeded handlers
//   person.onmouseup = function () {
//     document.removeEventListener("mousemove", onMouseMove);
//     person.onmouseup = null;
//   };
// };

//stopping cloning
// person.ondragstart = function () {
//   return false;
// };

//positiononing
// let shiftX = event.clientX - person.getBoundingClientRect().left;
// let shiftY = event.clientY - person.getBoundingClientRect().top;

// person.style.left = event.pageX - shiftX + "px";
// person.style.top = event.pageY - shiftY + "px";

//with better posistioning
// person.onmousedown = function (event) {
//   let shiftX = event.clientX - person.getBoundingClientRect().left;
//   let shiftY = event.clientY - person.getBoundingClientRect().top;

//   person.style.position = "absolute";
//   person.style.zIndex = 1000;
//   document.body.append(person);

//   moveAt(event.pageX, event.pageY);

//   // moves the person at (pageX, pageY) coordinates
//   // taking initial shifts into account
//   function moveAt(pageX, pageY) {
//     person.style.left = pageX - shiftX + "px";
//     person.style.top = pageY - shiftY + "px";
//   }

//   function onMouseMove(event) {
//     moveAt(event.pageX, event.pageY);
//   }

//   // move the person on mousemove
//   document.addEventListener("mousemove", onMouseMove);

//   // drop the person, remove unneeded handlers
//   person.onmouseup = function () {
//     document.removeEventListener("mousemove", onMouseMove);
//     person.onmouseup = null;
//   };
// };

// person.ondragstart = function () {
//   return false;
// };

//hiding and droppable
// // in a mouse event handler
// person.hidden = true; // (*) hide the element that we drag

// let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
// // elemBelow is the element below the person, may be droppable

// person.hidden = false;

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

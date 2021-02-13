const beads = document.querySelectorAll(".bead");
dragElement(document.querySelectorAll(".bead"));
console.log(beads);

beads.forEach(bead => dragElement(bead), console.log(window.event));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos1 = e.clientX;
    pos2 = e.clientX;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos2 - e.clientX;
    pos2 = e.clientX;
    // set the element's new position:

    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    console.log(elmnt.style.left);
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// if the bead is at 950px OR < 0px it needs to stop moving past that point
// also add a counter
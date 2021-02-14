// counter only counts if it hits upperbound
const beads = document.querySelectorAll(".bead");
dragElement(document.querySelectorAll(".bead"));

beads.forEach((bead, beadIndex) => dragElement(bead, beadIndex));

function dragElement(elmnt, currentBeadIndex) {
  let pos1 = 0;
  let pos2 = 0;
  let lowerBound = 0;
  let upperBound = 950;
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

    // lower bound is position of the adjacent child. 
    // which bead are we dragging?
    // which bead is next to the one we're dragging?
    // (theCurrentBead's index - 1)
    // (theCurrentBead's index + 1)
    const lowerAdjacentBead = beads[currentBeadIndex - 1];
    const upperAdjacentBead = beads[currentBeadIndex + 1];

    if (upperAdjacentBead) {
      upperBound = upperAdjacentBead.offsetLeft - 50;
    } else {
      upperBound = 950;
    }

    if (lowerAdjacentBead) {
      lowerBound = lowerAdjacentBead.offsetLeft + 50;
    } else {
      lowerBound = 0;
    }

    console.log(lowerBound, upperBound);
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos2 - e.clientX;
    pos2 = e.clientX;
    // set the element's new position:

    const newOffset = (elmnt.offsetLeft - pos1);
    // 0 and 950 are our lower and upper bounds.
    if (newOffset >= lowerBound && newOffset <= upperBound) {
      elmnt.style.left = newOffset + "px";
      console.log(elmnt.style.left);
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// if the bead is at 950px OR < 0px it needs to stop moving past that point
// also add a counter
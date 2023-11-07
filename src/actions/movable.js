// actions/movable.js
export function movable(node) {
  let x;
  let y;

  function handleMouseDown(event) {
    x = event.clientX;
    y = event.clientY;

    node.dispatchEvent(new CustomEvent("moveStart"));
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(event) {
    const dx = event.clientX - x;
    const dy = event.clientY - y;
    x = event.clientX;
    y = event.clientY;

    node.dispatchEvent(
      new CustomEvent("move", {
        detail: { dx, dy },
      })
    );
  }

  function handleMouseUp() {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);

    node.dispatchEvent(new CustomEvent("moveEnd"));
  }

  node.addEventListener("mousedown", handleMouseDown);

  return {
    destroy() {
      node.removeEventListener("mousedown", handleMouseDown);
    },
  };
}

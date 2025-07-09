export default function Home() {
  const columnLength = 10;
  const rowLenght = 10;

  const resizeRef = (element) => {
    if (!element) return;

    const thElement = element.closest("th");
    const columnNameElement = thElement.querySelector(".column-name");

    const initialWidth = columnNameElement.scrollWidth + 20 + 2;
    thElement.style.width = `${initialWidth}px`;

    element.addEventListener("mousedown", (event) => {
      const thElement = event.target.closest("th");
      if (!thElement) return;

      const startX = event.pageX;
      const startWidth = thElement.offsetWidth;

      const onMouseMove = (moveEvent) => {
        const newWidth = startWidth + (moveEvent.pageX - startX);
        if (newWidth > initialWidth) {
          thElement.style.width = `${newWidth}px`;
        }
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  };

  return (
    <div>
      <h1>Home</h1>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {Array.from({ length: columnLength }, (_, index) => (
                <th key={`thead-th-${index}`}>
                  <div className="th-content">
                    <p className="column-name">Column {index + 1}</p>
                  </div>
                  <span
                    className="th-resize"
                    style={{
                      ...(index === columnLength - 1 && { display: "none" }),
                    }}
                    ref={resizeRef}
                  ></span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rowLenght }, (_, rowIndex) => (
              <tr key={`tbody-tr-${rowIndex}`}>
                {Array.from({ length: columnLength }, (_, columnIndex) => (
                  <td key={`tbody-td-${rowIndex}-${columnIndex}`}>
                    [{rowIndex}-{columnIndex}]
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section>
        <h2>Heading</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit illo
          eaque assumenda mollitia nostrum velit voluptates libero, eius
          voluptatibus! Asperiores fuga excepturi mollitia cupiditate assumenda
          fugiat vitae itaque corrupti dolor.
        </p>
      </section>
    </div>
  );
}

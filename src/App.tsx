import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  min-height: 200px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { source, destination, draggableId } = info;
    if (!destination) {
      return;
    }
    if (destination?.droppableId === source.droppableId) {
      setToDos((prev) => {
        const newToDos = [...prev[source.droppableId]];
        const taskObj = newToDos[source.index];
        newToDos.splice(source.index, 1);
        newToDos.splice(destination.index, 0, taskObj);
        return {
          ...prev,
          [source.droppableId]: newToDos
        };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      setToDos((prev) => {
        const newStart = [...prev[source.droppableId]];
        const taskObj = newStart[source.index];
        const newEnd = [...prev[destination!.droppableId]];
        newStart.splice(source.index, 1);
        newEnd.splice(destination!.index, 0, taskObj);
        return {
          ...prev,
          [source.droppableId]: newStart,
          [destination!.droppableId]: newEnd
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => {
            return (
              <Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />
            );
          })}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

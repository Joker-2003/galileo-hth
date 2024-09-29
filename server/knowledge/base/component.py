# Modified from https://github.com/Cinnamon/kotaemon/blob/main/libs/kotaemon/kotaemon/base/component.py

from abc import abstractmethod
from typing import Any, AsyncGenerator, Iterator, Optional

from theflow import Function, Node, Param, lazy
from server.knowledge.base.schema import Document


class BaseComponent(Function):
    inflow = None

    def flow(self):
        if self.inflow is None:
            raise ValueError("No inflow provided.")

        if not isinstance(self.inflow, BaseComponent):
            raise ValueError(
                f"inflow must be a BaseComponent, found {type(self.inflow)}"
            )

        return self.__call__(self.inflow.flow())

    def set_output_queue(self, queue):
        self._queue = queue
        for name in self._ff_nodes:
            node = getattr(self, name)
            if isinstance(node, BaseComponent):
                node.set_output_queue(queue)

    def report_output(self, output: Optional[Document]):
        if self._queue is not None:
            self._queue.put_nowait(output)

    def invoke(self, *args, **kwargs) -> Document | list[Document] | None:
        ...

    async def ainvoke(self, *args, **kwargs) -> Document | list[Document] | None:
        ...

    def stream(self, *args, **kwargs) -> Iterator[Document] | None:
        ...

    def astream(self, *args, **kwargs) -> AsyncGenerator[Document, None] | None:
        ...

    @abstractmethod
    def run(
            self, *args, **kwargs
    ) -> Document | list[Document] | Iterator[Document] | None | Any:
        """Run the component."""
        ...

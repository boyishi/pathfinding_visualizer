import { getUnvisitedNeighbors } from "./common";

export function dfs(grid, startNode, endNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const visiting = [startNode];

    while (visiting) {
        const currNode = visiting.pop();
        if (currNode.isWall) continue;

        visitedNodesInOrder.push(currNode);
        if (currNode === endNode) return visitedNodesInOrder;

        currNode.isVisited = true;
        const unvisitedNeighbors = getUnvisitedNeighbors(grid, currNode);

        for (const neighbor of unvisitedNeighbors) {
            neighbor.distance = currNode.distance + 1;
            neighbor.previousNode = currNode;
            visiting.push(neighbor);
        }
    }

    return visitedNodesInOrder;
}

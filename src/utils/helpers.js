export const appendChildren = (node, ...children) => {
    children.forEach(childNode => node.appendChild(childNode));
};
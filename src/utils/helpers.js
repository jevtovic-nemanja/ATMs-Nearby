export const appendChildren = (node, ...children) => {
    children.forEach(childNode => node.appendChild(childNode));
};

export const formatDistance = distance => distance < 1 ? distance * 1000 + " meters" : distance + " km";